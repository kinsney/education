from django.conf import settings
from django.conf.urls import include, url

from misago.core.views import forum_index


# Register Misago Apps
urlpatterns = [
    url(r'^', include('misago.legal.urls')),
    url(r'^', include('misago.users.urls')),
    url(r'^', include('misago.categories.urls')),
    url(r'^', include('misago.threads.urls')),

    # "misago:index" link symbolises "root" of Misago links space
    # any request with path that falls below this one is assumed to be directed
    # at Misago and will be handled by misago.views.exceptionhandler if it
    # results in Http404 or PermissionDenied exception
    url(r'^$', forum_index, name='index'),
]


# Register API
apipatterns = [
    url(r'^', include('misago.categories.urls.api')),
    url(r'^', include('misago.markup.urls')),
    url(r'^', include('misago.threads.urls.api')),
    url(r'^', include('misago.users.urls.api')),
]

urlpatterns += [
    url(r'^api/', include(apipatterns, namespace='api')),
]


# Register Misago ACP
if settings.MISAGO_ADMIN_PATH:
    # Admin patterns recognised by Misago
    adminpatterns = [
        url(r'^', include('misago.admin.urls')),
    ]

    admin_prefix = r'^%s/' % settings.MISAGO_ADMIN_PATH
    urlpatterns += [
        url(admin_prefix, include(adminpatterns, namespace='admin')),
    ]


# Make error pages accessible casually in DEBUG
if settings.DEBUG:
    from misago.core import errorpages
    urlpatterns += [
        url(r'^403/$', errorpages.permission_denied),
        url(r'^404/$', errorpages.page_not_found),
        url(r'^405/$', errorpages.not_allowed),
        url(r'^csrf-failure/$', errorpages.csrf_failure),
    ]
