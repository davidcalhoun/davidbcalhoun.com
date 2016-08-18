---
title: BlackBerry Torch SunSpider results (JavaScript benchmark)
date: 2010-08-18
comments: true
author: David
layout: post
permalink: /2010/blackberry-torch-sunspider-results-javascript-benchmark
categories: ["javascript", "performance", "mobile", "webdev"]
tags:
  - blackberry
  - sunspider
  - webkit
---
### Results

<pre>============================================
RESULTS (means and 95% confidence intervals)
--------------------------------------------
Total:                 322.2ms +/- 4.9%
--------------------------------------------

  3d:                   55.0ms +/- 15.3%
    cube:               19.8ms +/- 12.1%
    morph:              16.6ms +/- 35.8%
    raytrace:           18.6ms +/- 22.5%

  access:               32.8ms +/- 12.4%
    binary-trees:        1.8ms +/- 30.9%
    fannkuch:           14.2ms +/- 7.3%
    nbody:              12.6ms +/- 26.7%
    nsieve:              4.2ms +/- 24.8%

  bitops:               29.4ms +/- 10.2%
    3bit-bits-in-byte:   2.4ms +/- 28.4%
    bits-in-byte:        8.0ms +/- 15.5%
    bitwise-and:         8.6ms +/- 21.9%
    nsieve-bits:        10.4ms +/- 21.7%

  controlflow:           2.4ms +/- 28.4%
    recursive:           2.4ms +/- 28.4%

  crypto:               22.0ms +/- 10.6%
    aes:                 9.8ms +/- 27.5%
    md5:                 6.2ms +/- 22.0%
    sha1:                6.0ms +/- 20.7%

  date:                 33.2ms +/- 11.7%
    format-tofte:       16.6ms +/- 20.2%
    format-xparb:       16.6ms +/- 13.6%

  math:                 32.6ms +/- 15.2%
    cordic:             12.0ms +/- 29.3%
    partial-sums:       15.2ms +/- 20.4%
    spectral-norm:       5.4ms +/- 20.6%

  regexp:               15.6ms +/- 7.1%
    dna:                15.6ms +/- 7.1%

  string:               99.2ms +/- 14.0%
    base64:              9.2ms +/- 14.8%
    fasta:              14.4ms +/- 27.7%
    tagcloud:           27.2ms +/- 23.2%
    unpack-code:        31.8ms +/- 14.5%
    validate-input:     16.6ms +/- 18.0%
</pre>

### Related articles

[iPhone 4 SunSpider test results (22% faster than iPhone 3GS)][1]  
[JavaScript SunSpider test: iOS 3.1.3 versus iOS 4 GM][2]  
[JavaScript SunSpider: HTC Evo versus HTC Incredible versus Nexus One][3]  
[Sencha: BlackBerry Torch: The HTML5 Developer Scorecard][4]

 [1]: http://davidbcalhoun.com/2010/iphone-4-sunspider-test-results
 [2]: http://davidbcalhoun.com/2010/sunspider-ios-3-1-3-versus-ios-4-gm
 [3]: http://davidbcalhoun.com/2010/javascript-sunspider-htc-evo-versus-htc-incredible-versus-nexus-one
 [4]: http://www.sencha.com/blog/2010/08/18/blackberry-torch-the-html5-developer-scorecard/