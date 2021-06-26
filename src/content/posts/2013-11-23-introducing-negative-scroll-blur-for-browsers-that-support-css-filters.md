---
title: Introducing Negative Scroll Blur (for browsers that support CSS filters)
date: 2013-11-23
comments: true
author: David
layout: post
permalink: /2013/introducing-negative-scroll-blur-for-browsers-that-support-css-filters
tags:
  - javascript
  - demo
  - webdev
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

(2016: in retrospect, this is kind of gratuitous and doesn't appear to be fully working anymore...)

[Demo][1]

Just for fun, I wanted to reproduce a cool but completely superfluous UI I saw in the updated Foursquare app recently. Basically, when the user tries to scroll past the upper bound of the app/page, the header image becomes blurred.

We can do the same thing on the web by listening for negative scroll and then using (abusing?) CSS filters.

### Video

<a href="http://www.youtube.com/watch?feature=player_embedded&v=wfuVM1P_qgg
" target="_blank"><img src="http://img.youtube.com/vi/wfuVM1P_qgg/0.jpg" 
alt="Negative Scroll Blur" width="480" height="360" /></a>

### Extra tweaks for mobile

Note that there's an extra trick for iOS, which presents problems I had forgotten about (namely, no negative scroll, and a scroll listener which fires once at the end of scrolling). That's why I had to throw in some extra logic for touchstart/touchmove/touchend.

### Links

[Demo][1]  
[Github][2]

[1]: https://www.davidbcalhoun.com/a/_old%20mobile%20tests/negative-scroll-blur.html
[2]: https://github.com/davidcalhoun/negative-scroll-blur
