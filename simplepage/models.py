from __future__ import unicode_literals
from django.contrib.sites.models import Site
from django.core.urlresolvers import get_script_prefix
from django.db import models
from django.utils.encoding import iri_to_uri, python_2_unicode_compatible
from django.utils.translation import ugettext_lazy as _
from ckeditor_uploader.fields import RichTextUploadingField


@python_2_unicode_compatible
class SimplePage(models.Model):
    url = models.CharField(('url'), max_length=100, db_index=True)
    title = models.CharField('标题', max_length=200)
    content = RichTextUploadingField('内容')
    enable_comments = models.BooleanField('是否允许评论', default=False)
    template_name = models.CharField('模板名称', max_length=70, blank=True,
        help_text=
            "模板路径示例: 'simplepage/contact_page.html'.如果没有提供，系统将默认使用'simplepage/default.html'."
    )
    registration_required = models.BooleanField('需要登录查看',
        help_text="如果点击了，只有登录才能查看",
        default=False)
    sites = models.ManyToManyField(Site, verbose_name='站点')

    class Meta:
        db_table = 'simple_flatpage'
        verbose_name = '活动单页'
        verbose_name_plural = '活动单页'
        ordering = ('url',)

    def __str__(self):
        return "%s -- %s" % (self.url, self.title)

    def get_absolute_url(self):
        # Handle script prefix manually because we bypass reverse()
        return iri_to_uri(get_script_prefix().rstrip('/') + self.url)
