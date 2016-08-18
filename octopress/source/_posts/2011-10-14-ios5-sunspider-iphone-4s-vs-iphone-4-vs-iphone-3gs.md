---
title: 'iOS5 SunSpider: iPhone 4S vs iPhone 4 vs iPhone 3GS'
date: 2011-10-14
comments: true
author: David
layout: post
permalink: /2011/ios5-sunspider-iphone-4s-vs-iphone-4-vs-iphone-3gs
categories: ["performance", "javascript", "mobile", "iphone", "webdev"]
---
### Result table (SunSpider 0.9.1, all devices running iOS 5)

<table style="width: 100%;">
  <tr>
    <td>
      Test
    </td>
    
    <td>
      iPhone 4S
    </td>
    
    <td>
      iPhone 4
    </td>
    
    <td>
      iPhone 3GS
    </td>
  </tr>
  
  <tr>
    <td>
      Total
    </td>
    
    <td class="positive">
      2270ms
    </td>
    
    <td>
      3483ms
    </td>
    
    <td>
      4903ms
    </td>
  </tr>
  
  <tr>
    <td>
      3D
    </td>
    
    <td class="positive">
      281ms
    </td>
    
    <td>
      486ms
    </td>
    
    <td>
      672ms
    </td>
  </tr>
  
  <tr>
    <td>
      Access
    </td>
    
    <td class="positive">
      279ms
    </td></td> 
    
    <td>
      410ms
    </td>
    
    <td>
      614ms
    </td>
  </tr>
  
  <tr>
    <td>
      Bitops
    </td>
    
    <td class="positive">
      177ms
    </td>
    
    <td>
      200ms
    </td>
    
    <td>
      270ms
    </td>
  </tr>
  
  <tr>
    <td>
      Controlflow
    </td>
    
    <td class="positive">
      20ms
    </td>
    
    <td>
      26ms
    </td></td> 
    
    <td>
      34ms
    </td>
  </tr>
  
  <tr>
    <td>
      Crypto
    </td>
    
    <td class="positive">
      164ms
    </td>
    
    <td>
      211ms
    </td>
    
    <td>
      315ms
    </td>
  </tr>
  
  <tr>
    <td>
      Date
    </td>
    
    <td class="positive">
      332ms
    </td>
    
    <td>
      528ms
    </td>
    
    <td>
      770ms
    </td>
  </tr>
  
  <tr>
    <td>
      Math
    </td>
    
    <td class="positive">
      219ms
    </td>
    
    <td>
      433ms
    </td>
    
    <td>
      553ms
    </td>
  </tr>
  
  <tr>
    <td>
      Regexp
    </td>
    
    <td class="positive">
      88ms
    </td>
    
    <td>
      117ms
    </td>
    
    <td>
      151ms
    </td>
  </tr>
  
  <tr>
    <td>
      String
    </td>
    
    <td class="positive">
      711ms
    </td>
    
    <td>
      1072ms
    </td>
    
    <td>
      1525ms
    </td>
  </tr>
</table>

### Raw results

[iPhone 4S (iOS5)][1]

[iPhone 4 (iOS5)][2]

[iPhone 3GS (iOS5)][3]

### Bonus: [FishIETank][4] (10 fish) (Canvas test)

<table style="width: 100%;">
  <tr>
    <td>
      Test
    </td>
    
    <td>
      iPhone 4S
    </td>
    
    <td>
      iPhone 4
    </td>
    
    <td>
      iPhone 3GS
    </td>
  </tr>
  
  <tr>
    <td>
      Total
    </td>
    
    <td class="positive">
      50fps
    </td>
    
    <td>
      35fps
    </td>
    
    <td>
      25fps
    </td>
  </tr>
</table>

One thing to note here: the 3GS has a bit of an advantage because of a non-retina screen. However, it&#8217;s still outperformed easily by the iPhone 4 and 4S.

### Related

[JavaScript SunSpider benchmark: iOS 4.3 vs iOS 4.0][5]  
[BlackBerry Torch SunSpider results (JavaScript benchmark)][6]  
[iPhone 4 SunSpider test results (22% faster than iPhone 3GS)][7]  
[JavaScript SunSpider test: iOS 3.1.3 versus iOS 4 GM][8]  
[JavaScript SunSpider: HTC Evo versus HTC Incredible versus Nexus One][9]

 [1]: http://www.webkit.org/perf/sunspider-0.9.1/sunspider-0.9.1/results.html?%7B%22v%22:%20%22sunspider-0.9.1%22,%20%223d-cube%22:%5B98,100,97,101,98,98,99,99,100,105%5D,%223d-morph%22:%5B72,75,72,74,72,74,72,72,72,73%5D,%223d-raytrace%22:%5B107,107,108,111,108,108,108,109,110,108%5D,%22access-binary-trees%22:%5B48,48,53,51,47,49,51,54,52,47%5D,%22access-fannkuch%22:%5B121,120,124,120,121,121,120,120,125,120%5D,%22access-nbody%22:%5B70,72,71,71,71,72,70,70,69,70%5D,%22access-nsieve%22:%5B35,40,38,38,37,35,35,36,38,37%5D,%22bitops-3bit-bits-in-byte%22:%5B29,29,29,28,29,29,29,29,29,29%5D,%22bitops-bits-in-byte%22:%5B39,36,37,39,37,36,36,37,38,37%5D,%22bitops-bitwise-and%22:%5B47,48,48,46,49,48,49,51,48,47%5D,%22bitops-nsieve-bits%22:%5B65,63,62,62,62,62,63,63,63,62%5D,%22controlflow-recursive%22:%5B19,20,20,20,19,20,20,19,20,20%5D,%22crypto-aes%22:%5B94,96,96,100,103,102,96,96,96,99%5D,%22crypto-md5%22:%5B36,37,37,38,37,36,39,36,38,39%5D,%22crypto-sha1%22:%5B29,28,30,28,30,29,29,28,29,29%5D,%22date-format-tofte%22:%5B171,182,167,168,170,172,167,170,181,172%5D,%22date-format-xparb%22:%5B160,159,161,158,160,168,162,156,159,158%5D,%22math-cordic%22:%5B81,79,76,77,77,77,78,77,76,77%5D,%22math-partial-sums%22:%5B92,92,92,92,94,92,92,91,92,94%5D,%22math-spectral-norm%22:%5B49,49,49,49,51,49,49,50,48,52%5D,%22regexp-dna%22:%5B91,87,88,87,88,88,88,87,88,87%5D,%22string-base64%22:%5B89,88,86,92,87,91,96,87,87,87%5D,%22string-fasta%22:%5B91,92,92,91,94,94,95,95,89,89%5D,%22string-tagcloud%22:%5B144,147,147,145,144,145,144,144,148,150%5D,%22string-unpack-code%22:%5B246,243,238,244,254,249,243,249,240,238%5D,%22string-validate-input%22:%5B145,134,136,137,140,137,137,137,141,149%5D%7D
 [2]: http://www.webkit.org/perf/sunspider-0.9.1/sunspider-0.9.1/results.html?%7B%22v%22:%20%22sunspider-0.9.1%22,%20%223d-cube%22:%5B175,179,192,175,180,174,181,174,173,182%5D,%223d-morph%22:%5B138,137,136,135,136,135,136,137,144,135%5D,%223d-raytrace%22:%5B166,171,174,174,166,178,168,167,169,168%5D,%22access-binary-trees%22:%5B61,61,62,58,57,56,57,56,60,57%5D,%22access-fannkuch%22:%5B141,142,143,146,141,142,148,142,146,148%5D,%22access-nbody%22:%5B154,152,147,146,144,148,146,154,146,149%5D,%22access-nsieve%22:%5B59,59,57,67,58,60,57,58,59,59%5D,%22bitops-3bit-bits-in-byte%22:%5B29,29,29,28,34,29,28,28,29,28%5D,%22bitops-bits-in-byte%22:%5B40,40,41,40,41,40,42,41,41,41%5D,%22bitops-bitwise-and%22:%5B58,59,60,58,60,58,59,62,58,58%5D,%22bitops-nsieve-bits%22:%5B71,76,70,75,71,69,72,71,70,70%5D,%22controlflow-recursive%22:%5B26,25,25,26,25,26,25,25,26,27%5D,%22crypto-aes%22:%5B124,132,124,124,126,123,123,125,122,127%5D,%22crypto-md5%22:%5B48,48,48,50,50,50,50,50,50,50%5D,%22crypto-sha1%22:%5B36,37,36,35,36,37,36,37,36,36%5D,%22date-format-tofte%22:%5B265,267,265,314,259,260,257,266,263,260%5D,%22date-format-xparb%22:%5B258,265,258,259,265,259,259,264,259,260%5D,%22math-cordic%22:%5B291,141,141,141,147,140,140,141,178,140%5D,%22math-partial-sums%22:%5B174,173,179,180,171,174,171,179,177,171%5D,%22math-spectral-norm%22:%5B102,98,97,98,97,97,99,100,99,98%5D,%22regexp-dna%22:%5B115,114,114,116,115,119,122,112,120,122%5D,%22string-base64%22:%5B120,123,116,121,114,118,116,115,117,117%5D,%22string-fasta%22:%5B128,125,122,129,122,130,129,131,123,128%5D,%22string-tagcloud%22:%5B208,209,209,206,215,210,210,209,211,219%5D,%22string-unpack-code%22:%5B401,412,410,413,406,422,412,413,410,414%5D,%22string-validate-input%22:%5B205,208,199,200,205,207,206,212,206,211%5D%7D
 [3]: http://www.webkit.org/perf/sunspider-0.9.1/sunspider-0.9.1/results.html?%7B%22v%22:%20%22sunspider-0.9.1%22,%20%223d-cube%22:%5B245,251,245,317,247,244,250,249,250,250%5D,%223d-morph%22:%5B191,184,186,189,186,190,202,190,194,188%5D,%223d-raytrace%22:%5B222,226,223,222,229,227,234,229,227,231%5D,%22access-binary-trees%22:%5B86,87,87,93,89,89,92,92,94,85%5D,%22access-fannkuch%22:%5B189,188,190,189,350,187,188,189,188,190%5D,%22access-nbody%22:%5B195,194,193,204,585,196,198,199,194,194%5D,%22access-nsieve%22:%5B83,94,86,82,84,83,83,83,82,84%5D,%22bitops-3bit-bits-in-byte%22:%5B38,40,37,38,38,43,40,38,38,40%5D,%22bitops-bits-in-byte%22:%5B70,54,53,58,62,55,59,55,54,54%5D,%22bitops-bitwise-and%22:%5B78,78,79,79,82,79,77,76,77,79%5D,%22bitops-nsieve-bits%22:%5B93,94,94,95,93,94,93,93,101,99%5D,%22controlflow-recursive%22:%5B34,34,32,34,33,34,33,33,36,35%5D,%22crypto-aes%22:%5B365,173,173,174,174,184,177,172,170,171%5D,%22crypto-md5%22:%5B101,65,64,68,67,69,65,66,65,67%5D,%22crypto-sha1%22:%5B75,49,48,50,51,48,49,54,49,49%5D,%22date-format-tofte%22:%5B618,358,357,361,373,365,367,482,379,372%5D,%22date-format-xparb%22:%5B408,360,349,354,371,365,371,369,359,363%5D,%22math-cordic%22:%5B199,191,192,188,188,188,190,188,190,191%5D,%22math-partial-sums%22:%5B228,227,228,225,229,232,227,232,229,227%5D,%22math-spectral-norm%22:%5B160,132,131,131,130,131,131,130,133,130%5D,%22regexp-dna%22:%5B158,149,148,151,150,149,152,148,153,148%5D,%22string-base64%22:%5B164,163,176,167,171,172,175,172,181,174%5D,%22string-fasta%22:%5B227,187,176,179,167,175,176,189,176,172%5D,%22string-tagcloud%22:%5B303,288,270,277,284,289,282,284,281,284%5D,%22string-unpack-code%22:%5B1029,531,527,523,543,545,553,545,538,541%5D,%22string-validate-input%22:%5B296,300,297,299,299,293,298,320,296,296%5D%7D
 [4]: http://ie.microsoft.com/testdrive/Performance/FishIETank/
 [5]: http://davidbcalhoun.com/2011/javascript-sunspider-benchmark-ios-4-3-vs-ios-4-0
 [6]: http://davidbcalhoun.com/2010/blackberry-torch-sunspider-results-javascript-benchmark
 [7]: http://davidbcalhoun.com/2010/iphone-4-sunspider-test-results
 [8]: http://davidbcalhoun.com/2010/sunspider-ios-3-1-3-versus-ios-4-gm
 [9]: http://davidbcalhoun.com/2010/javascript-sunspider-htc-evo-versus-htc-incredible-versus-nexus-one