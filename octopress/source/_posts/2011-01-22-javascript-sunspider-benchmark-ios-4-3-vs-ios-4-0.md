---
title: 'JavaScript SunSpider benchmark: iOS 4.3 vs iOS 4.0'
date: 2011-01-22
comments: true
author: David
layout: post
permalink: /2011/javascript-sunspider-benchmark-ios-4-3-vs-ios-4-0
categories: ["javascript", "performance", "mobile", "ios", "webdev"]
---
### Result table (SunSpider 0.9.1)

<table>
  <tr>
    <td>
      Test
    </td>
    
    <td>
      iOS 4 (3GS)
    </td>
    
    <td>
      iOS 4.3 beta 2 (3GS)
    </td>
    
    <td>
      % change
    </td>
  </tr>
  
  <tr>
    <td>
      Total
    </td>
    
    <td>
      13787ms
    </td>
    
    <td class="positive">
      5357ms
    </td>
    
    <td class="positive">
      -61.1%
    </td>
  </tr>
  
  <tr>
    <td>
      3D
    </td>
    
    <td>
      1917ms
    </td>
    
    <td class="positive">
      737ms
    </td>
    
    <td class="positive">
      -61.6%
    </td>
  </tr>
  
  <tr>
    <td>
      Access
    </td>
    
    <td>
      1893ms
    </td>
    
    <td class="positive">
      617ms
    </td>
    
    <td class="positive">
      -67.4%
    </td>
  </tr>
  
  <tr>
    <td>
      Bitops
    </td>
    
    <td>
      1239ms
    </td>
    
    <td class="positive">
      289ms
    </td>
    
    <td class="positive">
      -76.7%
    </td>
  </tr>
  
  <tr>
    <td>
      Controlflow
    </td>
    
    <td>
      221ms
    </td>
    
    <td class="positive">
      35ms
    </td>
    
    <td class="positive">
      -84.2%
    </td>
  </tr>
  
  <tr>
    <td>
      Crypto
    </td>
    
    <td>
      850ms
    </td>
    
    <td class="positive">
      308ms
    </td>
    
    <td class="positive">
      -63.8%
    </td>
  </tr>
  
  <tr>
    <td>
      Date
    </td>
    
    <td>
      1065ms
    </td>
    
    <td class="positive">
      706ms
    </td>
    
    <td class="positive">
      -33.7%
    </td>
  </tr>
  
  <tr>
    <td>
      Math
    </td>
    
    <td>
      1511ms
    </td>
    
    <td class="positive">
      606ms
    </td>
    
    <td class="positive">
      -59.9%
    </td>
  </tr>
  
  <tr>
    <td>
      Regexp
    </td>
    
    <td>
      1916ms
    </td>
    
    <td class="positive">
      153ms
    </td>
    
    <td class="positive">
      -92.0%
    </td>
  </tr>
  
  <tr>
    <td>
      String
    </td>
    
    <td>
      3175ms
    </td>
    
    <td class="positive">
      1907ms
    </td>
    
    <td class="positive">
      -39.9%
    </td>
  </tr>
</table>

### Raw results (iOS 4.3 beta 2 running on my iPhone 3GS)

<pre>============================================
RESULTS (means and 95% confidence intervals)
--------------------------------------------
Total:                  5357.3ms +/- 2.3%
--------------------------------------------

  3d:                    736.9ms +/- 7.5%
    cube:                260.1ms +/- 3.5%
    morph:               206.0ms +/- 23.2%
    raytrace:            270.8ms +/- 4.4%

  access:                617.4ms +/- 4.1%
    binary-trees:        118.8ms +/- 4.7%
    fannkuch:            180.4ms +/- 0.7%
    nbody:               222.0ms +/- 11.7%
    nsieve:               96.2ms +/- 0.8%

  bitops:                288.7ms +/- 9.6%
    3bit-bits-in-byte:    38.0ms +/- 4.3%
    bits-in-byte:         70.5ms +/- 39.0%
    bitwise-and:          85.1ms +/- 1.9%
    nsieve-bits:          95.1ms +/- 2.1%

  controlflow:            34.7ms +/- 3.2%
    recursive:            34.7ms +/- 3.2%

  crypto:                308.3ms +/- 1.1%
    aes:                 175.2ms +/- 0.5%
    md5:                  79.3ms +/- 3.9%
    sha1:                 53.8ms +/- 0.8%

  date:                  706.2ms +/- 5.5%
    format-tofte:        341.3ms +/- 11.0%
    format-xparb:        364.9ms +/- 1.1%

  math:                  605.9ms +/- 1.1%
    cordic:              224.5ms +/- 1.0%
    partial-sums:        263.4ms +/- 2.3%
    spectral-norm:       118.0ms +/- 1.2%

  regexp:                152.5ms +/- 5.5%
    dna:                 152.5ms +/- 5.5%

  string:               1906.7ms +/- 0.7%
    base64:              247.9ms +/- 2.4%
    fasta:               268.5ms +/- 0.6%
    tagcloud:            370.4ms +/- 3.0%
    unpack-code:         676.2ms +/- 0.3%
    validate-input:      343.7ms +/- 1.4%
</pre>

[Raw results for iOS 4.0][1]

### Related

[BlackBerry Torch SunSpider results (JavaScript benchmark)][2]  
[iPhone 4 SunSpider test results (22% faster than iPhone 3GS)][3]  
[JavaScript SunSpider test: iOS 3.1.3 versus iOS 4 GM][4]  
[JavaScript SunSpider: HTC Evo versus HTC Incredible versus Nexus One][5]

 [1]: http://davidbcalhoun.com/wp-content/uploads/2010/iOS-4-GM.html
 [2]: http://davidbcalhoun.com/2010/blackberry-torch-sunspider-results-javascript-benchmark
 [3]: http://davidbcalhoun.com/2010/iphone-4-sunspider-test-results
 [4]: http://davidbcalhoun.com/2010/sunspider-ios-3-1-3-versus-ios-4-gm
 [5]: http://davidbcalhoun.com/2010/javascript-sunspider-htc-evo-versus-htc-incredible-versus-nexus-one