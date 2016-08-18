---
title: 'JavaScript SunSpider test: iOS 3.1.3 versus iOS 4 GM'
date: 2010-06-10
comments: true
author: David
layout: post
permalink: /2010/sunspider-ios-3-1-3-versus-ios-4-gm
categories: ["javascript", "performance", "mobile", "webdev"]
tags:
  - ios
  - iphone
  - sunspider
---
### Result table

<table>
  <tr>
    <td>
      Test
    </td>
    
    <td>
      iOS 3.1.3 (3GS)
    </td>
    
    <td>
      iOS 4 GM (3GS)
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
      15396ms
    </td>
    
    <td>
      13787ms
    </td>
    
    <td class="positive">
      -10.5%
    </td>
  </tr>
  
  <tr>
    <td>
      3D
    </td>
    
    <td>
      2411ms
    </td>
    
    <td>
      1917ms
    </td>
    
    <td class="positive">
      -20.5%
    </td>
  </tr>
  
  <tr>
    <td>
      Access
    </td>
    
    <td>
      1884ms
    </td>
    
    <td>
      1893ms
    </td>
    
    <td class="negative">
      +0.5%
    </td>
  </tr>
  
  <tr>
    <td>
      Bitops
    </td>
    
    <td>
      1044ms
    </td>
    
    <td>
      1239ms
    </td>
    
    <td class="negative">
      +18.7%
    </td>
  </tr>
  
  <tr>
    <td>
      Controlflow
    </td>
    
    <td>
      143ms
    </td>
    
    <td>
      221ms
    </td>
    
    <td class="negative">
      +54.5%
    </td>
  </tr>
  
  <tr>
    <td>
      Crypto
    </td>
    
    <td>
      982ms
    </td>
    
    <td>
      850ms
    </td>
    
    <td class="positive">
      -13.4%
    </td>
  </tr>
  
  <tr>
    <td>
      Date
    </td>
    
    <td>
      1355ms
    </td>
    
    <td>
      1065ms
    </td>
    
    <td class="positive">
      -21.4%
    </td>
  </tr>
  
  <tr>
    <td>
      Math
    </td>
    
    <td>
      2053ms
    </td>
    
    <td>
      1511ms
    </td>
    
    <td class="positive">
      -26.4%
    </td>
  </tr>
  
  <tr>
    <td>
      Regexp
    </td>
    
    <td>
      1616ms
    </td>
    
    <td>
      1916ms
    </td>
    
    <td class="negative">
      +18.6%
    </td>
  </tr>
  
  <tr>
    <td>
      String
    </td>
    
    <td>
      3908ms
    </td>
    
    <td>
      3175ms
    </td>
    
    <td class="positive">
      -18.8%
    </td>
  </tr>
</table>

### Thoughts

After running these SunSpider tests, it looks like overall there&#8217;s significant speed gains between iOS 3.1.3 and iOS 4 GM. However, it&#8217;s concerning from these tests there were some things that actually ran *slower* on iOS 4. This either represents a real speed loss between the versions, a margin of error, or some flaw or inconsistency while testing. Or maybe I possibly have some wrong setting on my phone? Any input would be appreciated.

### Testing methodology

Test: [SunSpider 0.9.1][1]

Device: iPhone 3GS

The test was run five separate times on the same phone for each version of the OS. The phone was completely turned off and on before each test.

The most extreme values of the five tests were thrown out, and the resulting four tests were averaged (sometimes from three tests when the values were very close together). I&#8217;m no statistics expert, so if you&#8217;d like to work it out for yourself, here are my raw test results:

[SunSpider iOS 3.1.3 results (5 tests)][2]

[SunSpider iOS 4 results (5 tests)][3]

### Related links

[Speed Test: iPhone 3GS Even Faster than Apple Claims][4]

 [1]: http://www2.webkit.org/perf/sunspider-0.9.1/sunspider-0.9.1/driver.html
 [2]: http://davidbcalhoun.com/wp-content/uploads/2010/iOS-3.1.3.html
 [3]: http://davidbcalhoun.com/wp-content/uploads/2010/iOS-4-GM.html
 [4]: http://www.medialets.com/blog/2009/06/24/speed-test-iphone-3gs-even-faster-than-apple-claims/