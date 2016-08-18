---
title: 'New Mobile Safari stuff in iOS5: position:fixed, overflow:scroll, new input type support, web workers, ECMAScript 5'
date: 2011-06-07
comments: true
author: David
layout: post
permalink: /2011/new-mobile-safari-stuff-in-ios5-position-fixed-overflow-scroll-new-input-type-support-web-workers-ecmascript-5
categories: ["ios", "mobile safari", "mobile", "webdev"]
---
(note: this is based on the first iOS5 beta [9A5220p] and is subject to change on final release)

It looks like there&#8217;s finally some major improvements in mobile Safari, some of which I&#8217;ve found below on my &#8220;first glance&#8221; after downloading the SDK. Chime in if you find anything yourself!

### Bad news first

Much to my disappointment, browser-based file uploads are still not supported ([input type=&#8221;file&#8221;][1]), even though they have been supported on Android since version 2.2 (which they have [continued to improve and refine][2]). The best use case for this is uploading pictures and videos straight from the browser, but Apple seems more interested in making those functions possible directly from the operating system itself, supporting only big names like Twitter and YouTube. So much for the little guys.

There&#8217;s other stuff on my wishlist that hasn&#8217;t yet been implemented, such as <s>WebGL and</s> indexedDB, along with some HTML5 input types, but regardless it&#8217;s good to see some real progress in iOS 5. (update: it appears that some WebGL features are starting to be supported, although the demos I tried didn&#8217;t seem to work).

Now let&#8217;s move on to the awesome new stuff that IS implemented!

### position:fixed

A point of contention since the original iPhone was released in 2007, position:fixed now works on iOS5! What this means to developers: it&#8217;s now very easy to create top and bottom toolbars for your web apps. (there&#8217;s a long history of hacks and workarounds which will still need to be implemented as a fallback for the time being, but I&#8217;ll save that for another post. I should also mention that position:fixed has worked on Android since version 2.2, and webOS seems to support a somewhat hacky implementation).

Here&#8217;s a [video demo of position:fixed on iOS5][3]:



(check out the [demo][4] for yourself)

### overflow:scroll

This is a similar problem to position:fixed, but now it works on iOS5! For content that doesn&#8217;t fit in its container element, previously the content was completely cut off (similarly with iframes). On the desktop we have the option to show scrollbars instead, allowing the user to scroll to see the content, but iOS made this difficult by requiring two fingers to scroll. Now overflow:scroll works and the user can scroll through the container&#8217;s content with a single finger. Developers can use new CSS to enable native scrolling (with scrollbars and momentum):

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          -webkit-overflow-scrolling: touch;
        </div>
      </td>
    </tr>
  </table>
</div>

(via [Johan Brook][5]).

It&#8217;s assumed that it&#8217;s up to the developer to implement some sort of visual indicator to let the user know they can interact with the element.

One criticism so far: there&#8217;s no inertia scroll on this element, so it doesn&#8217;t quite feel the same as scrolling the page.

Here&#8217;s a quick [video demo of overflow:scroll on iOS 5][6].



(check out the [demo][7] for yourself)

### New Input Types

HTML5 defined many new helpful input types, and mobile operating systems have been slowly implementing them and creating optimized keyboards for the inputs. iOS5 now supports these input types: date, datetime, month, time, range. Click on the images to see their respective demo pages:

[<img src="http://davidbcalhoun.com/wp-content/uploads/2011/06/ios-date-input.png" alt="iOS Date Input" title="iOS Date Input" width="320" height="480" class="size-full wp-image-677" />][8][<img src="http://davidbcalhoun.com/wp-content/uploads/2011/06/ios-datetime-input.png" alt="iOS Datetime Input" title="iOS Datetime Input" width="320" height="480" class="size-full wp-image-678" />][9][<img src="http://davidbcalhoun.com/wp-content/uploads/2011/06/ios-month-input.png" alt="iOS Month Input" title="iOS Month Input" width="320" height="480" class="size-full wp-image-680" />][10][<img src="http://davidbcalhoun.com/wp-content/uploads/2011/06/ios-time-input.png" alt="iOS Time Input" title="iOS Time Input" width="320" height="480" class="size-full wp-image-682" />][11][<img src="http://davidbcalhoun.com/wp-content/uploads/2011/06/ios-range-input.png" alt="iOS Range Input" title="iOS Range Input" width="320" height="480" class="size-full wp-image-681" />][12]

And a fun one &#8211; [my iPhone slider hack based on input type range][13], which now actually works on the iPhone itself (because input type=&#8221;range&#8221; is now supported)!

[<img src="http://davidbcalhoun.com/wp-content/uploads/2011/06/ios-iphone-slider-in-html.png" alt="iOS Slider implemented with Range Input" title="iOS Slider implemented with Range Input" width="320" height="480" class="aligncenter size-full wp-image-679" />][14]

### Web Workers (JavaScript)

JavaScript is single-threaded, and it happens to run on the same thread as the UI, which means computationally expensive operations can lead to an unresponsive UI, and no one likes that. Web Workers help by offloading tasks to another thread and only returning output when it needs to. In other words, it&#8217;s a good thing for us web developers.

According to my own tests, Web Workers seemed to be briefly enabled on early versions of iOS3, but were soon disabled thereafter. Now with iOS5, they&#8217;re back again!

### New ECMAScript 5 stuff (JavaScript)

(based on [kangax&#8217;s ECMAScript 5 compatibility table][15])

<table>
  <tr>
    <td>
      Feature
    </td>
    
    <td>
      iOS 4.3.2
    </td>
    
    <td>
      iOS 5 beta 1
    </td>
  </tr>
  
  <tr>
    <td>
      Object.create
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.defineProperty
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.defineProperties
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.getPrototypeOf
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.keys
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.seal
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.freeze
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.preventExtensions
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.isSealed
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.isFrozen
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.isExtensible
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.getOwnPropertyDescriptor
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Object.getOwnPropertyNames
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Date.prototype.toISOString
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Date.prototype.toISOString
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Date.prototype.toISOString
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Date.now
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      JSON
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Function.prototype.bind
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="negative">
      No
    </td>
  </tr>
  
  <tr>
    <td>
      String.prototype.trim
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.indexOf
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.lastIndexOf
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.every
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.some
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.forEach
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.map
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.filter
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.reduce
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Array.prototype.reduceRight
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Getter in property initializer
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Setter in property initializer
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Property access on strings
    </td>
    
    <td class="positive">
      Yes
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Reserved words as property names
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
  
  <tr>
    <td>
      Strict mode
    </td>
    
    <td class="negative">
      No
    </td>
    
    <td class="positive">
      Yes
    </td>
  </tr>
</table>

### HTML5Test score

iOS 4.3.2 scores 206 (7 bonus points) on the [HTML5 Test][16], whereas iOS 5 beta scores 267 (9 bonus points). Much of these gains seem to be made in the &#8220;Forms&#8221; and &#8220;Parsing rules&#8221; sections, as well as the &#8220;Web Workers&#8221; section.

### Miscellaneous new stuff

*   Inline SVG in text/html
*   float32array, int8array, int16array, int32array in JavaScript
*   window.matchmedia() (JavaScript)
*   <s>onsearch Event (JavaScript)</s> &#8211; it looks like this was just broken in later iOS 4.3 builds, but it&#8217;s back now in iOS 5
*   MathML elements recognized (based on [html5test][16])
*   Improved speed of Canvas rendering ([source][17])
*   UIWebView and home screen web apps now running on Nitro? (expected but not tested)
*   Newly supported CSS gradient syntax (-webkit-linear-gradient versus the older -webkit-gradient syntax)
*   [classList][18] (JavaScript)
*   A major WebKit HTML5 History (popstate) bug is [now fixed][19]
*   [contentEditable][20] now works properly

 [1]: http://frontendstuff.com/html/examples/input-type-file.html
 [2]: http://davidbcalhoun.com/2011/android-3-0-honeycomb-is-first-to-implement-the-device-api
 [3]: http://www.youtube.com/watch?v=JFzv3ETwfms
 [4]: http://frontendstuff.com/css/examples/position-fixed.html
 [5]: http://johanbrook.com/browsers/native-momentum-scrolling-ios-5/
 [6]: http://www.youtube.com/watch?v=KwpZ1F6dW5U
 [7]: http://frontendstuff.com/css/examples/overflow-scroll.html
 [8]: http://frontendstuff.com/html/input-type-date.html
 [9]: http://frontendstuff.com/html/input-type-datetime.html
 [10]: http://frontendstuff.com/html/input-type-month.html
 [11]: http://frontendstuff.com/html/input-type-time.html
 [12]: http://frontendstuff.com/html/input-type-range.html
 [13]: http://davidbcalhoun.com/2011/implementing-iphone-slider-unlock-with-input-type-range
 [14]: http://davidbcalhoun.com/a/iphone-slider.html
 [15]: http://kangax.github.com/es5-compat-table/
 [16]: http://html5test.com/
 [17]: https://twitter.com/#!/KesieV/status/78067470501543936
 [18]: https://developer.mozilla.org/en/DOM/element.classList
 [19]: https://bugs.webkit.org/show_bug.cgi?id=42940
 [20]: http://html5demos.com/contenteditable