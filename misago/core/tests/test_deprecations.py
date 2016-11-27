import warnings

from django.test import TestCase, override_settings
from django.utils import six

from ..deprecations import RemovedInMisagoWarning, warn


class DeprecationsTests(TestCase):
    def test_deprecations_warn(self):
        """deprecation utility raises warning"""
        with warnings.catch_warnings(record=True) as warning:
            warn("test warning")

            self.assertEqual(len(warning), 1)
            self.assertEqual(six.text_type(warning[0].message), "test warning")
            self.assertTrue(issubclass(warning[0].category, RemovedInMisagoWarning))
