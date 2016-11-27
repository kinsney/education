# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-11-25 06:43
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('device', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='device',
            name='slug',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='devicecategory',
            name='icon',
            field=models.ImageField(blank=True, upload_to='icons/', verbose_name='图标'),
        ),
    ]
