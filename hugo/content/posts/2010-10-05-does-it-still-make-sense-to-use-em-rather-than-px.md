---
title: Does it still make sense to use em rather than px?
date: 2010-10-05
comments: true
author: David
layout: post
permalink: /2010/does-it-still-make-sense-to-use-em-rather-than-px
tags:
- css
- webdev
tags:
  - em
  - media queries
  - mobile
  - px
---

Alex Kessinger [tweeted][1] asking if there was a reason to still use EMs instead of PX measurements in mobile. This is an interesting question, but 140 characters isn't quite enough to explain my thoughts. So here's an old-fashioned blog post!

Just a quick review: em and percentage (%) units in CSS are relative measurements, whereas px and other measurements are not. What this means is that the resulting size of relative measurements depends on the size of the parent.

### The original reason to use EMs instead of PX measurements

As far as I can tell, the original reason why it became a good practice to use EMs was because of page scaling and accessibility reasons. When developers used PX measurements, they found that when the page was scaled (using Ctrl + Scroll Wheel), the parts of the page with fixed PX measurements didn't scale.

Oh no! So when a user with poor eyesight tried to scale a page to read the text better, it turns out that the text they were interesting in making bigger actually didn't change size at all!

So is this still the case today? By and large, no. All modern browsers except IE6 will now scale pages correctly, regardless of the type of CSS units used.

From what I've heard, there are still many users with disabilities using IE6, but the reason is because they don't want to upgrade their copy of the screen reader JAWS, which is quite expensive. However, these users obviously aren't affected by page scaling issues because they are blind.

### Maintainability concerns

Even if the original reason to use EMs (above) is no longer valid, I still believe there are good reasons to use them.

One of the main reasons is maintainability. If a page is designed to have one base font size (applied to the Body) and all other font sizes on the page use relative units (EMs or percentages), changing the font sizes later becomes almost trivial. If someone wants to later increase the size of the fonts on their entire page, all they need to do is increase the one base font size.

This might be a bit of an edge case, but the elegance of the solution is too enticing!

### Media queries and mobile

Very closely related to the above point is the subject of media queries. Recently media queries have been somewhat hailed as a [panacea for all mobile development][2]. I slightly disagree, but that's a topic for another post!

The main point here is that people are now using media queries to quickly make mobile-friendly versions of their desktop websites. That's awesome, there's no doubt about that.

So what about EMs and PX measurements? Here's the problem: if a developer coded their webpage in such a way that they used fixed pixel measurements, the amount of CSS required in the mobile media query could be obscenely large. This is because each individual element with pixel measurement was *designed with the desktop in mind*! This makes the task of adapting to different content very painful.

On the other hand, think about a page designed with relative units such as EMs or percentages. This page was designed so that each element was proportional to its parent element, so that ideally changing the size of the entire page occurs in only a few places, at the Body level of the document. Suddenly the CSS required for the mobile media query is much more manageable, since it's now (ideally) only changing a few values on the Body element, not on *every* element on the page.

 [1]: http://twitter.com/voidfiles/status/26470129747
 [2]: http://www.quirksmode.org/blog/archives/2010/09/rethinking_the.html