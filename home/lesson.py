from django.shortcuts import get_object_or_404
from django.core.urlresolvers import reverse
from django.shortcuts import render
from django.views.generic import View

from .models import Lesson,LessonVideo

BASE_RELATIONS = (
    'category',
    'teacher',
)

class ViewModel(object):
    def __init__(self,request,pk,slug=None):
        model = self.get_lesson(request,pk,slug)
        self._model = model
        self._category = model.category
        self._teacher = model.teacher

    def get_lesson(self, request, pk, slug=None, select_for_update=False):
        raise NotImplementedError('Lesson view model has to implement get_Lesson(request, pk, slug=None)')

    def get_template_context(self):
        return {
            'lesson': self._model,
            'category': self._category,
            'teacher': self._teacher
        }
class HomeLesson(ViewModel):
    def get_lesson(self,request,pk,slug=None,select_for_update=False):
        if select_for_update:
            queryset = Lesson.objects.select_for_update().select_related('category')
        else:
            queryset = Lesson.objects.select_related(*BASE_RELATIONS)

        lesson = get_object_or_404(
                queryset,
                pk=pk,
            )
        return lesson



class LessonBase(View):
    lesson = None
    video = None
    template_name = None

    def get(self,request,pk,slug):
        lesson = self.get_lesson(request, pk, slug)
        template_context = self.get_template_context(request,lesson)
        return render(request, self.template_name, template_context)

    def get_lesson(self, request, pk, slug):
        return self.lesson(request, pk, slug)

    def get_template_context(self, request, lesson):
        context = {
            'url_name': ':'.join(request.resolver_match.namespaces + [request.resolver_match.url_name]),
        }
        context.update(lesson.get_template_context())
        return context

class LessonView(LessonBase):
    lesson = HomeLesson
    template_name = 'home/lesson.html'
