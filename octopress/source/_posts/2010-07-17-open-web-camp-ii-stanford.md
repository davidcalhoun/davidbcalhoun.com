---
title: Open Web Camp II at Stanford (July 17, 2010)
date: 2010-07-17
comments: true
author: David
layout: post
permalink: /2010/open-web-camp-ii-stanford
categories:
  - Uncategorized
---
Open Web Camp II at Stanford today was a blast! Lots of information. Plenty I&#8217;m already familiar with, but also lots I learned.

I woke up late, only to see people tweeting about the conference (doh!), so I missed seeing Molly Holzschlag. But I arrived just in time to see&#8230;

### Estelle Weyl: &#8220;CSS3 Implementable Features&#8221;

<div class="image-block full">
  <a href="http://www.flickr.com/photos/franksvalli/4803724562/"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/07/owc2-1.jpg" alt="Estelle Weyl" title="Estelle Weyl" width="800" height="676" class="aligncenter size-full wp-image-373" /></a><cite>Estelle Weyl (<a href="http://twitter.com/estellevw">@estellevw</a>)</cite>
</div>

Estelle&#8217;s talk was about what features of CSS3 are available to use right now. She covered all the usual: border radius, text shadow, box shadow, tilted images, etc. And she showed off Paul Irish&#8217;s [css3please.com][1], which greatly helps implement these cross-browser, with even the filter hacks required to pull it off in IE! (no word about the performance hit of these IE hacks, which I&#8217;m sure I&#8217;ve read about somewhere&#8230;)

One of the cool new things I learned was that you can use CSS shorthands to declare border-radius (rounded corner) values. So instead of this mess (courtesy of [border-radius.com][2]):

<pre name="code" class="css">-webkit-border-top-left-radius: 1px;
-webkit-border-top-right-radius: 2px;
-webkit-border-bottom-right-radius: 3px;
-webkit-border-bottom-left-radius: 4px;
-moz-border-radius-topleft: 1px;
-moz-border-radius-topright: 2px;
-moz-border-radius-bottomright: 3px;
-moz-border-radius-bottomleft: 4px;
border-top-left-radius: 1px;
border-top-right-radius: 2px;
border-bottom-right-radius: 3px;
border-bottom-left-radius: 4px;
</pre>

All you need to do is this, which is equivalent to the above (disclaimer: I&#8217;m not sure about the compatibility of this shorthand!):

<pre name="code" class="css">-moz-border-radius: 10px 20px 30px 40px;
-webkit-border-radius: 10px 20px 30px 40px;
border-radius: 10px 20px 30px 40px;
</pre>

Or if you get bored of doing a perfectly rounded border radius, you can also do elliptical border radius (again, I&#8217;m unsure about the compatibility!):

<pre name="code" class="css">-moz-border-radius: 20px / 10px;
-webkit-border-radius: 20px / 10px;
border-radius: 20px / 10px;
</pre>

### Matt Henry: &#8220;Going Mobile&#8221;

<div class="image-block full">
  <a href="http://www.flickr.com/photos/franksvalli/4803731530/"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/07/owc2-2.jpg" alt="Matt Henry" title="Matt Henry" width="800" height="533" class="aligncenter size-full wp-image-374" /></a><cite>Matt Henry (<a href="http://twitter.com/greenideas">@greenideas</a>)</cite>
</div>

I&#8217;ve worked closely with Matt at [Yahoo! Mobile][3] for the past year, so not much was new for me. It seemed that the audience really dug the talk though (lots of questions were asked!).

Essentially, Matt explained that you have to make at least two different versions of your website: one for feature phones and one for smartphones like the iPhone, and with the help of something like [WURFL][4], detect the phone and direct the user to the appropriate site.

Matt also emphasized that feature phone browsers are terrible, much worse than IE6.

As part of a response to someone&#8217;s question, Matt talked about the idea of feature detection on smart phones, essentially saying that by the time you&#8217;ve sent the JavaScript feature detection to the device, it&#8217;s already too late, and in some cases might end up crashing the browser (for feature phones that have an extremely small page weight such as 9KB). So for now it looks like user agent sniffing on the server-side is the way to go.

And there was a brief shoutout for [Yahoo! Blueprint][5], which renders a website across thousands of phones.

### Victor Tsaran and Todd Kloots: &#8220;Accessibility 101&#8243;

<div class="image-block full">
  <a href="http://www.flickr.com/photos/franksvalli/4803726232/"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/07/owc2-3.jpg" alt="Victor Tsaran (left) and Todd Kloots (right)" title="Victor Tsaran (left) and Todd Kloots (right)" width="800" height="540" class="aligncenter size-full wp-image-375" /></a><cite>Victor Tsaran (<a href="http://twitter.com/vick08">@vick08</a>) and Todd Kloots (<a href="http://twitter.com/todd">@todd</a>)</cite>
</div>

Before joining Twitter, Todd Kloots spent some time with Victor Tsaran at Yahoo! on accessibility.

In this talk they went over common misunderstandings and showed that even today, big companies such as [Digg.com][6] are still not investing in making their site accessible.

This was a pretty high level overview of basic accessibility, including an introduction to screen readers and ARIA attributes.

Here&#8217;s some of the stuff covered:  
-making forms accessible with fieldset and legend elements and linking captions to their inputs.  
-adding alt tags to images even if blank (so the screen reader doesn&#8217;t announce the entire URL)  
-the title tag doesn&#8217;t make things more accessible, whereas the alt tag does  
-screen readers obey display: none and visibility: hidden and that to hide something from normal users you have to position it offscreen (with negative left or text-indent).  
-how to make basic tables accessible by taking advantage of table summary and caption, as well as putting tables headings into the <thead> element.

I&#8217;m still trying to absorb it, but Todd also mentioned that a simple anchor tag for a button didn&#8217;t semantically make sense, and that it was more semantic to have a span wrapped around a <button>. I guess I either don&#8217;t understand fully or I just disagree, since a <button> appears within a form and sometimes it just may be a cleaner solution to use a simple anchor tag. I guess I will need to look into this more.

### Joseph R. Lewis: &#8220;Refactoring for Mobile&#8221;

<div class="image-block full">
  <a href="http://www.flickr.com/photos/franksvalli/4803099119/"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/07/owc2-4.jpg" alt="Joseph R. Lewis" title="Joseph R. Lewis" width="800" height="533" class="aligncenter size-full wp-image-376" /></a><cite>Joseph R. Lewis (<a href="http://twitter.com/sanbeiji">@sanbeiji</a>)</cite>
</div>

This talk was basically a live demo of implementing CSS media queries in a WordPress installation to make an iPhone-friendly version of the site. There was a good use of the viewport tag, media queries, @font-face, text-shadow, box-shadow, border-radius, etc.

One surprising thing I learned was that apparently Mobile Safari recognizes border-radius without the webkit prefix? I&#8217;m going to follow up on this.

### Dirk Ginader: &#8220;5 layers of web accessibility&#8221;

<div class="image-block full">
  <a href="http://www.flickr.com/photos/franksvalli/4803100401/"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/07/owc2-5.jpg" alt="Dirk Ginader" title="Dirk Ginader" width="800" height="533" class="aligncenter size-full wp-image-377" /></a><cite>Dirk Ginader (<a href="http://twitter.com/ginader">@ginader</a>)</cite>
</div>

Dirk is another Yahoo! (we&#8217;re everywhere!) whose presentation was also about accessibility.

As web developers, we&#8217;re already familiar with three layers of the web:

-HTML, responsible for content  
-CSS, responsible for presentation  
-JavaScript, responsible for interaction

Dirk introduced another two levels:

-CSS for JavaScript: special styling for when the full-featured JavaScript is available (this can be used by having JS add a &#8220;js&#8221; class to the document, and therefore writing CSS rules with &#8220;.js&#8221; in the front)  
-WAI-ARIA: special HTML attributes to help define roles, landmarks, allow the developer to give instructions directly through the screen reader, etc.

Also a few more points:  
-use the JavaScript focus() method for events (alerts that are injected at the top of the document and are otherwise ignored by the screen reader, windows that open and close, etc.)  
-:hover CSS pseudoclass is for the mouse only.. be sure to also use the :focus pseudoclass! (my note: this is also important on mobile, for touch devices!)

### Summary

Overall a great day. The food was pricey but good, and the whole event was free, so I can&#8217;t complain! Nice event, I just wish I could&#8217;ve seen the other talks in the other tracks!

 [1]: http://css3please.com/
 [2]: http://border-radius.com/
 [3]: http://mobile.yahoo.com/
 [4]: http://wurfl.sourceforge.net/
 [5]: http://mobile.yahoo.com/developers
 [6]: http://digg.com