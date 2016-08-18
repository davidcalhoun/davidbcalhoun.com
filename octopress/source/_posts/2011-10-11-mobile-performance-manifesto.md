---
title: Mobile Performance Manifesto
date: 2011-10-11
comments: true
author: David
layout: post
permalink: /2011/mobile-performance-manifesto
categories: ["webdev", "mobile", "performance"]
---
<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/odometer.jpg" alt="" title="Dashboard with odometer" width="800" height="299" class="aligncenter size-full wp-image-806" />

Earlier this year I gave a [talk][1] ([slides][2]) outlining the latest and greatest in mobile performance, including a bit of my own unscientific research into carrier latency and bandwidth thanks to [boomerang.js][3].

I realized that interest in mobile performance has exploded recently, especially with [Steve Souders announcing his focus on mobile][4], and I thought it was time for an update, this time in blog form. Also, my old [slides][2] have been somewhat embarrassing. For some strange reason, at the time I wanted to give [S5][5] a try &#8211; that outdated, ancient, not-performant slideshow framework. The result is a slideshow on performance that loads slowly&#8230; doh! (incidentally, I recommend [deck.js][6] as an alternative).

In any case, it was time for a roundup of mobile performance best practices, in blog form. I&#8217;m not sure if it&#8217;s properly called a manifesto, but it is what it is! Onward!

### For fun: Latency and bandwidth tests

Before we start.. just a little fun data! It&#8217;s always been a pleasure to fiddle around with [boomerang.js][3] and compare results. With my latest trip to Japan, I had the opportunity to run Boomerang on Japan&#8217;s [e-mobile][7] 3G network in the remotest of places, up in Hakuba/Nagano in the Japanese alps.

When I got back, I ran the same tests from downtown San Francisco, which was closer to my California-based test server, and should&#8217;ve been faster, right? Theoretically&#8230;

#### Boomerang Tests (running on a California-hosted server)

<table style="width: 100%;">
  <th>
    <td>
      Verizon 3G (SF)
    </td>
    
    <td>
      ATT 3G (SF)
    </td>
    
    <td>
      e-mobile 3G (Hakuba)
    </td>
  </th>
  
  <tr>
    <td>
      Latency
    </td>
    
    <td class="positive">
      251ms
    </td>
    
    <td>
      901ms
    </td>
    
    <td>
      401ms
    </td>
  </tr>
  
  <tr>
    <td>
      Bandwidth
    </td>
    
    <td>
      62kbps
    </td>
    
    <td>
      3kbps
    </td>
    
    <td class="positive">
      95kbps
    </td>
  </tr>
</table>

Yes, e-mobile didn&#8217;t have the greatest ping, but it handily beat ATT, even though it was going across the entire Pacific Ocean! Note that it came out the best in the bandwidth tests however&#8230; 

(Note: it&#8217;s unknown if or how [Steve Souders&#8217;s latest research][8] affects these findings)

There&#8217;s a lot of factors that could&#8217;ve been involved, so look to something like [OpenSignalMaps][9] for more data.

Ok, onto the tips!

### Page Organization

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/mobile-site-organization.png" alt="" title="Smart phone versus feature phone website organization" width="645" height="633" class="aligncenter size-full wp-image-793" />

For feature phones that have little to no caching, aggressively combine requests (deliver HTML/CSS/JS all in one package). For smart phones, take advantage of caching by mirroring desktop frontend best practices: separate HTML, CSS, and JS so they can be cached (per-session and across sessions).

There&#8217;s old research about [extremely small cache sizes on iOS in particular][10], but this research has been followed up on by more recent research by [Ryan Grove (Yahoo!)][11] and [Steve Souders (Google)][12], which shows that we shouldn&#8217;t be so paranoid, since caching is pretty decent across all the major mobile browsers.

Of particular interest is a browser&#8217;s capability to cache files in a current session, browsing from page-to-page, which is what most users will end up doing (caching of the page across sessions is another matter). What is the maximum file size a browser will cache during a session? The [results (via Browserscope)][13] end up being encouraging:

<table style="width: 100%;">
  <th>
    <td>
      Maximum Cache Size (MB)
    </td>
  </th>
  
  <tr>
    <td>
      Android 2.1
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      Android 2.2
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      Android 2.3
    </td>
    
    <td>
      2
    </td>
  </tr>
  
  <tr>
    <td>
      Android 3.0
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      Blackberry 6.0.0
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      iPad 4.3.5
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      iPad 5.0
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      iPhone 4.3.5
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      iPhone 5.0
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      Opera Mini 4
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      Opera Mini 5
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      Opera Mini 6
    </td>
    
    <td>
      4+
    </td>
  </tr>
  
  <tr>
    <td>
      webOS 2.0
    </td>
    
    <td>
      1
    </td>
  </tr>
</table>

### Avoid redirects (foo.com -> m.foo.com)

If possible, perform the redirection behind the scenes on the server, which should be transparent to the user. When a user performs a Google search and clicks on your page, they&#8217;re already getting redirected once by Google (check it yourself). Your own redirects are adding a second redirect where there need not be one.

### Optimize Images

[<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/responsive-images.jpg" alt="" title="Responsive images" width="600" height="423" class="aligncenter size-full wp-image-796" />][14]  
Deliver appropriately-sized images to devices. The philosophy of responsive design makes it easy to simply downscale images to fit the screen, but avoid this where possible, as this means wasted bandwidth.

You can optimize images through CSS media queries or in JavaScript (see below). Though you want to reduce your dependence on cookies, it may be a good idea to store these width/height values into a cookie (or localStorage if you are fetching images in nontraditional ways) so the values can be read by the server, which can deliver appropriately-sized images. This technique has been [implemented by Filament Group][15], so you should probably read about their experiences before trying to roll your own.

Also note that where applicable, at the expense of performance you may want to serve higher resolution images for better screens, such as for Retina displays (which can be detected with JavaScript or CSS).

#### JavaScript examples

    window.innerHeight;       // max height actually available
    window.innerWidth;        // max width actually available
    window.devicePixelRatio;  // pixel density (standard is 1, high resolution is generally > 1)
{:lang="javascript"}

(note that ``screen.width`` and ``screen.height`` are also available to tell you the dimensions of the entire screen, but this isn&#8217;t all available due to the space taken by the OS and browser chrome)

#### Media query examples

    @media only screen and (max-width: 480px) {
      /* small screen styles */
    }

    @media only screen and (min-width: 481px) {
      /* large screen styles */
    }

    @media (-webkit-min-device-pixel-ratio: 1.5),
           (-o-min-device-pixel-ratio: 3/2),
           (min--moz-device-pixel-ratio: 1.5),
           (min-device-pixel-ratio: 1.5) {
      /* high resolution styles */
    }
{:lang="css"}

### navigator.connection (Android only)

Use [navigator.connection][16] if it&#8217;s available to serve different assets based on connection speed (3G vs WIFI, for instance).

Here&#8217;s the contents of the ``navigator.connection`` object (with a phone running on a 3G connection):

    {
      type: 4,
      UNKNOWN: 0,
      ETHERNET: 1,
      WIFI: 2,
      CELL_2G: 3,
      CELL_3G: 4
    }
{:lang="javascript"}

And an example of how you could write code for each type:

    (function(){  // sandbox our code
      if(!navigator.connection) navigator.connection = {type:0, UNKNOWN: 0};  // polyfill
      var connection = navigator.connection;
      
      if(connection.type === connection.WIFI || connection.type === connection.ETHERNET) {
        // high bandwidth
      } else {
        // normal bandwidth
      }
    })();
{:lang="javascript"}

Here&#8217;s how we might be able to use [Modernizr][17] to help us out:

    (function(){  // sandbox our code
      if(!navigator.connection) navigator.connection = {type:0, UNKNOWN: 0};  // polyfill
      var connection = navigator.connection;
      
      // add a custom test to Modernizr
      Modernizr.addTest('highbandwidth', function(){
        return connection.type === connection.WIFI || connection.type === connection.ETHERNET;
      });

    })();
{:lang="javascript"}

We can now target special high-bandwidth assets with CSS:

    .highbandwidth .logo {background-image:url('logo-high.jpg');}
    .no-highbandwidth .logo {background-image:url('logo.jpg');}
{:lang="css"}

### base64 encode small UI images

You can base64 encode binary image data in HTML and CSS:

#### HTML

    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO
    9TXL0Y4OHwAAAABJRU5ErkJggg==" alt="Red dot">
{:lang="html"}

#### CSS

    .dot {
      background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA  
    AAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO  
    9TXL0Y4OHwAAAABJRU5ErkJggg==');
    }
{:lang="css"}

There seems to be the mistaken belief floating around that base64 images aren&#8217;t cacheable. However, because you can embed them in your CSS, base64 encoded images will be cached along with the rest of your CSS.

You&#8217;ll probably just want to limit this to small UI icons however. I wrote a [quick post on the drawbacks, and also a comparison with sprites][18].

If you&#8217;re using Compass/SASS, base64 encoding images is pretty trivial and easy to maintain with the [inline-image helper][19].

### Unicode and Emoji

&#9734; (HTML entity: #9734)  
<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/emoji3.png" alt="" title="Emoji" width="18" height="18" /> (HTML entity: ``#x1f468``)

Before even considering base64 images, take advantage of icons that are already made for you: unicode characters and [emoji][20] (where supported). Keep in mind that these will look different across browsers, so this might not be an option for everyone.

Because of inconsistent implementations of Emoji character codes between Asian carriers, representatives from Apple and Google made a [proposal to add Emoji to the Unicode standard][21]. Unfortunately it seems that only iPhone supports them for now. Here&#8217;s a [handy chart of all the Unicode emoji characters available][22].

### Take advantage of CSS3

CSS3 offers many replacements for things we needed images for previously. RGBA values replace the need for a semitransparent image for overlays and such. Likewise, border-radius, box shadow, linear-gradients, radial-gradients all reduce the need for images.

However, do be aware that though phones support these new features, it doesn&#8217;t mean they&#8217;re necessarily ready for primetime. Something I&#8217;ve encountered recently to remind me of this fact is [severe color banding issues when using a CSS radial gradient][23]. The solution was to fake the radial gradient using two linear gradients, or to (unfortunately) use an old-fashioned image.

### Avoid using cookies

Cookies get thrown into *every* request on a per-domain basis, so limit your usage of them. Use localStorage/sessionStorage instead, where possible.

### App cache

Take advantage of the HTML5 app cache, though it&#8217;s an unwieldy beast to tame. This will mean you will need to make your site work offline, which might be tricky.

Assets that are traditionally cached get rechecked on page refresh (the server sends back a 304 response if your cache is still up-to-date). Whereas with the app cache, only one file (your manifest) is rechecked on page load.

### Deferred JavaScript execution

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/gmail-deferred-javascript-execution.png" alt="" title="Gmail deferred JavaScript execution" width="497" height="450" class="aligncenter size-full wp-image-810" />

We know that deferring downloading of scripts is advantageous (by placing scripts at the bottom of a page or by using the ``async`` attribute), but deferred execution of JavaScript is even more important. Sure, we can use the ``defer`` attribute, but that&#8217;s only really relevant for when the page is loading (``defer`` lets the browser know that the UI doesn&#8217;t depend on the JavaScript, so it can be safely deferred).

But what about JavaScript that runs after the page loads, such as XHR and JSONP requests? What does this mean for the user? It means that the UI freezes up unexpectedly when JavaScript is being downloaded and executed in the background. But this doesn&#8217;t mean that you want to completely avoid background downloading of JavaScript. The Gmail mobile team came up with a [clever solution][24]: by commenting all of their code and dynamically eval&#8217;ing it when needed, they split up the JavaScript downloading from its execution.

### Perceived performance

Do whatever you have to do to let the user know that the UI is still responding. This sometimes means faking that something is happening. Communication is key! If they clicked on a button, give some indication that they clicked on it. If they clicked on something that requires a request to the network, show a spinner right away, even if it means you haven&#8217;t even sent out a request. The user doesn&#8217;t need to know the nitty-gritty details &#8211; they just want to know that their intent was communicated.

### Onclick delay



On several major mobile operating systems there&#8217;s a several hundred millisecond delay on the onclick event. This is because of the double-tap-to-zoom functionality. When a user first taps on the screen, there&#8217;s a hard-coded delay that waits for the second tap. If there&#8217;s no second tap, the onclick event is then fired. Unfortunately the only way to get around the delay is to tap into touch events instead, which is a bit more complicated than it appears on first glance.

For an overview of some of the challenges of implementing the workaround, see [this article by Google&#8217;s Ryan Fioravanti][25].

### Take advantage of hardware acceleration

Use hardware-accelerated CSS transforms where possible (translate3d, translateZ, rotate3d, and scale3d). An element that is hardware accelerated is turned into a graphic, which is perfect for the GPU to manipulate, taking away the burden from the CPU.

However, the GPU isn&#8217;t all-powerful, so don&#8217;t try to apply hardware accelerations to everything. Also, these elements still need to be refreshed periodically, and it turns out that you can make some good optimizations here. First, you&#8217;ll want to debug the composited layers on your desktop browser:

#### Debugging hardware acceleration

[<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/debug-composited-layers-hardware-acceleration.png" alt="" title="WebKit&#039;s poster circle demo with and without the debug information" width="767" height="399" class="aligncenter size-full wp-image-803" />][26]  
*Chrome*

1.  Type the following in the address bar: about:flags
2.  &#8220;Composited render layer borders&#8221; -> Enable

*Safari*

1.  Open a terminal
2.  $ defaults write com.apple.Safari IncludeInternalDebugMenu 1
3.  $ defaults write com.apple.Safari CA\_COLOR\_OPAQUE 1
4.  Open (or restart) Safari
5.  Debug -> Show Compositing Borders

(to turn these off, run the same commands with a boolean FALSE: i.e. ``defaults write com.apple.Safari CA_COLOR_OPAQUE FALSE``)

Keep in mind that each composited layer has a limited width and height. For instance, if you&#8217;re creating an image carousel, chances are the dimensions of the element will be too big to fit the layer into memory as one piece. This means that when the element is animated, the GPU has to break up the layer manually into several manageable chunks. It&#8217;s much better to chunk it yourself. To do this, you trigger hardware acceleration on each chunk.

So you will change this:

    .carousel {
      -webkit-transform: translate3d(0,0,0);  /* or translateZ(0); */
    }
{:lang="css"}

To this:

    .carousel {
      -webkit-transform: translate3d(0,0,0);  /* or translateZ(0); */
    }

    .carousel-pane {
      -webkit-transform: translate3d(0,0,0);  /* or translateZ(0); */
    }
{:lang="css"}

Where carousel-pane represents each child element of the carousel.

More info: [(slides) WebKit in Your Living Room (Matt Seeley, Netflix)][27]

Also see [HTML5 Techniques for Optimizing Mobile Performance][28].

### HTTP Pipelining

[<img src="http://davidbcalhoun.com/wp-content/uploads/2011/10/pipelining.png" alt="HTTP Pipelining diagram" title="HTTP Pipelining (via Blaze.io)" width="640" height="445" class="aligncenter size-full wp-image-783" />][29]

Take advantage of [HTTP Pipelining][29], which is often overlooked, but has broad support on mobile. This virtually eliminates round trip times, for all but the first request.

Opera and Android support pipelining, and the newly released iOS 5 has added support for it.

Great! So how do you make sure your server is taking advantage of pipelining?

> The first request to every server is sent by itself (only one request on the connection), and the browser looks for two properties in the response:
> 
> 1.  Use of HTTP/1.1
> 2.  An explicit “Connection: Keep-Alive” header (required by Android)
> 
> [-Blaze.io][29] 

If these criteria are met, subsequent requests will be pipelined. Sweet!

### DNS Prefetching

Take advantage of [DNS Prefetching][30]. This theoretically speeds up load times, but there have been [some issues][31], so be sure to test it.

To turn off DNS Prefetching, serve this meta tag:

    <meta http-equiv="x-dns-prefetch-control" content="off">
{:lang="html"}

You can also explicitly force a DNS lookup:

    <link rel="dns-prefetch" href="http://www.example.com/">
{:lang="html"}

### Avoid library code bloat

If you&#8217;re developing for smart phones, you may be able to dramatically reduce the data over the wire by simply using new JavaScript APIs instead of a full-blown library or framework such as jQuery Mobile (which is rather a UI framework and depends on the desktop version of jQuery).

Among the things offered by newer browsers, which should reduce your dependence on a library:

*   [querySelector][32]/[querySelectorAll][33]: CSS selectors that replace the need for a selector engine
*   [getElementsByClassName][34]
*   [classList][35] &#8211; replaces the need for hasClass, addClass, removeClass helpers (available on iOS5, but not sure what else)
*   [XMLHttpRequest][36] &#8211; it&#8217;s probably time to learn how to do this natively instead of using a wrapper that takes care of IE&#8217;s old implementation that requests an ActiveX object. [Cross-Origin Resource Sharing][37] also means we can easily share resources across domains.
*   [HTML5 history (pushState, etc)][38] &#8211; though an [older bug][39] means you should maybe hold off for now (note: the fix is present in iOS 5, which is based on a newer WebKit)
*   [HTML5 Form Validation][40] reduces our need for JavaScript-based validation
*   HTML5 input types that reduce our need for custom UI controls (date, time, slider [range], etc)

You&#8217;ll want to consider using either a library that was optimized for the browsers you&#8217;re targeting (such as [Zepto.js][41]) or simply bring in [a microlibrary for specific tasks you want to perform][42].

### Clientside databases

Most mobile browsers currently support WebSQL, which is being phased out in support of indexedDB, which is not widely implemented. However, if you use a wrapper such as [Lawnchair][43], the transition from one to the other is relatively painless.

### TODO: testing

### More

(to be expanded on later)

*   use standard desktop best practices (for smart phones)
*   requestAnimationFrame instead of setTimeout
*   setImmediate (where available) instead of setTimeout(fn(){},0)
*   Ajax parsing times: you might want to use Multipart XHR so you can yield the process as it&#8217;s going through big responses (to prevent the UI locking up)
*   avoid rgba, box shadows, text shadow, etc, as this greatly degrades performance (especially on animations)
*   high resolution screens may suffer from animation/transition slowness &#8211; it&#8217;s been shown that manipulating the viewport tag to scale the page [will speed up canvas rendering][44], and [high-dpi scaling concerns are also evident in CSS transforms][45]
*   [WebKit animations are faster than animations done via JavaScript][46]
*   if you do use JavaScript-based animations, limit the UI updates to ~17ms, which is equivalent to 60fps, which is the fastest your display will refresh anyway, so it&#8217;s pointless to try to do anything faster than that. Keep track of the time since the last UI update and don&#8217;t do anything if 17ms haven&#8217;t passed.

### On the horizon&#8230;

*   [SPDY][47]: already implemented in Amazon&#8217;s Silk browser for Kindle. Will possibly be on Android phones [when the browser is powered by Chrome][48]
*   indexedDB replacing WebSQL

### Tools

[Mobile Perf bookmarklet][49]  
[pcapperf (Packet Capture Web Performance Analyzer)][50]  
[Blaze Mobitest][51] &#8211; tests the loading time of your site on actual phones

### More Resources

[Mobile Web Application Best Practices][52]  
[Mobile Performance (Steve Souders)][53]  
[Strangeloop Web Performance Hub / Mobile][54]

(odometer image via [henrybloomfield on Flickr][55])

 [1]: http://www.meetup.com/SF-Web-Performance-Group/events/16116764
 [2]: http://davidbcalhoun.com/present/mobile-performance/
 [3]: https://github.com/yahoo/boomerang
 [4]: http://www.stevesouders.com/blog/2011/01/10/announcing-my-focus-on-mobile/
 [5]: http://meyerweb.com/eric/tools/s5/
 [6]: http://imakewebthings.github.com/deck.js/
 [7]: http://en.wikipedia.org/wiki/EMOBILE_Limited
 [8]: http://stevesouders.com/ms/
 [9]: http://opensignalmaps.com/
 [10]: http://www.yuiblog.com/blog/2008/02/06/iphone-cacheability/
 [11]: http://www.yuiblog.com/blog/2010/07/12/mobile-browser-cache-limits-revisited/
 [12]: http://www.stevesouders.com/blog/2010/07/12/mobile-cache-file-sizes/
 [13]: http://www.browserscope.org/user/tests/table/agt1YS1wcm9maWxlcnINCxIEVGVzdBj_1OsBDA?v=3&#038;layout=simple&#038;f=Max%20js%20Cache%20Size%20(kB)
 [14]: http://filamentgroup.com/examples/responsive-images-new/demos/A-Default/demo.html
 [15]: http://filamentgroup.com/lab/responsive_images_experimenting_with_context_aware_image_sizing/
 [16]: http://davidbcalhoun.com/2010/using-navigator-connection-android
 [17]: http://modernizr.com/
 [18]: http://davidbcalhoun.com/2011/when-to-base64-encode-images-and-when-not-to
 [19]: http://compass-style.org/reference/compass/helpers/inline-data/
 [20]: http://pukupi.com/post/1964
 [21]: http://en.wikipedia.org/wiki/Emoji#Emoji_in_the_Unicode_standard
 [22]: http://www.unicode.org/charts/PDF/U1F300.pdf
 [23]: http://code.google.com/p/android/issues/detail?id=767
 [24]: http://googlecode.blogspot.com/2009/09/gmail-for-mobile-html5-series-reducing.html
 [25]: http://code.google.com/mobile/articles/fast_buttons.html
 [26]: http://www.webkit.org/blog-files/3d-transforms/poster-circle.html
 [27]: http://dl.dropbox.com/u/5618867/mseeley-2011-09-27-html5devconf.pdf
 [28]: http://www.html5rocks.com/en/mobile/optimization-and-performance.html
 [29]: http://www.blaze.io/mobile/http-pipelining-big-in-mobile/
 [30]: https://developer.mozilla.org/En/Controlling_DNS_prefetching
 [31]: http://www.mydigitallife.info/turn-off-dns-prefetching-in-google-chrome-to-fix-resolving-host-and-cannot-load-page-error/
 [32]: https://developer.mozilla.org/En/DOM/Document.querySelector
 [33]: https://developer.mozilla.org/en/DOM/document.querySelectorAll
 [34]: https://developer.mozilla.org/en/DOM/document.getElementsByClassName
 [35]: https://developer.mozilla.org/en/DOM/element.classList
 [36]: https://developer.mozilla.org/En/XMLHttpRequest/Using_XMLHttpRequest
 [37]: http://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
 [38]: https://developer.mozilla.org/en/DOM/Manipulating_the_browser_history
 [39]: https://bugs.webkit.org/show_bug.cgi?id=42940
 [40]: http://www.the-art-of-web.com/html/html5-form-validation/
 [41]: http://zeptojs.com/
 [42]: http://microjs.com/
 [43]: http://westcoastlogic.com/lawnchair/
 [44]: http://29a.ch/2011/5/27/fast-html5-canvas-on-iphone-mobile-safari-performance
 [45]: http://paulbakaus.com/2011/10/10/scroller-vs-scrollability-deathmatch/
 [46]: http://joehewitt.com/2011/10/05/fast-animation-with-ios-webkit
 [47]: http://www.chromium.org/spdy
 [48]: http://androidandme.com/2011/10/news/google-chrome-is-finally-coming-to-an-android-device-near-you/
 [49]: http://stevesouders.com/mobileperf/mobileperfbkm.php
 [50]: http://calendar.perfplanet.com/2010/mobile-performance-analysis-using-pcapperf/
 [51]: http://www.blaze.io/mobile/
 [52]: http://www.w3.org/TR/mwabp/
 [53]: http://stevesouders.com/mobileperf/
 [54]: http://www.strangeloopnetworks.com/web-performance-optimization-hub/topics/mobile/
 [55]: http://www.flickr.com/photos/henrybloomfield/4442900025/