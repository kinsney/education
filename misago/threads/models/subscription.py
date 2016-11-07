from django.db import models
from django.utils import timezone

from misago.conf import settings


class Subscription(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL)
    thread = models.ForeignKey('Thread')
    category = models.ForeignKey('misago_categories.Category')

    last_read_on = models.DateTimeField(default=timezone.now)
    send_email = models.BooleanField(default=False)

    class Meta:
        index_together = [
            ['send_email', 'last_read_on']
        ]
