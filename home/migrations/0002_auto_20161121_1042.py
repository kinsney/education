# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-11-21 02:42
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='banner',
            name='link',
            field=models.CharField(max_length=200, verbose_name='链接'),
        ),
    ]