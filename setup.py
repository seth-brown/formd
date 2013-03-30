#!/usr/bin/env python
# -*- encoding: utf-8 -*-
"""
Author: Seth Brown
Description: description
"""
from src import formd
from distutils.core import setup

setup(
    name='formd',
    version=formd.__version__,
    description='A Markdown formatting tool',
    author='Seth Brown',
    author_email='sethbrown@drbunsen.org',
    url='http://drbunsen.github.com/formd/',
    packages=['', ],
    scripts=['src/formd.py', ],
    requires=['markdown (>=2.0)', ],
    license='MIT',
    long_description=open('README.md').read(),
)
