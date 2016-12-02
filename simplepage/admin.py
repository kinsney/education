from django.contrib import admin
from .forms import SimplePageForm
from .models import SimplePage
# Register your models here.

@admin.register(SimplePage)
class SimplePageAdmin(admin.ModelAdmin):
    form = SimplePageForm
    fieldsets = (
        (None, {'fields': ('url', 'title', 'content', 'sites')}),
        ('高级选项', {
            'classes': ('collapse',),
            'fields': ('registration_required', 'template_name'),
        }),
    )
    list_display = ('url', 'title')
    list_filter = ('sites', 'registration_required')
    search_fields = ('url', 'title')
