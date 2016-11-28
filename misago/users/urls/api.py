from django.conf.urls import url

from misago.core.apirouter import MisagoApiRouter

from ..api import auth, captcha
from ..api.ranks import RanksViewSet
from ..api.usernamechanges import UsernameChangesViewSet
from ..api.users import UserViewSet


urlpatterns = [
    url(r'^auth/$', auth.gateway, name='auth'),
    url(r'^auth/send-activation/$', auth.send_activation, name='send-activation'),
    url(r'^auth/send-password-form/$', auth.send_password_form, name='send-password-form'),
    url(r'^auth/change-password/(?P<pk>\d+)/(?P<token>[a-zA-Z0-9]+)/$', auth.change_forgotten_password, name='change-forgotten-password'),

    url(r'^captcha-question/$', captcha.question, name='captcha-question'),
]


router = MisagoApiRouter()
router.register(r'ranks', RanksViewSet)
router.register(r'users', UserViewSet)
router.register(r'username-changes', UsernameChangesViewSet, base_name='usernamechange')
urlpatterns += router.urls
