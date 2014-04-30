---
title: 'More fun with WebKit pseudoelements: -webkit-search-cancel-button (or: Pseudoclass Inception)'
date: 2012-08-10
comments: true
author: David
layout: post
permalink: /2012/more-fun-with-webkit-pseudoelements-webkit-search-cancel-button-or-pseudoclass-inception
categories:
  - css
---
### Introduction

(check out the **[Demo][1]**)

A while back I had a bit of a field day [messing around with input type=&#8221;range&#8221;][2], trying to replicate the &#8220;unlock slider&#8221; on iOS using CSS, targeting special WebKit-only CSS pseudoelements such as webkit-slider-thumb.

Well, now I&#8217;m at it again, this time with a much simpler use case, trying to implement a custom &#8220;clear&#8221; button on search field inputs (note that this only works on input type=&#8221;search&#8221;):

[<img src="http://davidbcalhoun.com/wp-content/uploads/2012/08/custom-webkit-search-cancel-button.png" alt="Custom webkit-search-cancel-button" title="Custom webkit-search-cancel-button" width="239" height="145" class="aligncenter size-full wp-image-914" />][1]

### Details about the implementation

It turns out this is relatively easy to do, and is somewhat supported, at least in the latest Chrome and Safari 6. Note that it does work on iOS6, but not on iOS5, but the positioning is slightly different from the other implementations. No idea about Android, so I&#8217;ll leave that for someone else to find out. <img src='http://davidbcalhoun.com/wp-includes/images/smilies/icon_smile.gif' alt=':)' class='wp-smiley' /> 

So how do we do it? First, we need the special WebKit CSS pseudoselector (``-webkit-search-cancel-button``), and secondly, we need to use that to wipe out the default WebKit styling (with -webkit-appearance: none;):

    ::-webkit-search-cancel-button {   // select all "X" buttons in search inputs
        -webkit-appearance: none;      // hide the default "X" button
    }
{:lang="css"}

You would think that the next step might be adding our own custom background-image to this element, but unfortunately it won&#8217;t work that easily (of course).

What we need now is a little bit of trickery, using an ``:after`` pseudoclass on the pseduoclass (!?). The result is a bit of &#8220;pseudoclass Inception&#8221;:

    ::-webkit-search-cancel-button {   /* select all "X" buttons in search inputs */
        -webkit-appearance: none;      /* hide the default "X" button */
    }

    ::-webkit-search-cancel-button:after {  /* generate content after all "X" buttons */
        content: '';    /* required for :after content to show */
        display: block;

        /*
         * Setup dimensions for the custom icon.  Note that these dimensions seem to
         * affect positioning.
         */
        width: 14px;
        height: 10px;
        
        /*
         * Base64 encoded custom "X" icon
         * Natively 30x30, but downscaled for highres screens
         */
        background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAn0lEQVR42u3UMQrDMBBEUZ9WfQqDmm22EaTyjRMHAlM5K+Y7lb0wnUZPIKHlnutOa+25Z4D++MRBX98MD1V/trSppLKHqj9TTBWKcoUqffbUcbBBEhTjBOV4ja4l4OIAZThEOV6jHO8ARXD+gPPvKMABinGOrnu6gTNUawrcQKNCAQ7QeTxORzle3+sDfjJpPCqhJh7GixZq4rHcc9l5A9qZ+WeBhgEuAAAAAElFTkSuQmCC);

        /* setup all the background tweaks for our custom icon */
        background-repeat: no-repeat;

        /* icon size */
        background-size: 10px;

        /* note: this positioning will need to be tweaked for iOS */
        background-position: top left;
    }
{:lang="css"}

So it turns out you can still whatever you like in there really, even text content (see the last text input in the [demo][1]). You may even need to tweak the positioning a bit, in which case you can learn from the same example (you will need to set position:relative on the cancel button itself to anchor the position:absolute ``:after`` content &#8211; check out the code).

### Final notes

Note that this is just an experiment, not a robust use case that I&#8217;m recommending as a cross-browser solution (obviously, since it&#8217;s WebKit-only).

In the case of wanting to implement something similar cross-browser, I recommend absolutely-positioning a button element over an input element, then adding the appropriate right-padding to the input as necessary, then hooking up the &#8220;clear all text&#8221; behavior with the help of JavaScript.

### Video

Here&#8217;s a video if you&#8217;re not in the mood to read (view in HD so you can read the text!):

 [1]: http://davidbcalhoun.com/a/webkit-search-cancel-button.html
 [2]: http://davidbcalhoun.com/2011/implementing-iphone-slider-unlock-with-input-type-range