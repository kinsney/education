from django.conf.urls import  include,url
from .lesson import LessonView
from . import views


urlpatterns = [
    url(r'^$',views.home),
]

def lesson_view_patterns(prefix,view):
    urls = [
        url(r'^%s/(?P<slug>[-a-zA-Z0-9]+)-(?P<pk>\d+)/$' % prefix, view.as_view(),name=prefix)
    ]
    return urls

urlpatterns += lesson_view_patterns('lesson', LessonView)
