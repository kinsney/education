import random
import sys
import time

from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.management.base import BaseCommand
from django.db import IntegrityError
from django.utils.six.moves import range

from faker import Factory
from misago.core.management.progressbar import show_progress
from misago.users.avatars import dynamic, gallery, get_avatar_hash
from misago.users.models import Rank


class Command(BaseCommand):
    help = "Creates fake users for dev and testing purposes."

    def add_arguments(self, parser):
        parser.add_argument(
            'users',
            help="number of users to create",
            nargs='?',
            type=int,
            default=5
        )

    def handle(self, *args, **options):
        items_to_create = options['users']

        fake = Factory.create()
        User = get_user_model()

        ranks = [r for r in Rank.objects.all()]

        message = 'Creating %s fake user accounts...\n'
        self.stdout.write(message % items_to_create)

        message = '\n\nSuccessfully created %s fake user accounts in %s'

        created_count = 0
        start_time = time.time()
        show_progress(self, created_count, items_to_create)

        while created_count < items_to_create:
            try:
                kwargs = {
                    'rank': random.choice(ranks),
                }

                user = User.objects.create_user(
                    fake.first_name(), fake.email(), 'pass123',
                    set_default_avatar=False, **kwargs)

                if random.randint(0, 100) > 90:
                    dynamic.set_avatar(user)
                else:
                    gallery.set_random_avatar(user)

                user.avatar_hash = get_avatar_hash(user)
                user.save(update_fields=['avatar_hash'])
            except (ValidationError, IntegrityError):
                pass
            else:
                created_count += 1
                show_progress(
                    self, created_count, items_to_create, start_time)

        total_time = time.time() - start_time
        total_humanized = time.strftime('%H:%M:%S', time.gmtime(total_time))
        self.stdout.write(message % (created_count, total_humanized))
