# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-11-28 12:58
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('misago_users', '0005_dj_19_update'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='rank',
            options={'get_latest_by': 'order'},
        ),
        migrations.AlterModelOptions(
            name='usernamechange',
            options={'get_latest_by': 'changed_on'},
        ),
    ]
