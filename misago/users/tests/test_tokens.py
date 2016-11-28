from django.contrib.auth import get_user_model
from django.test import TestCase

from .. import tokens


class TokensTests(TestCase):
    def test_tokens(self):
        """misago.users.tokens implementation works"""
        User = get_user_model()

        user_a = User.objects.create_user('Bob', 'bob@test.com', 'pass123')
        user_b = User.objects.create_user('Weebl', 'weebl@test.com', 'pass123')

        token_a = tokens.make(user_a, 'test')
        token_b = tokens.make(user_b, 'test')

        self.assertTrue(tokens.is_valid(user_a, 'test', token_a))
        self.assertTrue(tokens.is_valid(user_b, 'test', token_b))
        self.assertTrue(token_a != token_b)
