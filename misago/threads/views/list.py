from django.conf import settings
from django.core.urlresolvers import reverse
from django.http import Http404
from django.shortcuts import render
from django.views.generic import View

from ..viewmodels.category import PrivateThreadsCategory, ThreadsCategory, ThreadsRootCategory
from ..viewmodels.threads import ForumThreads, PrivateThreads


class ListBase(View):
    category = None
    threads = None

    template_name = None

    def get(self, request, list_type=None, **kwargs):
        try:
            page = int(request.GET.get('page', 0))
        except (ValueError, TypeError):
            raise Http404()

        category = self.get_category(request, **kwargs)
        threads = self.get_threads(request, category, list_type, page)

        frontend_context = self.get_frontend_context(request, category, threads)
        request.frontend_context.update(frontend_context)

        template_context = self.get_template_context(request, category, threads)
        return render(request, self.template_name, template_context)

    def get_category(self, request, **kwargs):
        return self.category(request, **kwargs)

    def get_threads(self, request, category, list_type, page):
        return self.threads(request, category, list_type, page)

    def get_frontend_context(self, request, category, threads):
        context = self.get_default_frontend_context()

        context.update(category.get_frontend_context())
        context.update(threads.get_frontend_context())

        return context

    def get_default_frontend_context(self):
        return {}

    def get_template_context(self, request, category, threads):
        context = self.get_default_template_context()

        context.update(category.get_template_context())
        context.update(threads.get_template_context())

        return context

    def get_default_template_context(self):
        return {}


class ForumThreads(ListBase):
    category = ThreadsRootCategory
    threads = ForumThreads

    template_name = 'misago/threadslist/threads.html'

    def get_default_frontend_context(self):
        return {
            'THREADS_API': reverse('misago:api:thread-list'),
            'MERGE_THREADS_API': reverse('misago:api:thread-merge'),
        }


class CategoryThreads(ForumThreads):
    category = ThreadsCategory

    template_name = 'misago/threadslist/category.html'

    def get_category(self, request, **kwargs):
        category = super(CategoryThreads, self).get_category(request, **kwargs)
        if not category.level:
            raise Http404() # disallow root category access
        return category


class PrivateThreads(ListBase):
    category = PrivateThreadsCategory
    threads = PrivateThreads

    template_name = 'misago/threadslist/private_threads.html'
