from django.contrib import admin
from .models import Banner,LessonCategory,Lesson,LessonVideo,Activity,LessonQuestion
from django.utils.html import format_html
# Register your models here.

@admin.register(LessonVideo)
class LessonVideoAdmin(admin.ModelAdmin):
    pass


class LessonVideoInline(admin.TabularInline):
    model = LessonVideo
    extra = 0

class LessonQuestionInline(admin.TabularInline):
    model = LessonQuestion
    extra = 0

@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    search_fields = ('name',)
    list_display = ('name','inline_image','category')
    def inline_image(self, obj):
        return format_html('<img src="%s" style="height:128px"/>' % obj.thumbnail.url)
    inlines = (LessonVideoInline,LessonQuestionInline)
    filter_horizontal = ('equipment',)

class LessonInline(admin.TabularInline):
    model = Lesson
    extra = 0

@admin.register(LessonCategory)
class LessonCategoryAdmin(admin.ModelAdmin):
    inlines = (LessonInline,)

@admin.register(Activity)
class ActivityAdmin(admin.ModelAdmin):
    pass

@admin.register(Banner)
class BannerAdmin(admin.ModelAdmin):
    list_display = ('title','inline_image','position','link','is_visible','order')
    list_display_links = None
    def inline_image(self, obj):
        return format_html('<img src="%s" style="height:128px"/>' % obj.image.url)

