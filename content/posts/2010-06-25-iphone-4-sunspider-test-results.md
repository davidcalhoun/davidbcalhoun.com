---
title: iPhone 4 SunSpider test results (22% faster than iPhone 3GS)
date: 2010-06-25
comments: true
author: David
layout: post
permalink: /2010/iphone-4-sunspider-test-results
aliases:
- /2010/iphone-4-sunspider-test-results
tags:
- iphone
- iphone 4
- performance
- sunspider
- javascript
- mobile
- webdev
---

```
============================================
RESULTS (means and 95% confidence intervals)
--------------------------------------------
Total:                 10669.4ms +/- 1.0%
--------------------------------------------

  3d:                   1471.5ms +/- 2.1%
    cube:                428.7ms +/- 2.6%
    morph:               584.3ms +/- 4.7%
    raytrace:            458.5ms +/- 0.6%

  access:               1476.7ms +/- 1.3%
    binary-trees:        151.6ms +/- 1.3%
    fannkuch:            664.0ms +/- 0.1%
    nbody:               397.9ms +/- 2.1%
    nsieve:              263.2ms +/- 6.3%

  bitops:                947.2ms +/- 2.1%
    3bit-bits-in-byte:   195.7ms +/- 2.0%
    bits-in-byte:        206.1ms +/- 1.0%
    bitwise-and:         179.7ms +/- 1.1%
    nsieve-bits:         365.7ms +/- 3.9%

  controlflow:           169.5ms +/- 8.0%
    recursive:           169.5ms +/- 8.0%

  crypto:                668.7ms +/- 1.0%
    aes:                 307.0ms +/- 1.4%
    md5:                 181.1ms +/- 3.1%
    sha1:                180.6ms +/- 1.0%

  date:                  838.4ms +/- 4.6%
    format-tofte:        420.9ms +/- 7.4%
    format-xparb:        417.5ms +/- 2.8%

  math:                 1161.9ms +/- 1.0%
    cordic:              424.9ms +/- 0.5%
    partial-sums:        385.1ms +/- 0.3%
    spectral-norm:       351.9ms +/- 2.9%

  regexp:               1479.3ms +/- 0.1%
    dna:                1479.3ms +/- 0.1%

  string:               2456.2ms +/- 0.9%
    base64:              347.6ms +/- 3.1%
    fasta:               408.1ms +/- 6.7%
    tagcloud:            447.7ms +/- 0.6%
    unpack-code:         797.8ms +/- 0.4%
    validate-input:      455.0ms +/- 0.4%
```

### Summary

Thanks to my coworker for lending me his phone for a few minutes (he waited in line for 9 hours yesterday when it first went on sale!).

This is quite an improvement over the [iPhone 3GS running iOS4, which ran the SunSpider test in 13787ms][1]. The iPhone 4 ran the same test in 10669ms, which makes it ~22% faster head-to-head.

### Processors

The iPhone 3GS has a Samsung S5PC100 ARM Cortex-A8[5] 833 MHz (underclocked to 600 MHz), while the iPhone 4 has an Apple A4 1GHz (likely underclocked to an unknown speed).

 [1]: http://davidbcalhoun.com/2010/sunspider-ios-3-1-3-versus-ios-4-gm