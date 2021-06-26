---
title: "Targeting Internet Explorer (IE): the age-old struggle"
date: 2010-07-07
comments: true
author: David
layout: post
aliases:
  - /2010/targeting-ie-the-age-old-struggle
tags:
  - conditional comments
  - hacks
  - ie hack
  - ie6
  - ie7
  - ie8
  - ie9
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

As long as I can remember, developers have always been trying to target IE one way or another. Thanks to the wonders of modern technology, there have been multiple ways to pull this off.

I guess I really haven&#8217;t been keeping up with the latest frontend trends (doh!), as I&#8217;ve just recently discovered this very elegant solution circa 2008 offered by [Paul Irish][1], which sticks a class on the body tag using proprietary conditional IE tags (no JavaScript magic needed here!):

<pre name="code" class="html">&lt;!--[if lt IE 7 ]&gt; &lt;body class="ie6"&gt; &lt;![endif]--&gt;
&lt;!--[if IE 7 ]&gt;    &lt;body class="ie7"&gt; &lt;![endif]--&gt;
&lt;!--[if IE 8 ]&gt;    &lt;body class="ie8"&gt; &lt;![endif]--&gt;
&lt;!--[if IE 9 ]&gt;    &lt;body class="ie9"&gt; &lt;![endif]--&gt;
&lt;!--[if gt IE 9]&gt;  &lt;body&gt;             &lt;![endif]--&gt;
&lt;!--[if !IE]&gt;&lt;!--&gt; &lt;body&gt;         &lt;!--&lt;![endif]--&gt;
</pre>

No need for creating multiple stylesheets for each version of IE (that makes extra network requests&#8230; boo)! Now you can add adjustments to your main stylesheet just as you would with CSS hacks, except now you&#8217;re doing it in a not-so-hacky way.

For instance, if you have some peculiar CSS quirk in IE6, you simply apply a fix like this:

<pre name="code" class="css">.some-element { width: 200px; }         /* standards-based browsers */
.ie6 .some-element { width: 160px; }  /* elegant ie6 fix! */
</pre>

### The old way: CSS hacks

Previously I considered some CSS hacks the most elegant solution, but that was in the days when IE6/7 ruled. You can see that the following CSS hack gets really unruly for IE8 (that hack thanks to [David Bloom][2]):

<pre name="code" class="css">.some-element {
    width: 200px;                /* standards-based browsers */
    /* some yet-to-be-determined IE9 hack goes here */
    width /*\**/: 180px\9        /* targets IE8 standards mode */
    *width: 170px;               /* targets IE7/IE6 */
    _width: 160px;               /* targets IE6 */
}
</pre>

This works, but becomes quite difficult to maintain and understand. And it just creates a need for someone to find yet another hack for each new version of IE that&#8217;s released. By using the IE conditional comments to add a class to the body tag, we can accomplish the same result in a way that is easier to read and maintain and is dead simple to update when a new version of IE is released:

<pre name="code" class="css">.some-element { width: 200px; }
.ie9 .some-element { width: 190px; }
.ie8 .some-element { width: 180px; }
.ie7 .some-element { width: 170px; }
.ie6 .some-element { width: 160px; }
</pre>

Woohoo!

### Related links

[Conditional comments block downloads][3]: Stoyan Stefanov&#8217;s concerns over using this pattern

[1]: http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/
[2]: http://my.opera.com/dbloom/blog/2009/03/11/css-hack-for-ie8-standards-mode
[3]: http://www.phpied.com/conditional-comments-block-downloads/
