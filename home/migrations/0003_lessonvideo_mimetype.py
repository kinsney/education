# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-11-21 07:36
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0002_auto_20161121_1042'),
    ]

    operations = [
        migrations.AddField(
            model_name='lessonvideo',
            name='mimetype',
            field=models.CharField(choices=[('video/mp4', 'mp4格式')], default='video/mp4', max_length=20, verbose_name='视频格式'),
        ),
    ]
