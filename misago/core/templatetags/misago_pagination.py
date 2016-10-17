from django import template
from django.core.urlresolvers import reverse
from django.template import Context
from django.template.loader import get_template


register = template.Library()


@register.simple_tag
def pagination(page, template, link_name, **kwargs):
    template = get_template(template)

    context = kwargs
    context.update({
        'paginator': page.paginator,
        'page': page,
        'link_name': link_name,
    })

    return template.render(Context(context))


@register.simple_tag
def pageurl(link, kwargs, page=None):
    if page > 1:
        kwargs['page'] = page
    else:
        kwargs.pop('page', None)

    return reverse(link, kwargs=kwargs)
