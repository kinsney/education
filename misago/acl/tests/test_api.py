from django.test import TestCase

from misago.users.models import AnonymousUser, User

from ..api import get_user_acl


class GetUserACLTests(TestCase):
    def test_get_authenticated_acl(self):
        """get ACL for authenticated user"""
        test_user = User.objects.create_user('Bob', 'bob@bob.com', 'pass123')
        acl = get_user_acl(test_user)

        self.assertTrue(acl)
        self.assertEqual(acl, test_user.acl)

    def test_get_anonymous_acl(self):
        """get ACL for unauthenticated user"""
        acl = get_user_acl(AnonymousUser())

        self.assertTrue(acl)
        self.assertEqual(acl, AnonymousUser().acl)
