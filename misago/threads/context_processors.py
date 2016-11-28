from django.core.urlresolvers import reverse


def preload_threads_urls(request):
    request.frontend_context.update({
        'ATTACHMENTS_API': reverse('misago:api:attachment-list'),
        'THREAD_EDITOR_API': reverse('misago:api:thread-editor')
    })

    return {}
