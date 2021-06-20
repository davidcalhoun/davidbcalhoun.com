---
title: On designing a mobile webpage (Mobile web part 4)
date: 2010-05-26
comments: true
author: David
layout: post
permalink: /2010/on-designing-a-mobile-webpage
aliases:
- /2010/on-designing-a-mobile-webpage
tags:
- design
- mobile
- webdev
---
The frontend engineer lives at the intersection between design and engineering, and this is perhaps nowhere more true than in the world of mobile. In order to make a usable desktop website, an engineer must have at least some sense of design, and fortunately a lot of this has been standardized over the years. But the world of mobile is full of more unknowns, and the field is changing rapidly, especially lately from the shift away from older feature phones to the focus on smartphones. As such, the mobile engineer has to be on their toes in the sense of both design and engineering.

The focus of this article is on mobile design in general. I&#8217;m by no means an expert, but these are some things I&#8217;ve found to be essential and basic topics. Hopefully you will find this useful!

### Only one column?

Mobile websites should only have one column of main content. This point is stressed again and again in mobile design, and for good reason: the paradigm of multi-column layouts is fairly well-entrenched in desktop design, but it&#8217;s simply not an option for a well-designed mobile site.

To illustrate this point, the following two images are both 320 pixels wide, which is a common smartphone width in portrait mode. The image on the left is the Yahoo! front page ([yahoo.com][1]) in its three-column fixed width desktop size, and the image on the right is Yahoo! mobile&#8217;s front page ([m.yahoo.com][2]):

<img src="http://davidbcalhoun.com/wp-content/uploads/2010/05/yahoo-frontpage.jpg" alt="" title="Yahoo desktop front page" width="320" height="288" class="alignleft size-full wp-image-243 left-margin-large" style="padding: 0 0 6em 0;" /><img src="http://davidbcalhoun.com/wp-content/uploads/2010/05/yahoo-mobile.jpg" alt="" title="Yahoo Mobile front page" width="320" height="482" class="alignleft size-full wp-image-244 left-margin-large" />

This might not be a fair comparison, as the desktop version isn&#8217;t optimized for mobile, so you can&#8217;t even read the text without zooming in. However, even if the size of the text was increased, it&#8217;s apparent that three columns is just too much, both because of screen width concerns as well as concerns about too much content. There&#8217;s simply too much information being crammed down the user&#8217;s throat. Chances are the user only wants to check a few things and then put the phone back in their pocket, and this three-column version of the site is preventing them from doing that.

### Modules, modules, modules

It&#8217;s helpful to think of a webpage as being composed of modules. If you&#8217;re converting a desktop website into a mobile site then you must essentially think of the website as bits of rearrangeable components:

<img src="http://davidbcalhoun.com/wp-content/uploads/2010/05/mobile-modules.png" alt="" title="Components of a website, broken into modules" width="774" height="479" class="size-full wp-image-253" /> 
What you&#8217;re doing is essentially grabbing your most important components and making sure they appear at the top, then stacking each module on top of each other. And don&#8217;t forget we do have variable screen widths on mobile (even on phones themselves, since they can be either in portrait or landscape mode), so we should be sure that each module is taking up 100% of the available screen space. In more technical terms, yes, this means we have to make a fluid layout.

### Clarity and concision

It&#8217;s important to be both clear and concise in presentation. On the desktop we can get away with a certain amount of screen bloat, but users always appreciate simple sites when they come across them. This is a huge part of what made Google so successful: users came to the site for one thing, search, and the site was kept simple to facilitate that interaction.

As it turns out, it&#8217;s quite hard to be clear and concise. I like to compare this to writing papers for school. Often we were given assignments that needed to be a minimum of X amount of words or pages, and it was sometimes challenging to find information to meet this minimum. Fortunately (or unfortunately) many students developed a highly refined skill of BSing to fill the word limit. But were you ever given an assignment where there was a word/page MAXIMUM? This turns out to be much harder to write for, mostly because you can&#8217;t BS it. You have to identify the fluff, the nonessential bits, and surgically remove them from your paper. (As a side note, in the area of computer science, notice how many HUGE tomes there are out there compared to smaller books. I would venture to guess that engineers have a hard time being concise.)

This is just the problem we now face with mobile. We know how to fill up webpages with fluff: add an RSS feed here, add a module that ties into Facebook there, add another feed here, stick a relatively unimportant module there, add an excessive amount of social sharing buttons, and presto, we have a website that looks pretty active. But how does that translate to mobile? The questions you&#8217;re forced to ask yourself are: &#8220;do I really need this data feed displayed here?&#8221;, &#8220;do I need this huge Facebook module here taking up space?&#8221;. Or more positive questions like &#8220;what are the things users will come to my site to check, and how do I make it easier for them to find those things?&#8221;.

In the case of the last question, it&#8217;s easy to see from the above screenshots what Yahoo mobile thought was most important: Mail, Search, and News, all of which are visible at the top of the page. Think about your website&#8217;s main two or three features and try to make those just as visible.

### Useful links

[W3C Mobile Web Best Practices 1.0][3]  
[Tips and Tricks for developing Mobile Widgets][4]

### More from the Mobile Web series:

[Part 1: The viewport metatag][5]  
[Part 2: The mobile developer’s toolkit][6]  
[Part 3: Designing buttons that don’t suck][7]  
[Part 4: On designing a mobile webpage][8]  
[Part 5: Using mobile-specific HTML, CSS, and JavaScript][9]  
[Part 6: Dealing with device orientation][10]  
[Part 7: Mobile JavaScript libraries and frameworks][11]

 [1]: http://yahoo.com
 [2]: http://m.yahoo.com
 [3]: http://www.w3.org/TR/mobile-bp/
 [4]: http://carsonified.com/blog/dev/tips-and-tricks-for-developing-mobile-widgets/
 [5]: http://davidbcalhoun.com/2010/viewport-metatag
 [6]: http://davidbcalhoun.com/2010/the-mobile-developers-toolkit-mobile-web-part-2
 [7]: http://davidbcalhoun.com/2010/designing-buttons-that-dont-suck
 [8]: http://davidbcalhoun.com/2010/on-designing-a-mobile-webpage
 [9]: http://davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript
 [10]: http://davidbcalhoun.com/2010/dealing-with-device-orientation
 [11]: http://davidbcalhoun.com/2010/mobile-javascript-libraries-and-frameworks