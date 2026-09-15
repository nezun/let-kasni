import runpy
import unittest
from pathlib import Path

matches = runpy.run_path(str(Path(__file__).with_name('seo-release-monitor.py')))['redirect_matches']
schemas_valid = runpy.run_path(str(Path(__file__).with_name('seo-release-monitor.py')))['schemas_valid']


class RedirectContract(unittest.TestCase):
    def test_schema_matches_existing_template_contract(self):
        self.assertTrue(schemas_valid([], required=False))
        self.assertFalse(schemas_valid([], required=True))
        self.assertFalse(schemas_valid([{'parse_error': 'invalid'}], required=False))
        self.assertTrue(schemas_valid([{'@type': 'Article'}], required=True))

    def test_relative_permanent_redirect(self):
        self.assertTrue(matches(308, '/target?a=one%20two&a=3', 'https://letkasni.rs/source', 'https://letkasni.rs/target?a=one+two&a=3'))

    def test_wrong_host_or_language_is_rejected(self):
        self.assertFalse(matches(308, 'https://other.test/target', 'https://letkasni.rs/source', 'https://letkasni.rs/target'))
        self.assertFalse(matches(308, '/en/target', 'https://letkasni.rs/source', 'https://letkasni.rs/target'))

    def test_temporary_missing_or_lost_query_is_rejected(self):
        self.assertFalse(matches(302, '/target', 'https://letkasni.rs/source', 'https://letkasni.rs/target'))
        self.assertFalse(matches(308, '', 'https://letkasni.rs/source', 'https://letkasni.rs/target'))
        self.assertFalse(matches(308, '/target?a=1', 'https://letkasni.rs/source', 'https://letkasni.rs/target?a=1&a=2'))


if __name__ == '__main__':
    unittest.main()
