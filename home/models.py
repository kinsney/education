from django.db import models
from . import POSITIONS,MIMETYPE
from ckeditor_uploader.fields import RichTextUploadingField
from misago.conf import settings
from mptt.managers import TreeManager
from mptt.models import MPTTModel, TreeForeignKey
from misago.core.utils import slugify
from django.db.models import Q,Sum,Count
from device.models import Device
# Create your models here.
class Banner(models.Model):
    title = models.CharField('横幅主题', max_length=64,blank=False)
    image = models.ImageField('图像',upload_to='banner/')
    link = models.CharField('链接',max_length=200)
    position = models.CharField('位置', max_length=32,
        choices=POSITIONS)
    is_visible = models.BooleanField('显示', default=True)
    added = models.DateTimeField('发布时间',auto_now_add = True)
    order = models.SmallIntegerField('顺序', default=0)
    def __str__(self):
        return self.title
    class Meta:
        verbose_name = '横幅'
        verbose_name_plural = '横幅'
        ordering = ['order']

class LessonCategory(MPTTModel):
    parent = TreeForeignKey(
        'self',
        null=True,
        blank=True,
        related_name='children'
    )
    name = models.CharField('课程类别', max_length=255,blank=False)
    slug = models.CharField(max_length=255,blank=True)
    is_closed = models.BooleanField(default=False)
    order = models.SmallIntegerField('顺序', default=0)
    def has_child(self, child):
        return child.lft > self.lft and child.rght < self.rght
    def __str__(self):
        return self.name
    def set_name(self, name):
        self.name = name
        self.slug = slugify(name)
    #脏方法设置slug 之后重构
    def save(self,*args, **kwargs):
        self.set_name(self.name)
        super(LessonCategory,self).save(*args, **kwargs)
    def get_top_lessons(self):
        return self.lesson_set.filter(order=0)[:6]
    class Meta:
        verbose_name = '课程分类'
        verbose_name_plural = '课程分类'
        ordering = ['order']

class Lesson(models.Model):
    def dir_path(instance,filename):
        return 'lessons/{}/{}/{}'.format(instance.category.name,instance.name,filename)
    name = models.CharField('课程名', max_length=30,blank=False)
    slug = models.CharField(max_length=255,blank=True)
    thumbnail = models.ImageField('缩略图',upload_to=dir_path)
    price = models.DecimalField('价格',max_digits=5,decimal_places=1)
    category = models.ForeignKey(LessonCategory,verbose_name="课程类别")
    added = models.DateTimeField('发布时间',auto_now_add = True)
    equipment = models.ManyToManyField(Device,verbose_name="设备")
    description = RichTextUploadingField('其他')
    introduction = models.CharField('课程简介',max_length=255,blank=True)
    target = models.CharField('课程目的',max_length=255,blank=True)
    groupSuit = models.CharField('适合人群',max_length=255,blank=True)
    advice = models.CharField('学习建议',max_length=255,blank=True)
    order = models.SmallIntegerField('顺序', default=0)
    teacher = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        verbose_name="老师"
    )
    def get_duration(self):
        duration = self.lessonvideo_set.aggregate(Sum('duration'))
        return duration['duration__sum'] or "未知"
    def set_name(self, name):
        self.name = name
        self.slug = slugify(name)
    def save(self,*args, **kwargs):
        self.set_name(self.name)
        super(Lesson,self).save(*args, **kwargs)
    def __str__(self):
        return self.name
    def get_video_number(self):
        return self.lessonvideo_set.count()
    def get_first_link(self):
        return '/lesson/{}-{}'.format(self.slug,self.pk)
    def get_all_videos(self):
        return self.lessonvideo_set.order_by('order')
    def get_first_video(self):
        return self.lessonvideo_set.order_by('order').first()
    def get_questions(self):
        return self.lessonquestion_set.order_by('order')
    class Meta:
        verbose_name = '课程'
        verbose_name_plural = '课程'
        ordering = ['order']

class LessonQuestion(models.Model):
    Lesson = models.ForeignKey(Lesson,verbose_name="课程")
    title = models.CharField('问题',max_length=255)
    answer = models.CharField('答案',max_length=255)
    order = models.SmallIntegerField('顺序', default=0)
    class Meta:
        verbose_name = '常见课程问题'
        verbose_name_plural = '常见课程问题'
        ordering = ['order']


class LessonVideo(models.Model):
    def video_path(instance,filename):
        return 'lessons/{}/{}/{}'.format(instance.lesson.category.name,instance.lesson.name,filename)
    name = models.CharField('课程视频名称', max_length=20,blank=False)
    lesson = models.ForeignKey(Lesson,verbose_name='课程')
    file = models.FileField('视频文件',upload_to =video_path)
    duration = models.DurationField('视频秒数')
    added = models.DateTimeField('发布时间',auto_now_add = True)
    thumbnail = models.ImageField('缩略图',upload_to=video_path)
    mimetype = models.CharField('视频格式', max_length=20,choices=MIMETYPE,default="video/mp4")
    order = models.SmallIntegerField('顺序', default=0)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = '课程视频'
        verbose_name_plural = '课程视频'
        ordering = ['order']


class Activity(models.Model):
    def activity_path(instance,filename):
        return 'activities/{}/{}'.format(instance.title,filename)
    title = models.CharField('活动名称', max_length=20,blank=False)
    description = models.CharField('活动描述', max_length=50,blank=False)
    video = models.FileField('活动视频',upload_to=activity_path)
    thumbnail = models.ImageField('缩略图',upload_to=activity_path)
    added = models.DateTimeField('发布时间',auto_now_add = True)
    order = models.SmallIntegerField('顺序', default=0)
    is_visible = models.BooleanField('显示', default=True)
    def __str__(self):
        return self.title
    class Meta:
        verbose_name = '活动'
        verbose_name_plural = '活动'
        ordering = ['order']

