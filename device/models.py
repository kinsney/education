from django.db import models
from misago.core.utils import slugify
from mptt.models import MPTTModel, TreeForeignKey
# Create your models here.
class DeviceCategory(MPTTModel):
    parent = TreeForeignKey(
        'self',
        null=True,
        blank=True,
        related_name='children',
        verbose_name="上一级类别"
    )
    name = models.CharField('名称', max_length=20,blank=False)
    slug = models.CharField(max_length=255,blank=True)
    icon = models.ImageField('图标',upload_to="icons/",blank=True)
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
        super(DeviceCategory,self).save(*args, **kwargs)
    class Meta:
        verbose_name = '设备分类'
        verbose_name_plural = '设备分类'
        ordering = ['order']

class Device(models.Model):
    name = models.CharField("名称",max_length=20)
    description = models.CharField('描述',max_length=200)
    slug = models.CharField(max_length=255,blank=True)
    category = models.ForeignKey(DeviceCategory,verbose_name="分类")
    price = models.DecimalField("售价",max_digits=7,decimal_places=1)
    def __str__(self):
        return self.name
    def set_name(self, name):
        self.name = name
        self.slug = slugify(name)
    #脏方法设置slug 之后重构
    def save(self,*args, **kwargs):
        self.set_name(self.name)
        super(Device,self).save(*args, **kwargs)
    class Meta:
        verbose_name = '设备'
        verbose_name_plural = '设备'



