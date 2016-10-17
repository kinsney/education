from django.contrib.auth import get_user_model
from django.test import TestCase
from django.utils.six import StringIO

from ..management.commands import populateonlinetracker
from ..models import Online


class PopulateOnlineTrackerTests(TestCase):
    def test_populate_user_online(self):
        """user account without online tracker gets one"""
        User = get_user_model()

        test_user = User.objects.create_user('Bob', 'bob@bob.com', 'pass123')

        Online.objects.filter(user=test_user).delete()
        self.assertEqual(Online.objects.filter(user=test_user).count(), 0)

        out = StringIO()
        populateonlinetracker.Command().execute(stdout=out)
        command_output = out.getvalue().splitlines()[0].strip()

        self.assertEqual(command_output, 'Tracker entries created: 1')
        self.assertEqual(Online.objects.filter(user=test_user).count(), 1)
