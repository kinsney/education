from django.shortcuts import render,get_object_or_404
from home.models import Banner,LessonCategory,Lesson,LessonVideo,Activity
from rest_framework import routers, serializers, viewsets
from rest_framework.renderers import JSONRenderer
# Create your views here.

class BannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Banner
        fields = ('title','image','link')

class ActivitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Activity
        fields = ('title','thumbnail','video','description')

def home(request):
    try:
        carousels = Banner.objects.filter(is_visible=True,position='carousel').order_by('order')
        hotpots = Banner.objects.filter(is_visible=True,position='hotpot').order_by('order')
        categories = LessonCategory.objects.filter(is_closed=False,order=0)[:6]
        activities = Activity.objects.filter(is_visible=True).order_by('order')
    except:
        pass
    return render(request,'home.html',locals())



