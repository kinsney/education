from django import template
from django.utils.translation import gettext as _

from misago.conf import settings


register = template.Library()


@register.simple_tag
def pagetitle(title, **kwargs):
    if 'page' in kwargs and kwargs['page'] > 1:
        title += u" (%s)" % (_(u"page: %(page)s") % {'page': kwargs['page']})

    if 'parent' in kwargs:
        title += u" | %s" % kwargs['parent']

    return title
