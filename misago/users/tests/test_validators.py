#-*- coding: utf-8 -*-
from django.contrib.auth import get_user_model
from django.core.exceptions import PermissionDenied, ValidationError
from django.test import TestCase

from misago.conf import settings

from ..models import BAN_EMAIL, BAN_USERNAME, Ban
from ..validators import (
    validate_email,
    validate_email_available,
    validate_email_banned,
    validate_gmail_email,
    validate_password,
    validate_username,
    validate_username_available,
    validate_username_banned,
    validate_username_content,
    validate_username_length
)


class ValidateEmailAvailableTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.test_user = User.objects.create_user('EricTheFish',
                                                  'eric@test.com',
                                                  'pass123')

    def test_valid_email(self):
        """validate_email_available allows available emails"""
        validate_email_available('bob@boberson.com')
        validate_email_available(self.test_user.email, exclude=self.test_user)

    def test_invalid_email(self):
        """validate_email_available disallows unvailable emails"""
        with self.assertRaises(ValidationError):
            validate_email_available(self.test_user.email)


class ValidateEmailBannedTests(TestCase):
    def setUp(self):
        Ban.objects.create(check_type=BAN_EMAIL, banned_value="ban@test.com")

    def test_unbanned_name(self):
        """unbanned email passes validation"""
        validate_email_banned('noban@test.com')

    def test_banned_name(self):
        """banned email fails validation"""
        with self.assertRaises(ValidationError):
            validate_email_banned('ban@test.com')


class ValidateEmailTests(TestCase):
    def test_validate_email(self):
        """validate_email has no crashes"""
        validate_email('bob@boberson.com')
        with self.assertRaises(ValidationError):
            validate_email('*')


class ValidatePasswordTests(TestCase):
    def test_valid_password(self):
        """validate_password allows valid password"""
        validate_password('A' * (settings.password_length_min + 1))

    def test_invalid_name(self):
        """validate_password disallows invalid password"""
        with self.assertRaises(ValidationError):
            validate_password('A' * (settings.password_length_min - 1))


class ValidateUsernameTests(TestCase):
    def test_validate_username(self):
        """validate_username has no crashes"""
        validate_username('LeBob')
        with self.assertRaises(ValidationError):
            validate_username('*')


class ValidateUsernameAvailableTests(TestCase):
    def setUp(self):
        User = get_user_model()
        self.test_user = User.objects.create_user('EricTheFish',
                                                  'eric@test.com',
                                                  'pass123')

    def test_valid_name(self):
        """validate_username_available allows available names"""
        validate_username_available('BobBoberson')
        validate_username_available(self.test_user.username,
                                    exclude=self.test_user)

    def test_invalid_name(self):
        """validate_username_available disallows unvailable names"""
        with self.assertRaises(ValidationError):
            validate_username_available(self.test_user.username)


class ValidateUsernameBannedTests(TestCase):
    def setUp(self):
        Ban.objects.create(check_type=BAN_USERNAME, banned_value="Bob")

    def test_unbanned_name(self):
        """unbanned name passes validation"""
        validate_username_banned('Luke')

    def test_banned_name(self):
        """banned name fails validation"""
        with self.assertRaises(ValidationError):
            validate_username_banned('Bob')


class ValidateUsernameContentTests(TestCase):
    def test_valid_name(self):
        """validate_username_content allows valid names"""
        validate_username_content('123')
        validate_username_content('Bob')
        validate_username_content('Bob123')

    def test_invalid_name(self):
        """validate_username_content disallows invalid names"""
        with self.assertRaises(ValidationError):
            validate_username_content('!')
        with self.assertRaises(ValidationError):
            validate_username_content('Bob!')
        with self.assertRaises(ValidationError):
            validate_username_content('Bob Boberson')
        with self.assertRaises(ValidationError):
            validate_username_content(u'Rafał')
        with self.assertRaises(ValidationError):
            validate_username_content(u'初音 ミク')


class ValidateUsernameLengthTests(TestCase):
    def test_valid_name(self):
        """validate_username_length allows valid names"""
        validate_username_length('a' * settings.username_length_min)
        validate_username_length('a' * settings.username_length_max)

    def test_invalid_name(self):
        """validate_username_length disallows invalid names"""
        with self.assertRaises(ValidationError):
            validate_username_length('a' * (settings.username_length_min - 1))
        with self.assertRaises(ValidationError):
            validate_username_length('a' * (settings.username_length_max + 1))


class ValidateGmailEmailTests(TestCase):
    def test_validate_gmail_email(self):
        """validate_gmail_email spots spammy gmail address"""
        validate_gmail_email('', '', 'the.bob.boberson@gmail.com')
        validate_gmail_email('', '', 'the.bob.boberson@hotmail.com')

        with self.assertRaises(PermissionDenied):
            validate_gmail_email('', '', 'the.b.o.b.b.ob.e.r.son@gmail.com')
