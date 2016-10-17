# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
from django.utils.translation import ugettext as _

from misago.core.utils import slugify


def create_default_ranks(apps, schema_editor):
    Rank = apps.get_model('misago_users', 'Rank')

    team = Rank.objects.create(
        name=_("Forum team"),
        slug=slugify(_("Forum team")),
        title=_("Team"),
        css_class='team',
        is_tab=True,
        order=0
    )

    member = Rank.objects.create(
        name=_("Members"),
        slug=slugify(_("Members")),
        is_default=True,
        order=1
    )

    Role = apps.get_model('misago_acl', 'Role')

    team.roles.add(Role.objects.get(name=_("Moderator")))
    team.roles.add(Role.objects.get(name=_("Private threads moderator")))
    team.roles.add(Role.objects.get(name=_("Deleting users")))

    member.roles.add(Role.objects.get(name=_("Private threads")))


class Migration(migrations.Migration):

    dependencies = [
        ('misago_users', '0003_bans_version_tracker'),
        ('misago_acl', '0003_default_roles'),
    ]

    operations = [
        migrations.RunPython(create_default_ranks),
    ]
