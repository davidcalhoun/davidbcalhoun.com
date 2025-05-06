---
title: "More fun with WebKit pseudoelements: -webkit-search-cancel-button (or: Pseudoclass Inception)"
date: 2012-08-10
comments: true
author: David
layout: post
aliases:
  - /2012/more-fun-with-webkit-pseudoelements-webkit-search-cancel-button-or-pseudoclass-inception/
tags:
  - css
  - webkit
  - pseudoelements
  - webdev
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

### Introduction

**_UPDATE_** 2016: this appears to have even less support than before, and it's not recommended to be used on a production site. Use a helper JS library instead.</p>

(check out the **[Demo][1]**)

A while back I had a bit of a field day [messing around with input type="range"][2], trying to replicate the "unlock slider" on iOS using CSS, targeting special WebKit-only CSS pseudoelements such as webkit-slider-thumb.

Well, now I'm at it again, this time with a much simpler use case, trying to implement a custom "clear" button on search field inputs (note that this only works on input type="search"):

[<img src="http://davidbcalhoun.com/wp-content/uploads/2012/08/custom-webkit-search-cancel-button.png" alt="Custom webkit-search-cancel-button" title="Custom webkit-search-cancel-button" width="239" height="145" class="aligncenter size-full wp-image-914" />][1]

### Details about the implementation

It turns out this is relatively easy to do, and is somewhat supported, at least in the latest Chrome and Safari 6. Note that it does work on iOS6, but not on iOS5, but the positioning is slightly different from the other implementations. No idea about Android, so I'll leave that for someone else to find out.

So how do we do it? First, we need the special WebKit CSS pseudoselector (`-webkit-search-cancel-button`), and secondly, we need to use that to wipe out the default WebKit styling (with -webkit-appearance: none;):

```css
::-webkit-search-cancel-button {
  // select all "X" buttons in search inputs
  -webkit-appearance: none; // hide the default "X" button
}
```

You would think that the next step might be adding our own custom background-image to this element, but unfortunately it won't work that easily (of course).

What we need now is a little bit of trickery, using an `:after` pseudoclass on the pseduoclass (!?). The result is a bit of "pseudoclass Inception":

```css
::-webkit-search-cancel-button {
  /* select all "X" buttons in search inputs */
  -webkit-appearance: none; /* hide the default "X" button */
}

::-webkit-search-cancel-button:after {
  /* generate content after all "X" buttons */
  content: ""; /* required for :after content to show */
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
```

So it turns out you can still whatever you like in there really, even text content (see the last text input in the [demo][1]). You may even need to tweak the positioning a bit, in which case you can learn from the same example (you will need to set position:relative on the cancel button itself to anchor the position:absolute `:after` content - check out the code).

### Final notes

Note that this is just an experiment, not a robust use case that I'm recommending as a cross-browser solution (obviously, since it's WebKit-only).

In the case of wanting to implement something similar cross-browser, I recommend absolutely-positioning a button element over an input element, then adding the appropriate right-padding to the input as necessary, then hooking up the "clear all text" behavior with the help of JavaScript.

### Video

Here's a video if you're not in the mood to read (view in HD so you can read the text!):

<iframe width="480" height="360" src="https://www.youtube.com/embed/3wyWJKJuo4o" frameborder="0" allowfullscreen></iframe>

[1]: https://www.davidbcalhoun.com/a/_old%20mobile%20tests/webkit-search-cancel-button.html
[2]: https://www.davidbcalhoun.com/2011/implementing-iphone-slider-unlock-with-input-type-range
