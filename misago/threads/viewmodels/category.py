from django.http import Http404

from misago.acl import add_acl
from misago.categories.models import Category
from misago.categories.permissions import allow_browse_category, allow_see_category
from misago.categories.serializers import BasicCategorySerializer
from misago.core.viewmodel import ViewModel as BaseViewModel
from misago.core.shortcuts import validate_slug


__all__ = ['ThreadsRootCategory', 'ThreadsCategory', 'PrivateThreadsCategory']


class ViewModel(BaseViewModel):
    def __init__(self, request, **kwargs):
        self._categories = self.get_categories(request)
        add_acl(request.user, self._categories)

        self._model = self.get_category(request, self._categories, **kwargs)
        self._subcategories = list(filter(self._model.has_child, self._categories))
        self._children = list(filter(lambda s: s.parent_id == self._model.pk, self._subcategories))

    @property
    def categories(self):
        return self._categories

    @property
    def subcategories(self):
        return self._subcategories

    @property
    def children(self):
        return self._children

    def get_categories(self, request):
        raise NotImplementedError('Category view model has to implement get_categories(request)')

    def get_category(self, request, categories, **kwargs):
        return categories[0]

    def get_frontend_context(self):
        return {
            'CATEGORIES': BasicCategorySerializer(self._categories, many=True).data
        }

    def get_template_context(self):
        return {
            'category': self._model,
            'subcategories': self._children
        }


class ThreadsRootCategory(ViewModel):
    def get_categories(self, request):
        return [Category.objects.root_category()] + list(
            Category.objects.all_categories().filter(
                id__in=request.user.acl['browseable_categories']
            ).select_related('parent'))


class ThreadsCategory(ThreadsRootCategory):
    @property
    def level(self):
        return self._model.level

    def get_category(self, request, categories, **kwargs):
        for category in categories:
            if category.pk == int(kwargs['pk']):
                if not category.special_role:
                    # don't check permissions for non-special category
                    allow_see_category(request.user, category)
                    allow_browse_category(request.user, category)

                if 'slug' in kwargs:
                    validate_slug(category, kwargs['slug'])

                return category
        raise Http404()


class PrivateThreadsCategory(ViewModel):
    pass
