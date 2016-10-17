from django.core.exceptions import PermissionDenied
from django.utils.translation import gettext as _

from rest_framework.response import Response

from misago.acl import add_acl
from misago.categories.models import Category

from ...permissions.threads import can_start_thread


def thread_start_editor(request):
    if request.user.is_anonymous():
        raise PermissionDenied(_("You need to be signed in to start threads."))

    # list of categories that allow or contain subcategories that allow new threads
    available = []

    categories = []
    for category in Category.objects.filter(pk__in=request.user.acl['browseable_categories']).order_by('-lft'):
        add_acl(request.user, category)

        post = False
        if can_start_thread(request.user, category):
            post = {
                'close': bool(category.acl['can_close_threads']),
                'hide': bool(category.acl['can_hide_threads']),
                'pin': category.acl['can_pin_threads']
            }

            available.append(category.pk)
            available.append(category.parent_id)
        elif category.pk in available:
            available.append(category.parent_id)

        categories.append({
            'id': category.pk,
            'name': category.name,
            'level': category.level - 1,
            'post': post
        })

    # list only categories that allow new threads, or contains subcategory that allows one
    cleaned_categories = []
    for category in reversed(categories):
        if category['id'] in available:
            cleaned_categories.append(category)

    if not cleaned_categories:
        raise PermissionDenied(_("No categories that allow new threads are available to you at the moment."))

    return Response(cleaned_categories)
