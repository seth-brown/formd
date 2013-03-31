import unittest
import sys
sys.path.append('..')
from formd import ForMd

class TestForMd(unittest.TestCase):
    ref = '[Markdown][1]\n\n\n[1]: http://en.wikipedia.com/wiki/Markdown'
    inl = '[Markdown](http://en.wikipedia.com/wiki/Markdown)'
    txt = '\n\n'.join(('I like this [pangram][10]:',
          'Quick wafting zephyrs vex bold Jim[^fn2]',
          'This one is exactly 26 letters:',
          'Blowzy night-frumps vex\'d Jack Q.[^fn1]',
          '[^fn1]: This is a perfect one!',
          '[^fn2]: This is not a perfect pangram\n',
          '[10]: http://en.wikipedia.org/wiki/Pangram'))

    def test_ref(self):
        f = ForMd(self.inl)
        ref_conv = f.ref_md()
        self.assertEqual(self.ref, ref_conv)

    def test_inl(self):
        f = ForMd(self.ref)
        inline_conv = f.inline_md()
        self.assertEqual(self.inl, inline_conv)

    def test_crossinl(self):
        """ Format URLs spanning across line breaks
        """
        cross_inl = self.inl.replace(':', ':\n')
        f = ForMd(cross_inl)
        ref_conv = f.ref_md()
        self.assertEqual(self.ref, ref_conv)

    def test_fancy(self):
        txt = '\n\n'.join(('I like this [pangram][1]:',
              'Quick wafting zephyrs vex bold Jim[^fn1]',
              'This one is exactly 26 letters:',
              'Blowzy night-frumps vex\'d Jack Q.[^fn2]',
              '[^fn1]: This is not a perfect pangram',
              '[^fn2]: This is a perfect one!\n',
              '[1]: http://en.wikipedia.org/wiki/Pangram'))
        f = ForMd(self.txt)
        formd_txt = f.ref_md()
        self.assertEqual(txt, formd_txt)


if __name__ == '__main__':
    unittest.main()
