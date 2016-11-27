from django.contrib import admin
from .models import DeviceCategory,Device
from django.utils.html import format_html
# Register your models here.

@admin.register(Device)
class DeviceAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name','price','category')

class DeviceInline(admin.TabularInline):
    model = Device
    extra = 0

@admin.register(DeviceCategory)
class DeviceCategoryAdmin(admin.ModelAdmin):
    def inline_image(self, obj):
        return format_html('<img src="%s" style="height:64px"/>' % obj.icon.url)
    inlines = (DeviceInline,)
