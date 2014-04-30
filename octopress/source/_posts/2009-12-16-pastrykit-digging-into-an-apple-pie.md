---
title: 'PastryKit: digging into an Apple Pie'
date: 2009-12-16
comments: true
author: David
layout: post
permalink: /2009/pastrykit-digging-into-an-apple-pie
categories:
  - mobile
tags:
  - iphone
  - iui
  - jqtouch
  - pastrykit
---
Yesterday [John Gruber wrote about Apple&#8217;s PastryKit][1], iPhone&#8217;s JavaScript framework that&#8217;s been discovered &#8220;in the wild&#8221; on the iPhone user guide at <http://help.apple.com/iphone/3/mobile/>. There&#8217;s a few ways to access the page:

*   with an actual iPhone or iTouch
*   by browsing with an iPhone/iTouch user agent. If you&#8217;re using Safari, enable the Developer menu in Safari>Preferences>Advanced and switching user agents by clicking on Develope>User Agent

### What&#8217;s all the big fuss?

John was particularly interested in the responsiveness and native-like interaction of flinging through long lists, the fact the address bar is completely hidden, and the possibility of having a toolbar fixed to the top of the page. PastryKit makes all of these things possible and implements them better than anything else. And the result is nearly indistinguishable from a native app. Here&#8217;s a video I made of the iPhone user guide in action, powered by PastryKit. This is running on Safari &#8211; it&#8217;s not a native app!

<div style="align: center; margin: 1em auto; width: 640px;">
</div>

### PastryKit has been here for a while

As John Gruber points out, the code for PastryKit has been there for quite a while now. [Stack Overflow has a question about it][2] that was asked way back in July, and there are several more [recent references][3] to it by jQTouch developer David Kaneda on Twitter. Of course, since John&#8217;s post there&#8217;s been an explosion of interest in the form of even more tweets!

Hopefully with all of this increased attention, we&#8217;ll see Apple take notice and address it. Here&#8217;s hoping, anyway.

### Some interesting features

There&#8217;s even more interesting takeaways from the PastryKit code, and I&#8217;m sure I&#8217;ve just barely scratched the surface:

*   implements its own form of Object-Oriented programming (obj.inherits and obj.synthetizes properties). When modules are declared, they&#8217;re registered as a PK Class (i.e. PKClass(PKBarButtonItem) registers PKBarButtonItem as a PK Class)
*   CSS3 wrapper functions (PKUtils.t() is a wrapper for translate3d, etc.)
*   no single library namespace (surprisingly) &#8211; which means there are many many global variables. This however is somewhat acceptable, as all variables are prefixed with &#8220;PK&#8221; and are declared to be constant (const PKStartEvent, const PKEndEvent) and cannot be overwritten.

There&#8217;s also some interesting takeaways not from PastryKit itself, but from the way the iPhone user guide is implemented. Most of the data on the page &#8211; including each menu icon (base64 encoded) &#8211; is located in a single 650kb JSON-encoded file called content.json. This means the initial loading of the page is quite slower than the user would normally expect, but once the initial payload has been delivered, it&#8217;s a relatively smooth browsing experience thereafter.

And as John Gruber already pointed out, this data is stored locally with the help of HTML5, allowing the user to continue reading even while offline!

<div id="attachment_75" style="width: 329px" class="wp-caption aligncenter">
  <img src="http://davidbcalhoun.com/wp-content/uploads/2009/12/apple-pastrykit.png" alt="iPhone user guide in Safari" title="iPhone user guide in Safari" width="319" height="480" class="size-full wp-image-75" /><p class="wp-caption-text">
    iPhone user guide in Safari
  </p>
</div>

### PastryKit unminified and explained (sorta)

What I&#8217;m excited to show you now is a result of a bit of effort to make PastryKit more intelligible. Though there&#8217;s a [minified version of the code][4] on Apple&#8217;s website, it&#8217;s not obfuscated (and rendered unintelligible), so not all hope is lost! With the help of [jsbeautifier.org][5] we can now see the slightly unminified version of the code: [PastryKit.js unminified][6].

The next thing I did was separate each module into its own file. I was able to separate the code into 27 numbered files, with the original ordering preserved (to prevent issues with dependencies). Viewing the code in this way definitely helps make sense of it all. You can download these separate files as part of a little unofficial SDK I made, which also includes a copy of the iPhone user guide with the JS iPhone-only redirect removed: [PastryKit unofficial SDK][7].

### PastryKit modules

The following is an explanation of each module I found. The descriptions are definitely incomplete and possibly inaccurate, so any comments or help is appreciated. But this should hopefully shed some light on the matter!

*   PKUtils &#8211; general helper functions (PKUtils.t() is a wrapper for CSS translate3d, PKUtils.degreesToRadians(), etc, etc.)
*   PKEventTriage &#8211; general event handler
*   PKPropertyTriage &#8211; handlePropertyChange() method &#8211; ?
*   Element &#8211; helper functions added to HTML Element prototype
*   Node &#8211; adds getNearestView() method to HTML Node prototype
*   PKClass &#8211; custom-rolled class with with &#8220;inherits&#8221; and &#8220;synthetizes&#8221; properties
*   PKObject &#8211; custom-rolled object with observer pattern. Most modules extend from this.
*   PKPoint &#8211; wrapper for WebKitPoint &#8211; used for touch events?
*   PKSize &#8211; wrapper for width/height properties
*   PKImage (inherits PKObject) &#8211; helper for creating Image elements and knowing when it&#8217;s finished loading (but doesn&#8217;t add the image to the DOM)
*   PKAnimator &#8211; basic animation tweens
*   PKTransition &#8211; helper for proprietary Webkit CSS transitions
*   PKTransaction &#8211; interacts with PKTransition &#8211; ?
*   PKView (extends PKObject) &#8211; manages a view, such as handling events that occur within that view &#8211; ?
*   PKContentView (extends PKView) &#8211; ?
*   PKRootView (extends PKContentView) &#8211; ?
*   PKScrollIndicator (extends PKView) &#8211; custom scrollbar
*   PKScrollView (extends PKView) &#8211; handles dynamically positioning the page when it&#8217;s scrolled
*   PKTableView (extends PKScrollView) &#8211; handles more touch/scroll events?
*   PKCellPath &#8211; ?
*   PKTableViewCell (extends PKView) &#8211; ?
*   PKToolbar (extends PKView) &#8211; manages the top toolbar
*   PKNavigationView (extends PKView) &#8211; manages bottom navigation bar
*   PKNavigationItem (extends PKObject) &#8211; manages bottom navigation buttons
*   PKControl (extends PKView) &#8211; manages generic controls
*   PKBarButtonItem (extends PKControl) &#8211; manages button controls
*   PKSearchBar.js (extends PKView) &#8211; manages the search bar

### Conclusion after a first glance

As far as I can tell, this is no full-fledged JavaScript library. At least not for now.

On first glance PastryKit seems to be at most a nice development framework for making web apps with the same look-and-feel of native iPhone apps. And this framework in many ways does this better than anything out there (at the moment).

I echo the sentiments of Gruber &#8211; I do hope we hear more about this from Apple!

 [1]: http://daringfireball.net/2009/12/pastrykit
 [2]: http://stackoverflow.com/questions/1143589/what-is-the-pastrykit-framework
 [3]: http://twitter.com/jQTouch/status/6146839190
 [4]: http://help.apple.com/iphone/3/mobile/dist/PastryKit-ug-compact.js
 [5]: http://jsbeautifier.org/
 [6]: http://davidbcalhoun.com/pastrykit/PastryKit.js
 [7]: http://davidbcalhoun.com/pastrykit/pastrykit-sdk.zip