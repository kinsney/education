import json

from django.contrib.auth import get_user_model
from django.core import mail
from django.test import TestCase
from django.utils.encoding import smart_str

from ..models import BAN_USERNAME, Ban
from ..tokens import make_activation_token, make_password_change_token


class GatewayTests(TestCase):
    def test_api_invalid_credentials(self):
        """login api returns 400 on invalid POST"""
        response = self.client.post(
            '/api/auth/',
            data={'username': 'nope', 'password': 'nope'})

        self.assertContains(response, "Login or password is incorrect.", status_code=400)

        response = self.client.get('/api/auth/')
        self.assertEqual(response.status_code, 200)

        user_json = json.loads(smart_str(response.content))
        self.assertIsNone(user_json['id'])

    def test_login(self):
        """api signs user in"""
        User = get_user_model()
        user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        response = self.client.post('/api/auth/', data={
            'username': 'Bob',
            'password': 'Pass.123',
        })

        self.assertEqual(response.status_code, 200)

        response = self.client.get('/api/auth/')
        self.assertEqual(response.status_code, 200)

        user_json = json.loads(smart_str(response.content))
        self.assertEqual(user_json['id'], user.id)
        self.assertEqual(user_json['username'], user.username)

    def test_submit_empty(self):
        """login api errors for no body"""
        response = self.client.post('/api/auth/')
        self.assertContains(response, 'empty_data', status_code=400)

    def test_login_banned(self):
        """login api fails to sign banned user in"""
        User = get_user_model()
        User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        ban = Ban.objects.create(
            check_type=BAN_USERNAME,
            banned_value='bob',
            user_message='You are tragically banned.',
        )

        response = self.client.post('/api/auth/', data={
            'username': 'Bob',
            'password': 'Pass.123',
        })
        self.assertEqual(response.status_code, 400)

        response_json = json.loads(smart_str(response.content))
        self.assertEqual(response_json['code'], 'banned')
        self.assertEqual(response_json['detail']['message']['plain'],
                         ban.user_message)
        self.assertEqual(response_json['detail']['message']['html'],
                         '<p>%s</p>' % ban.user_message)

        response = self.client.get('/api/auth/')
        self.assertEqual(response.status_code, 200)

        user_json = json.loads(smart_str(response.content))
        self.assertIsNone(user_json['id'])

    def test_login_inactive_admin(self):
        """login api fails to sign admin-activated user in"""
        User = get_user_model()
        User.objects.create_user(
            'Bob', 'bob@test.com', 'Pass.123', requires_activation=1)

        response = self.client.post('/api/auth/', data={
            'username': 'Bob',
            'password': 'Pass.123',
        })
        self.assertEqual(response.status_code, 400)

        response_json = json.loads(smart_str(response.content))
        self.assertEqual(response_json['code'], 'inactive_user')

        response = self.client.get('/api/auth/')
        self.assertEqual(response.status_code, 200)

        user_json = json.loads(smart_str(response.content))
        self.assertIsNone(user_json['id'])

    def test_login_inactive_user(self):
        """login api fails to sign user-activated user in"""
        User = get_user_model()
        User.objects.create_user(
            'Bob', 'bob@test.com', 'Pass.123', requires_activation=2)

        response = self.client.post('/api/auth/', data={
            'username': 'Bob',
            'password': 'Pass.123',
        })
        self.assertEqual(response.status_code, 400)

        response_json = json.loads(smart_str(response.content))
        self.assertEqual(response_json['code'], 'inactive_admin')

        response = self.client.get('/api/auth/')
        self.assertEqual(response.status_code, 200)

        user_json = json.loads(smart_str(response.content))
        self.assertIsNone(user_json['id'])


class SendActivationAPITests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')
        self.user.requires_activation = 1
        self.user.save()

        self.link = '/api/auth/send-activation/'

    def test_submit_valid(self):
        """request activation link api sends reset link mail"""
        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertEqual(response.status_code, 200)

        self.assertIn('Activate Bob', mail.outbox[0].subject)

    def test_submit_banned(self):
        """request activation link api passes for banned users"""
        Ban.objects.create(
            check_type=BAN_USERNAME,
            banned_value=self.user.username,
            user_message='Nope!',
        )

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertEqual(response.status_code, 200)

        self.assertIn('Activate Bob', mail.outbox[0].subject)

    def test_submit_empty(self):
        """request activation link api errors for no body"""
        response = self.client.post(self.link)
        self.assertContains(response, 'empty_email', status_code=400)

        self.assertTrue(not mail.outbox)

    def test_submit_invalid(self):
        """request activation link api errors for invalid email"""
        response = self.client.post(self.link, data={'email': 'fake@mail.com'})
        self.assertContains(response, 'not_found', status_code=400)

        self.assertTrue(not mail.outbox)

    def test_submit_active_user(self):
        """request activation link api errors for active user"""
        self.user.requires_activation = 0
        self.user.save()

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertContains(response, 'Bob, your account is already active.', status_code=400)

    def test_submit_inactive_user(self):
        """request activation link api errors for admin-activated users"""
        self.user.requires_activation = 2
        self.user.save()

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertContains(response, 'inactive_admin', status_code=400)

        self.assertTrue(not mail.outbox)

        # but succeed for user-activated
        self.user.requires_activation = 1
        self.user.save()

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertEqual(response.status_code, 200)

        self.assertTrue(mail.outbox)


class SendPasswordFormAPITests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        self.link = '/api/auth/send-password-form/'

    def test_submit_valid(self):
        """request change password form link api sends reset link mail"""
        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertEqual(response.status_code, 200)

        self.assertIn('Change Bob password', mail.outbox[0].subject)

    def test_submit_banned(self):
        """request change password form link api sends reset link mail"""
        Ban.objects.create(
            check_type=BAN_USERNAME,
            banned_value=self.user.username,
            user_message='Nope!',
        )

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertEqual(response.status_code, 200)

        self.assertIn('Change Bob password', mail.outbox[0].subject)

    def test_submit_empty(self):
        """request change password form link api errors for no body"""
        response = self.client.post(self.link)
        self.assertContains(response, 'empty_email', status_code=400)

        self.assertTrue(not mail.outbox)

    def test_submit_invalid(self):
        """request change password form link api errors for invalid email"""
        response = self.client.post(self.link, data={'email': 'fake@mail.com'})
        self.assertContains(response, 'not_found', status_code=400)

        self.assertTrue(not mail.outbox)

    def test_submit_inactive_user(self):
        """request change password form link api errors for inactive users"""
        self.user.requires_activation = 1
        self.user.save()

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertContains(response, 'inactive_user', status_code=400)

        self.user.requires_activation = 2
        self.user.save()

        response = self.client.post(self.link, data={'email': self.user.email})
        self.assertContains(response, 'inactive_admin', status_code=400)

        self.assertTrue(not mail.outbox)


class ChangePasswordAPITests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.user = User.objects.create_user('Bob', 'bob@test.com', 'Pass.123')

        self.link = '/api/auth/change-password/%s/%s/'

    def test_submit_valid(self):
        """submit change password form api errors for empty body"""
        response = self.client.post(self.link % (
                self.user.pk,
                make_password_change_token(self.user)
            ), data={'password': 'n3wp4ss!'})
        self.assertEqual(response.status_code, 200)

        user = get_user_model().objects.get(id=self.user.pk)
        self.assertTrue(user.check_password('n3wp4ss!'))

    def test_invalid_token_link(self):
        """request errors on invalid user id link"""
        response = self.client.post(self.link % (
                self.user.pk,
                'asda7ad89sa7d9s789as'
            ))

        self.assertContains(response, 'Form link is invalid.', status_code=400)

    def test_banned_user_link(self):
        """request errors because user is banned"""
        Ban.objects.create(
            check_type=BAN_USERNAME,
            banned_value=self.user.username,
            user_message='Nope!',
        )

        response = self.client.post(self.link % (
                self.user.pk,
                make_password_change_token(self.user)
            ))
        self.assertContains(response, 'Your link has expired.', status_code=400)

    def test_inactive_user(self):
        """request change password form link api errors for inactive users"""
        self.user.requires_activation = 1
        self.user.save()

        response = self.client.post(self.link % (
                self.user.pk,
                make_password_change_token(self.user)
            ))
        self.assertContains(response, 'Your link has expired.', status_code=400)

        self.user.requires_activation = 2
        self.user.save()

        response = self.client.post(self.link % (
                self.user.pk,
                make_password_change_token(self.user)
            ))
        self.assertContains(response, 'Your link has expired.', status_code=400)

    def test_submit_empty(self):
        """submit change password form api errors for empty body"""
        response = self.client.post(self.link % (
                self.user.pk,
                make_password_change_token(self.user)
            ))
        self.assertContains(response, 'Valid password must', status_code=400)
