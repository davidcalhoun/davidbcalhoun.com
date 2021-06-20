---
title: "The mobile developer's toolkit (Mobile web part 2)"
date: 2010-05-11
comments: true
author: David
layout: post
permalink: /2010/the-mobile-developers-toolkit-mobile-web-part-2
tags:
- emulator
- simulator
- webdev
- mobile
---
### Tools of the trade

You&#8217;re no mobile developer unless you have the tools to develop on mobile! And while it&#8217;s good to own at least one of the smartphones you&#8217;re developing on, it&#8217;s probably unrealistic to think that you&#8217;re going to go out of your way to buy several other unlocked smartphones just to test with. So you should have the next best thing: an SDK!

But an SDK is just one of the tools of the trade. Here&#8217;s links to more things to get you started!

### SDKs, Emulators and Simulators

Short of having access to a real phone, the next best thing is to have an emulator/simulator. And good news: all the major smartphones have SDKs available for you!

[iPhone SDK][1] (Mac OS X only) &#8211; the quintessential SDK for the quintessential smartphone. Includes iPhone simulator.  
[Android SDK][2] (Mac OS X, Windows, and Linux)  
[Palm webOS SDK][3] (Mac OS X, Windows, and Linux) &#8211; emulator for Palm Pre, Pixi, etc. Also check out Ares, the browser-based tool for creating web apps.  
[Firefox Mobile emulator (aka Fennec)][4] &#8211; mobile version of Firefox being developed for new Nokias and soon Androids  
[Opera Mobile emulator][5] &#8211; this is the fastest emulator of the bunch, in terms of downloading and launching the program. Painless installation.  
[Opera Mini Simulator][6] (Browser-based Java applet) &#8211; In-browser simulator. Note that Opera Mini is different than Opera Mobile.  
[Windows Phone 7 Series emulator][7]

For a more complete list, see [Maximiliano Firtman&#8217;s Mobile Emulators &#038; Simulators: The Ultimate Guide][8]

### Device labs

These are services which allow you to test on actual devices in a lab.

[Perfecto Mobile][9]

[Keynote MITE (Mobile Interactive Testing Environment)][10] (Windows only) &#8211; a glorified user agent switcher. Doesn&#8217;t have testing of real devices.

[DeviceAnywhere][11] (Java-based software that runs on Windows and Mac OSX) &#8211; a service that lets you test on actual mobile devices sitting in labs around the world. It has a tendency to be a bit clunky, but there&#8217;s no real alternatives on the market. Only subscribe to this if you intend on supporting more than just smartphones.

### Mobile JavaScript libraries

I&#8217;ve created [a separate entry for the mobile libraries and frameworks now available][12].

### Hybrid (web + native)

The concept is simple: use what you know to create an app with HTML/CSS/JS and turn it into a marketable native app with one of these &#8220;wrapper&#8221; services.

[PhoneGap][13]  
[appcelerator&#8217;s Titanium Mobile][14]  
[QuickConnectFamily][15]  
[Rhomobile][16] (HTML-based)

### User agent switchers

Many websites sniff a browser&#8217;s user agent to detect if it&#8217;s a mobile device. As a developer this presents a challenge, because a lot of development is done on a desktop browser. With a user agent switcher, a developer can masquerade their desktop browser as a mobile browser.

[Firefox addon: User Agent Switcher][17]

Safari: Enable the Develop toolbar (click on Safari -> Preferences -> Advanced) and click on Develop -> User Agent. Select a predefined user agent or enter a custom agent by selecting &#8220;Other&#8230;&#8221;

Chrome: There is no easy way to do this (note that the one user agent switcher extension for Chrome doesn&#8217;t work). Currently the only way is to set command line flags:

<div class="instructions">
  <p>
    To change the user agent of Chrome in Windows:
  </p>
  
  <ol>
    <li>
      Make a copy of the shortcut to Chrome.
    </li>
    <li>
      Right click the copy and select Properties.
    </li>
    <li>
      In the Target field append &ndash;&ndash;user-agent=&#8221;myagent&#8221;
    </li>
  </ol>
  
  <p>
    Example Target: “C:\Documents and Settings\Username\Local Settings\Application Data\Google\Chrome\Application\chrome.exe” &ndash;&ndash;user-agent=”Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)”
  </p>
</div>

<div class="instructions">
  <p>
    To change the user agent of Chrome in Mac OSX:
  </p>
  
  <ol>
    <li>
      Open Terminal
    </li>
    <li>
      Enter the following into terminal: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome &ndash;&ndash;user-agent=&#8221;myagent&#8221;
    </li>
  </ol>
  
  <p>
    Example command: /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome &ndash;&ndash;user-agent=”Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)”
  </p>
</div>

### Mobile detection

On the server side, mobile detection is mostly done by user agent sniffing (thus the need for the user agent switchers above), but there are [a few other methods][18].

&#8220;Lite&#8221; user agent detection: these methods implement a simple server-side function (commonly in PHP) to detect common mobile user agents. There&#8217;s a few versions, mostly based on code by [Andy Moore][19]. There&#8217;s one implemented in the [WordPress Mobile Pack][20] and [a similar one described on the Nokia developer forums][18].

[WURFL (Wireless Universal Resource File)][21] &#8211; a 10+ year old project that is still being used and gaining momentum. It&#8217;s beneficial because it&#8217;s open source and it offers a lot of valuable information about devices.

[DeviceAtlas][22] &#8211; essentially a commercial version of WURFL

### Reporting bugs

Everybody&#8217;s human. All this new cutting-edge stuff isn&#8217;t exactly bug-free. Help squash bugs by reporting them on the project&#8217;s website. For best results, show a simplified example of the bug in action (try not to post big hunks of code!).

[WebKit Bugzilla][23]  
[Android: Report bugs][24]

### Blogs

Keep up to date! There&#8217;s new stuff happening all the time on the mobile web.

[QuirksBlog][25] &#8211; blog of [Peter-Paul Koch (PPK)][26], who is known for documenting and researching cross-browser inconsistencies. As of the last several years he&#8217;s been focusing on documenting mobile browser bugs.

[Daring Fireball][27] &#8211; John Gruber&#8217;s blog with a cultlike following. Frequently reports on mobile happenings, especially stuff relating to Apple.

[Surfin&#8217; Safari &#8211; The WebKit Blog][28]  
[Android Developers blog][29]  
[IE for Windows Phone Team Weblog][30]  
[Opera Mobile Blog][31]  
[Inside BlackBerry &#8211; The Official BlackBerry Blog][32]

[Yahoo! Mobile Blog][33]  
[Google Mobile Blog][34]

### Miscellaneous

[Yahoo! Blueprint][35] &#8211; framework for normalizing cross-browser issues across thousands of devices

### More from the Mobile Web series:

[Part 1: The viewport metatag][36]  
[Part 2: The mobile developer’s toolkit][37]  
[Part 3: Designing buttons that don’t suck][38]  
[Part 4: On designing a mobile webpage][39]  
[Part 5: Using mobile-specific HTML, CSS, and JavaScript][40]  
[Part 6: Dealing with device orientation][41]  
[Part 7: Mobile JavaScript libraries and frameworks][12]

 [1]: http://developer.apple.com/
 [2]: http://developer.android.com/sdk
 [3]: http://developer.palm.com/
 [4]: https://developer.mozilla.org/En/Mobile
 [5]: http://www.opera.com/developer/tools/
 [6]: http://www.opera.com/mini/demo/
 [7]: http://developer.windowsphone.com/windows-phone-7-series/
 [8]: http://www.mobilexweb.com/emulators
 [9]: http://www.perfectomobile.com/
 [10]: http://mite.keynote.com/
 [11]: http://www.deviceanywhere.com/
 [12]: http://davidbcalhoun.com/2010/mobile-javascript-libraries-and-frameworks
 [13]: http://www.phonegap.com/
 [14]: http://www.appcelerator.com/products/titanium-mobile-application-development/
 [15]: http://www.quickconnectfamily.org/
 [16]: http://rhomobile.com/
 [17]: https://addons.mozilla.org/en-US/firefox/addon/59/
 [18]: http://wiki.forum.nokia.com/index.php/Detecting_Mobile_Devices_on_Web_Services
 [19]: //andymoore.info
 [20]: http://plugins.svn.wordpress.org/wordpress-mobile-pack/trunk/plugins/wpmp_switcher/lite_detection.php
 [21]: http://wurfl.sourceforge.net/
 [22]: http://deviceatlas.com/
 [23]: https://bugs.webkit.org/
 [24]: http://source.android.com/report-bugs
 [25]: http://www.quirksmode.org/blog/
 [26]: http://twitter.com/ppk
 [27]: http://daringfireball.net/
 [28]: http://webkit.org/blog/
 [29]: http://android-developers.blogspot.com/
 [30]: http://blogs.msdn.com/iemobile/
 [31]: http://my.opera.com/operamobile/blog/
 [32]: http://blogs.blackberry.com/
 [33]: http://ymobileblog.com/
 [34]: http://googlemobile.blogspot.com/
 [35]: http://mobile.yahoo.com/devcenter
 [36]: http://davidbcalhoun.com/2010/viewport-metatag
 [37]: http://davidbcalhoun.com/2010/the-mobile-developers-toolkit-mobile-web-part-2
 [38]: http://davidbcalhoun.com/2010/designing-buttons-that-dont-suck
 [39]: http://davidbcalhoun.com/2010/on-designing-a-mobile-webpage
 [40]: http://davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript
 [41]: http://davidbcalhoun.com/2010/dealing-with-device-orientation