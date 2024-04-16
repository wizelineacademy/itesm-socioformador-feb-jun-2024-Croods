import unittest
from main import app

class TestAPI(unittest.TestCase):
  def setUp(self):
    self.client = app.test_client()

  def test_get_root(self):
    response = self.client.get("/")
    self.assertEqual(response.status_code, 200)
    self.assertEqual(response.json(), {"Hello": "World"})