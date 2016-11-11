from django.conf.urls import  include,url
from . import views
from rest_framework import routers, serializers, viewsets
from .models import Banner,LessonCategory,Lesson,LessonVideo

class BannerSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Banner
        fields = ('title', 'position','image','link','order')

class CarouselViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.filter(is_visible=True,position='carousel')
    serializer_class = BannerSerializer

class HotpotViewSet(viewsets.ModelViewSet):
    queryset = Banner.objects.filter(is_visible=True,position='hotpot')
    serializer_class = BannerSerializer

router = routers.DefaultRouter()
router.register(r'banners', CarouselViewSet)
router.register(r'hotpots', HotpotViewSet)

urlpatterns = [
    url(r'^$',views.home),
    url(r'^api/',include(router.urls))
]

