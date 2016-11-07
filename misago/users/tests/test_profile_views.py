from django.contrib.auth import get_user_model
from django.core.urlresolvers import reverse
from django.utils.six.moves import range

from misago.acl.testutils import override_acl

from ..models import Ban
from ..testutils import AuthenticatedUserTestCase


class UserProfileViewsTests(AuthenticatedUserTestCase):
    def setUp(self):
        super(UserProfileViewsTests, self).setUp()
        self.link_kwargs = {
            'slug': self.user.slug,
            'pk': self.user.pk
        }

    def test_outdated_slugs(self):
        """user profile view redirects to valid slig"""
        invalid_kwargs = {'slug': 'baww', 'pk': self.user.pk}
        response = self.client.get(reverse('misago:user-posts',
                                           kwargs=invalid_kwargs))

        self.assertEqual(response.status_code, 301)

    def test_user_posts_list(self):
        """user profile posts list has no showstoppers"""
        response = self.client.get(reverse('misago:user-posts',
                                           kwargs=self.link_kwargs))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'no messages posted')

    def test_user_threads_list(self):
        """user profile threads list has no showstoppers"""
        response = self.client.get(reverse('misago:user-threads',
                                           kwargs=self.link_kwargs))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'no started threads')

    def test_user_followers(self):
        """user profile followers list has no showstoppers"""
        User = get_user_model()

        response = self.client.get(reverse('misago:user-followers',
                                           kwargs=self.link_kwargs))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'You have no followers.')

        followers = []
        for i in range(10):
            user_data = ("Follower%s" % i, "foll%s@test.com" % i, "Pass.123")
            followers.append(User.objects.create_user(*user_data))
            self.user.followed_by.add(followers[-1])

        response = self.client.get(reverse('misago:user-followers',
                                           kwargs=self.link_kwargs))
        self.assertEqual(response.status_code, 200)
        for i in range(10):
            self.assertContains(response, "Follower%s" % i)

    def test_user_follows(self):
        """user profile follows list has no showstoppers"""
        User = get_user_model()

        response = self.client.get(reverse('misago:user-follows',
                                           kwargs=self.link_kwargs))

        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'You are not following any users.')

        followers = []
        for i in range(10):
            user_data = ("Follower%s" % i, "foll%s@test.com" % i, "Pass.123")
            followers.append(User.objects.create_user(*user_data))
            followers[-1].followed_by.add(self.user)

        response = self.client.get(reverse('misago:user-follows',
                                           kwargs=self.link_kwargs))
        self.assertEqual(response.status_code, 200)
        for i in range(10):
            self.assertContains(response, "Follower%s" % i)

    def test_username_history_list(self):
        """user name changes history list has no showstoppers"""
        response = self.client.get(reverse('misago:username-history',
                                           kwargs=self.link_kwargs))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'Your username was never changed.')

        self.user.set_username('RenamedAdmin')
        self.user.save()
        self.user.set_username('TestUser')
        self.user.save()

        response = self.client.get(reverse('misago:username-history',
                                           kwargs=self.link_kwargs))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, "TestUser")
        self.assertContains(response, "RenamedAdmin")

    def test_user_ban_details(self):
        """user ban details page has no showstoppers"""
        override_acl(self.user, {
            'can_see_ban_details': 0,
        })

        User = get_user_model()
        test_user = User.objects.create_user("Bob", "bob@bob.com", 'pass.123')
        link_kwargs = {'slug': test_user.slug, 'pk': test_user.pk}

        response = self.client.get(reverse('misago:user-ban',
                                           kwargs=link_kwargs))
        self.assertEqual(response.status_code, 404)

        override_acl(self.user, {
            'can_see_ban_details': 1,
        })

        response = self.client.get(reverse('misago:user-ban',
                                           kwargs=link_kwargs))
        self.assertEqual(response.status_code, 404)

        override_acl(self.user, {
            'can_see_ban_details': 1,
        })
        test_user.ban_cache.delete()

        Ban.objects.create(banned_value=test_user.username,
                           user_message="User m3ss4ge.",
                           staff_message="Staff m3ss4ge.",
                           is_checked=True)

        response = self.client.get(reverse('misago:user-ban',
                                           kwargs=link_kwargs))
        self.assertEqual(response.status_code, 200)
        self.assertContains(response, 'User m3ss4ge')
        self.assertContains(response, 'Staff m3ss4ge')
