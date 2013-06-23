import unittest
import sys
sys.path.append('..')
from formd import ForMd

class TestForMd(unittest.TestCase):
    no_md = ''
    ref = '[Markdown][1]\n\n\n[1]: http://en.wikipedia.com/wiki/Markdown'
    inl = '[Markdown](http://en.wikipedia.com/wiki/Markdown)'

    def test_none(self):
        f = ForMd(self.no_md)
        flip_conv = f.flip()
        f = ForMd(flip_conv)
        flip_conv = f.flip()
        self.assertEqual(self.no_md, flip_conv)

    def test_ref(self):
        f = ForMd(self.inl)
        ref_conv = list(f.ref_md())[0]
        self.assertEqual(self.ref, ref_conv)

    def test_inl(self):
        f = ForMd(self.ref)
        inline_conv = list(f.inline_md())[0]
        self.assertEqual(self.inl, inline_conv)

    def test_flip(self):
        f = ForMd(self.ref)
        inline_conv = list(f.inline_md())[0]
        self.assertEqual(self.inl, inline_conv)

    def test_break_url(self):
        """ Format URLs spanning across a line break
        """
        cross_inl = self.inl.replace('http:', 'http:\n')
        cross_ref = self.ref.replace('http:', 'http:')
        f = ForMd(cross_inl)
        ref_conv = list(f.ref_md())[0]
        self.assertEqual(cross_ref, ref_conv)


if __name__ == '__main__':
    unittest.main()
