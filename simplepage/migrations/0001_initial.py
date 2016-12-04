# -*- coding: utf-8 -*-
# Generated by Django 1.9.10 on 2016-12-02 13:00
from __future__ import unicode_literals

import ckeditor_uploader.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('sites', '0002_alter_domain_unique'),
    ]

    operations = [
        migrations.CreateModel(
            name='SimplePage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(db_index=True, max_length=100, verbose_name='url')),
                ('title', models.CharField(max_length=200, verbose_name='标题')),
                ('content', ckeditor_uploader.fields.RichTextUploadingField(verbose_name='内容')),
                ('enable_comments', models.BooleanField(default=False, verbose_name='是否允许评论')),
                ('template_name', models.CharField(blank=True, help_text="Example: 'simplepage/contact_page.html'. If this isn't provided, the system will use 'simplepage/default.html'.", max_length=70, verbose_name='模板名称')),
                ('registration_required', models.BooleanField(default=False, help_text='If this is checked, only logged-in users will be able to view the page.', verbose_name='需要登录查看')),
                ('sites', models.ManyToManyField(to='sites.Site', verbose_name='站点')),
            ],
            options={
                'ordering': ('url',),
                'verbose_name': '活动单页',
                'db_table': 'simple_flatpage',
                'verbose_name_plural': '活动单页',
            },
        ),
    ]