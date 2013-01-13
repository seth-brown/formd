# -*- coding: utf-8 -*-

import formd

from distutils.core import setup


setup(
    name='formd',
    version=formd.__version__,
    description='A Markdown formatting tool',
    author='Seth Brown',
    author_email='sethbrown@drbunsen.org',
    url='http://drbunsen.github.com/formd/',
    packages=['formd', ],
    scripts=['bin/formd', ],
    requires=['markdown (>=2.0)', ],
    license='MIT',
    long_description=open('README.md').read(),
)
