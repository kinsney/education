# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-11-12 09:04
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.manager


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='lessoncategory',
            managers=[
                ('_default_manager', django.db.models.manager.Manager()),
            ],
        ),
        migrations.AlterField(
            model_name='lesson',
            name='slug',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='lessoncategory',
            name='slug',
            field=models.CharField(max_length=255),
        ),
    ]
