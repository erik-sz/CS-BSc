import unittest

a = [1, 2, 3, 5, 6, 7]

def isNotNone():
   b = 10

class testSomething(unittest.TestCase):
   def test_fail(self):
      self.assertIs(True, 2)
   def test_arithmetic_fail(self):
      self.assertEqual(2 + 2, 3)
   def test_isEqual_Fail(self):
      self.assertEqual(True, False)
   def test_a_test2(self):
      self.assertNotEqual(True, False)
   def test_a_test3(self):
      self.assertTrue(True)
   def test_a_test4(self):
      self.assertIsNone(isNotNone())
   def test_a_test5(self):
      self.assertIn(4, a)
   def test_a_test6(self):
      self.assertIsInstance(a, list)
   def test_a_test7(self):
      self.assertNotIsInstance(a, list)


unittest.main()
