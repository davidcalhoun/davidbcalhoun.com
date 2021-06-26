---
title: Using mobile-specific HTML, CSS, and JavaScript (Mobile web part 5)
date: 2010-06-29
comments: true
author: David
layout: post
permalink: /2010/using-mobile-specific-html-css-javascript
categories: ["webdev", "mobile", "html", "css", "javascript", "programming"]
tags:
  - basejs
  - blackberry.network
  - blackberry.system
  - capture api
  - css
  - gesture events
  - html
  - iui
  - javascript
  - jqtouch
  - media queries
  - mobile
  - mozorientation
  - orientationchange
  - pastrykit
  - touch events
  - webkit
  - xui
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

_(updated June 27, 2011)_

### Mobile-specific HTML

#### Viewport tag

Use the [viewport tag][1] to properly fit the content to the screen:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

#### [Tel scheme][2] (to initiate phone calls)

```html
<a href="tel:18005555555">Call us at 1-800-555-5555</a>
```

#### [Sms scheme][3] (to initiate text messages)

```html
<a href="sms:18005555555">
  <a href="sms:18005555555,18005555556">
    <!-- multiple recipients -->
    <a href="sms:18005555555?body=Text%20goes%20here">
      <!-- predefined message body --></a
    ></a
  ></a
>
```

#### Disable automatic telephone number linking

```html
<meta name="format-detection" content="telephone=no" />
```

#### iOS-specific HTML (some work on Android as well)

You also have access to several [Apple-specific tags to use in your iOS applications (iPhone, iPad, and don't forget the iPod Touch!)][4].

```html
<!-- iOS 1.1.3+: this is the icon that's used when the user adds your app to the home screen -->

<!-- also works on Android! -->
<link rel="apple-touch-icon" href="icon.png" />

<!-- iOS 2.0+: tell iOS not to apply any glare effects to the icon -->
<link rel="apple-touch-icon-precomposed" href="icon.png" />

<!-- iOS 4.2+ icons for different resolutions -->
<link rel="apple-touch-icon" sizes="72x72" href="touch-icon-ipad.png" />
<link rel="apple-touch-icon" sizes="114x114" href="touch-icon-iphone4.png" />

<!-- iOS 3+: full-screen startup splash screen image (must be 320x460) -->
<link rel="apple-touch-startup-image" href="startup.png" />

<!-- enable full-screen mode (only when launched from home screen) -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- controls the appearance of the status bar in full-screen mode -->
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

#### Turn off autocorrect, autocomplete, and autocapitalize

And also some handy attributes to turn off annoying autocorrect features:

```html
<input autocorrect="off" autocomplete="off" autocapitalize="off" />
```

### Mobile-specific CSS

#### position:fixed and overflow:scroll

Mobile browsers are now starting to support these basic CSS properties better. Position:fixed will work on Android 2.2+ and iOS 5+. Overflow:scroll works with one finger on iOS 5+.

Also, iOS 5 has additional CSS to give the native scrollbar and momentum/intertia to elements with overflow:scroll:

```css
div {
  -webkit-overflow-scrolling: touch;
}
```

#### Media queries

[Media queries][5] enable you to target specific features (screen width, orientation, resolution) within CSS itself. Media queries themselves are actually quite old and are not mobile specific (they used to be popular for making a print-friendly version of webpages).

You can use them two ways: 1) inline in a CSS stylesheet or 2) as the "media" attribute in the link tag, which loads an external stylesheet. The following is an example of inline CSS that's applied only when the device is in portrait mode:

```css
@media all and (orientation: portrait) {
  body {
  }
  div {
  }
}
```

Here's the same media query using the other method, which points to an external stylesheet (not recommended):

```html
<link
  rel="stylesheet"
  media="all and (orientation: portrait)"
  href="portrait.css"
/>
```

This is not recommended because it creates an additional HTTP request (bad for performance). Also, in the case of screen orientation, the separate CSS stylesheet is NOT downloaded when the screen is rotated.

Here's a few examples of using inline CSS:

```css
// target small screens (mobile devices or small desktop windows)
@media only screen and (max-width: 480px) {
  /* CSS goes here */
}

/* high resolution screens */
@media (-webkit-min-device-pixel-ratio: 2),
  (min--moz-device-pixel-ratio: 2),
  (min-resolution: 300dpi) {
  header {
    background-image: url(header-highres.png);
  }
}

/* low resolution screens */
@media (-webkit-max-device-pixel-ratio: 1.5),
  (max--moz-device-pixel-ratio: 1.5),
  (max-resolution: 299dpi) {
  header {
    background-image: url(header-lowres.png);
  }
}
```

Read more: [Media queries (Mozilla Developer Center)][6]

#### Miscellaneous CSS

- `-webkit-tap-highlight-color` (iOS): override the semitransparent color overlay when a user clicks a link or clickable element. To completely disable it, set the value to 'transparent' or 'rgba(0,0,0,0)'

- `-webkit-user-select: none;` - prevent the user from selecting text (also works on desktop WebKit)

- `-webkit-touch-callout: none;` - prevent the callout toolbar from appearing when a user touches and holds an element such as an anchor tag.

### Mobile-specific JavaScript

#### `window.scrollTo(0,0);`

This hides the address bar and takes advantage of the entire device screen. You'll have to set this in a timeout and make sure to get the timing right. See [Remy Sharp's post][7] for more details.

#### `window.matchMedia()`

(iOS 5+) Again, just as CSS media queries aren't specific to mobile, they do come in especially useful for mobile, so it's worth mentioning their JavaScript counterpart. window.matchMedia() is a JavaScript-based version of media queries. You can use [respond.js][8] as a polyfill for devices that don't support this functionality natively.

#### `navigator.connection`

(Android 2.2+) Determine if the phone is running on WiFi, 3G, etc. Example:

```javascript
if (navigator.connection.type == navigator.connection.WIFI) {
  // code for WiFi connections (high-bandwidth)
}
```

#### `window.devicePixelRatio`

Determine screen resolution (analogue to the CSS media query). (iPhone 4 has the value 2, while Nexus One has the value 1.5).

#### `window.navigator.onLine`

Not strictly mobile, but helpful for apps to determine if they're being run offline.

#### `window.navigator.standalone`

(iOS 2.1+): determine if it's running in full-screen mode

#### Touch and gesture events

- [touch events (iOS, Android 2.2+)][9]: touchstart, touchmove, touchend, touchcancel

- [gesture events (Apple only, iOS 2+)][10]: gesturestart, gesturechange, gesturend give access to predefined gestures (rotation, scale, position)

#### Screen orientation (every 90 degrees)

- [orientationchange event][11]: triggered every 90 degrees of rotation (portrait and landscape modes). The current orientation is available through window.orientation

#### Device orientation (more fine-grained)

The [deviceorientation event][12] will fire very frequently, and gives more fine-grained information about the device's orientation in three dimensions.  
[MozOrientation][13] (or onmozorientation?) (Fennec/Firefox Mobile, Firefox 3.5+): also not strictly mobile. Gives access to the device's accelerometer (x-y-z orientation data), updated periodically. Works on Android phones running Mobile Firefox. On the desktop this works with laptops such as Thinkpads and MacBooks.

#### devicemotion (shake gestures, etc.)

- [devicemotion][14] fires when the user shakes or moves their device. Devicemotion taps into the accelerometer, which is fires off when the device accelerates. Contrast this with the deviceorientation event, which taps into the device's gyroscope (if it has one), which only measures the 3D angle orientation, even when the device is at rest.

#### Media capture API

While iOS is still lacking basic file inputs, Android is forging ahead, giving developers fine-grained control over content users can upload.

```html
    <!-- regular file upload (Android 2.2+, NO iOS) -->
    <input type="file"></input>

    <!-- opens directly to the camera (Android 3.0+) -->
    <input type="file" accept="image/*;capture=camera"></input>

    <!-- opens directly to the camera in video mode (Android 3.0+) -->
    <input type="file" accept="video/*;capture=camcorder"></input>

    <!-- opens directly to the audio recorder (Android 3.0+) -->
    <input type="file" accept="audio/*;capture=microphone"></input>
```

#### BlackBerry specific

If you're developing for a BlackBerry Widget, you have access to proprietary information through the [blackberry object][15] (which gives access to useful information such as blackberry.network [returns values such as CDMA and Wi-Fi] and blackberry.system).

You also have the option to use [PhoneGap][16], which augments JavaScript and gives you access to more phone features that native apps would have access to.

### Use a mobile-optimized JavaScript library

I've created [a separate entry for the available mobile libraries and frameworks][17].

Because smartphone browsers are standards-based, the aim of a JavaScript library on mobile is less towards API normalization and more towards providing an actual UI framework, usually to emulate the feel of native apps (and to provide easier workarounds to [lack of access to position:fixed][18]). We've seen a few libraries released that emulate the iPhone UI, and in the future we might see libraries emulating the Android UI, as well as entirely new UIs.

There's also a bit to be said about simply loading full desktop JavaScript libraries into mobile clients. In my opinion this doesn't particularly make sense, especially in a world where latency and bandwidth are so much more of a concern. It doesn't make sense to force the user wait longer and download code that's ultimately useless to them (hacks for desktop browsers such as IE 6, etc).

### Take advantage of new stuff!

While not specific to mobile, there's a lot of new stuff in general that you can use. If you limit yourself to the top smartphones (iPhone, Android, and maybe webOS), compared to the desktop you immediately have access to an even wider array of new stuff, especially many Webkit proprietary features, since most of these top smartphones have browsers based on Webkit.

-HTML: new tags ([HTML5][19] (I'm sure you've heard of it by now…))  
-CSS: [2d transforms][20], [3d transforms][21], animation, [border radius][22], [custom fonts with @font-face][23], etc.  
-JavaScript: [strict mode][24], [constants][25], [block scope][26], [Date.now()][27], etc.

### Slides

<iframe src="http://www.slideshare.net/franksvalli/slideshelf" width="615px" height="470px" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:none;" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>

<div style="width:425px" id="__ss_7424222">
    <strong style="display:block;margin:12px 0 4px"><a href="http://www.slideshare.net/franksvalli/mobile-html-css-and-javascript" title="Mobile HTML, CSS, and JavaScript">Mobile HTML, CSS, and JavaScript</a></strong> <div style="padding:5px 0 12px">
    View more <a href="http://www.slideshare.net/">presentations</a> from <a href="http://www.slideshare.net/franksvalli">franksvalli</a>
    </div></p>
</div>

### More from the Mobile Web series:

[Part 1: The viewport metatag][1]  
[Part 2: The mobile developer’s toolkit][28]  
[Part 3: Designing buttons that don’t suck][29]  
[Part 4: On designing a mobile webpage][30]  
[Part 5: Using mobile-specific HTML, CSS, and JavaScript][31]  
[Part 6: Dealing with device orientation][32]  
[Part 7: Mobile JavaScript libraries and frameworks][17]

[1]: http://davidbcalhoun.com/2010/viewport-metatag
[2]: http://www.rfc-editor.org/rfc/rfc3966.txt
[3]: http://www.rfc-editor.org/rfc/rfc5724.txt
[4]: http://developer.apple.com/library/safari/#documentation/appleapplications/reference/safariwebcontent/configuringwebapplications/configuringwebapplications.html
[5]: http://www.w3.org/TR/css3-mediaqueries/
[6]: https://developer.mozilla.org/en/css/media_queries
[7]: http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
[8]: https://github.com/scottjehl/Respond
[9]: http://developer.apple.com/safari/library/documentation/appleapplications/reference/safariwebcontent/handlingevents/handlingevents.html
[10]: http://developer.apple.com/safari/library/documentation/internetweb/conceptual/safarivisualeffectsprogguide/InteractiveVisualEffects/InteractiveVisualEffects.html
[11]: http://ajaxian.com/archives/iphone-windowonorientationchange-code
[12]: http://frontendstuff.com/javascript/examples/deviceorientation.html
[13]: https://developer.mozilla.org/en/Detecting_device_orientation
[14]: http://frontendstuff.com/javascript/examples/devicemotion.html
[15]: http://www.blackberry.com/developers/docs/widgetapi/Summary_system.html
[16]: http://phonegap.com/
[17]: http://davidbcalhoun.com/2010/mobile-javascript-libraries-and-frameworks
[18]: http://doctyper.com/archives/200808/fixed-positioning-on-mobile-safari/
[19]: http://diveintohtml5.org/
[20]: http://webkit.org/blog/130/css-transforms/
[21]: http://webkit.org/blog/386/3d-transforms/
[22]: http://border-radius.com/
[23]: https://developer.mozilla.org/en/css/@font-face
[24]: http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
[25]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Guide/Core_Language_Features#Constants
[26]: http://davidbcalhoun.com/2009/javascript-tidbit-block-scope-with-let
[27]: https://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Objects/Date
[28]: http://davidbcalhoun.com/2010/the-mobile-developers-toolkit-mobile-web-part-2
[29]: http://davidbcalhoun.com/2010/designing-buttons-that-dont-suck
[30]: http://davidbcalhoun.com/2010/on-designing-a-mobile-webpage
[31]: http://davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript
[32]: http://davidbcalhoun.com/2010/dealing-with-device-orientation
