from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse

from ..models import BAN_USERNAME, Ban
from ..testutils import UserTestCase
from ..tokens import make_password_change_token


class ForgottenPasswordViewsTests(UserTestCase):
    def test_guest_request_view_returns_200(self):
        """request new password view returns 200 for guests"""
        response = self.client.get(reverse('misago:forgotten-password'))
        self.assertEqual(response.status_code, 200)

    def test_authenticated_request_view_returns_200(self):
        """request new password view returns 200 for authenticated"""
        self.login_user(self.get_authenticated_user())

        response = self.client.get(reverse('misago:forgotten-password'))
        self.assertEqual(response.status_code, 200)

    def test_change_password_on_banned(self):
        """change banned user password errors"""
        User = get_user_model()
        test_user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        Ban.objects.create(
            check_type=BAN_USERNAME,
            banned_value='bob',
            user_message='Nope!',
        )

        password_token = make_password_change_token(test_user)

        response = self.client.get(
            reverse('misago:forgotten-password-change-form', kwargs={
                'pk': test_user.pk,
                'token': password_token,
            }))
        self.assertContains(response, '<p>Nope!</p>', status_code=403)

    def test_change_password_on_other_user(self):
        """change other user password errors"""
        User = get_user_model()
        test_user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        password_token = make_password_change_token(test_user)

        self.login_user(self.get_authenticated_user())

        response = self.client.get(
            reverse('misago:forgotten-password-change-form', kwargs={
                'pk': test_user.pk,
                'token': password_token,
            }))
        self.assertContains(response, 'your link has expired', status_code=400)

    def test_change_password_invalid_token(self):
        """invalid form token errors"""
        User = get_user_model()
        test_user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        password_token = make_password_change_token(test_user)

        response = self.client.get(
            reverse('misago:forgotten-password-change-form', kwargs={
                'pk': test_user.pk,
                'token': 'abcdfghqsads',
            }))
        self.assertContains(response, 'your link is invalid', status_code=400)

    def test_change_password_form(self):
        """change user password form displays for valid token"""
        User = get_user_model()
        test_user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        password_token = make_password_change_token(test_user)

        response = self.client.get(
            reverse('misago:forgotten-password-change-form', kwargs={
                'pk': test_user.pk,
                'token': password_token,
            }))
        self.assertContains(response, password_token)
