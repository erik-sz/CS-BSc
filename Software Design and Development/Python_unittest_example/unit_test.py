import unittest

a = True
b = 25

class testSomething(unittest.TestCase):
   def test_cox(self):
      self.assertIs(a, b)
    

unittest.main()
