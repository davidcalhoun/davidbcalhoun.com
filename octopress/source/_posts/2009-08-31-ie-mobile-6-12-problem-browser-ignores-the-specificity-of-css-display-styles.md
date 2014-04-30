---
title: 'IE Mobile 6.12 problem: browser ignores the specificity of CSS display styles'
date: 2009-08-31
comments: true
author: David
layout: post
permalink: /2009/ie-mobile-6-12-problem-browser-ignores-the-specificity-of-css-display-styles
categories:
  - Uncategorized
tags:
  - 6.12
  - css
  - display
  - ie6
  - iemobile
  - inline
  - inline-block
---
**UPDATE:** I found that the problem is actually that inline-block is completely unsupported in this version of IE Mobile, and is likely also unsupported in IE Mobile 7, which is also based on IE4. This is in contrast to desktop IE6, where inline-block is supported on elements that are natively inline (span, em, etc.).

Just found this today, for what it&#8217;s worth.  If you&#8217;re unlucky enough to be working with older Windows Mobile phones you have probably realized that the browser is based on IE6, which all the desktop web developers notoriously complain about constantly.

Though the mobile version of IE6 has most of the same issues as its desktop counterpart, IEMobile introduces some new random problems.  And in most cases there&#8217;s no handy web resources to help you out, since almost everyone develops for the desktop.

This particular IEMobile quirk is a specificity problem.  We have a parent element styled with display: block and the child element is styled with display: inline-block or display: inline.  We&#8217;ve made the child CSS selector more specific so it *should* override the parent:

<pre name="code" class="css">.parent { display: block; }
.parent .child { display: inline-block; }</pre>

This works on the desktop version of IE6!  But not in IEMobile 6.12, where the child element is still displayed as a block.  The same thing happens when we change the &#8220;.parent .child&#8221; style to &#8220;display: inline;&#8221;, but interestingly not when we change it to &#8220;display: none;&#8221;, where the style is correctly recognized and applied.  Doh!

And FYI: I checked and found that this bug is *not* occurring on IEMobile 8.12