---
title: 'JavaScript SunSpider: HTC Evo versus HTC Incredible versus Nexus One'
date: 2010-06-10
comments: true
author: David
layout: post
permalink: /2010/javascript-sunspider-htc-evo-versus-htc-incredible-versus-nexus-one
categories: ["javascript", "performance", "mobile", "webdev"]
tags:
  - htc evo
  - htc incredible
  - javascript
  - mobile
  - nexus one
  - sunspider
---
### Result table

<table>
  <tr>
    <td>
      Test
    </td>
    
    <td>
      Evo (2.1)
    </td>
    
    <td>
      Incredible (2.1)
    </td>
    
    <td>
      Nexus One (2.2)
    </td>
  </tr>
  
  <tr>
    <td>
      Total
    </td>
    
    <td>
      16167ms
    </td>
    
    <td>
      15237ms
    </td>
    
    <td class="positive">
      5452ms
    </td>
  </tr>
  
  <tr>
    <td>
      3D
    </td>
    
    <td>
      2014ms
    </td>
    
    <td>
      1835ms
    </td>
    
    <td class="positive">
      946ms
    </td>
  </tr>
  
  <tr>
    <td>
      Access
    </td>
    
    <td>
      2126ms
    </td>
    
    <td>
      1892ms
    </td>
    
    <td class="positive">
      463ms
    </td>
  </tr>
  
  <tr>
    <td>
      Bitops
    </td>
    
    <td>
      1519ms
    </td>
    
    <td>
      1591ms
    </td>
    
    <td class="positive">
      360ms
    </td>
  </tr>
  
  <tr>
    <td>
      Controlflow
    </td>
    
    <td>
      243ms
    </td>
    
    <td>
      206ms
    </td>
    
    <td class="positive">
      20ms
    </td>
  </tr>
  
  <tr>
    <td>
      Crypto
    </td>
    
    <td>
      1033ms
    </td>
    
    <td>
      1003ms
    </td>
    
    <td class="positive">
      344ms
    </td>
  </tr>
  
  <tr>
    <td>
      Date
    </td>
    
    <td>
      1849ms
    </td>
    
    <td>
      1896ms
    </td>
    
    <td class="positive">
      639ms
    </td>
  </tr>
  
  <tr>
    <td>
      Math
    </td>
    
    <td>
      1684ms
    </td>
    
    <td>
      1419ms
    </td>
    
    <td class="positive">
      602ms
    </td>
  </tr>
  
  <tr>
    <td>
      Regexp
    </td>
    
    <td>
      1779ms
    </td>
    
    <td>
      1673ms
    </td>
    
    <td class="positive">
      155ms
    </td>
  </tr>
  
  <tr>
    <td>
      String
    </td>
    
    <td>
      3920ms
    </td>
    
    <td>
      3722ms
    </td>
    
    <td class="positive">
      1923ms
    </td>
  </tr>
</table>

### Thoughts

The Incredible is just slightly faster than the Evo, to the point where it&#8217;s probably negligible or within a margin of error. Both of these phones run on Android 2.1 with HTC&#8217;s Sense UI modifications, and represent the latest and greatest in Android phones available on the market today. Both run on the same 1GHz Snapdragon processor (QSD8650). The Nexus One is a bit older, and runs with an older version of the Snapdragon processor (QSD8250), however it still runs at 1GHz just like the other two phones.

As you can see the Nexus One blows away all the competition because it&#8217;s running Android 2.2 Froyo. These results were quite a shock to me and are quite impressive. These results even blow away Apple&#8217;s new iOS 4 running on my iPhone 3GS, which clocked in at a total time of 13787ms compared to the Nexus One&#8217;s startling 5452ms.

### Testing methodology

Test: [SunSpider 0.9.1][1]

Devices: HTC Evo (Android 2.1), HTC Incredible (Android 2.1), HTC Nexus One (Android 2.2)

The SunSpider test was run five times on each phone. The phone was completely turned off and on before each test. The most extreme values of the five tests were thrown out, and the resulting four tests were averaged (sometimes from three tests when the values were very close together).

Raw results:

[SunSpider HTC Evo results (5 tests)][2]

[SunSpider HTC Incredible results (5 tests)][3]

[SunSpider HTC Nexus One results (5 tests)][4]

### Related links

[JavaScript SunSpider test: iOS 3.1.3 versus iOS 4 GM][5]

 [1]: http://www2.webkit.org/perf/sunspider-0.9.1/sunspider-0.9.1/driver.html
 [2]: http://davidbcalhoun.com/wp-content/uploads/2010/sunspider-htc-evo.html
 [3]: http://davidbcalhoun.com/wp-content/uploads/2010/sunspider-htc-incredible.html
 [4]: http://davidbcalhoun.com/wp-content/uploads/2010/sunspider-nexus-one.html
 [5]: http://davidbcalhoun.com/2010/sunspider-ios-3-1-3-versus-ios-4-gm