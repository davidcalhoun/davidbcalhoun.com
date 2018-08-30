---
title: 'Notes: Mobile Web Design (Cameron Moll, 2007)'
date: 2011-01-21
comments: true
author: David
layout: post
aliases:
- /2011/notes-mobile-web-design-cameron-moll-200/
tags:
- mobile
- design
- webdev
---

### What's this?

These are some notes I collect as I read through Cameron Moll's [Mobile Web Design][1].

### Introduction

8. Further info:

Designing the Mobile User Experience (Barbara Ballard)  
dotMobi Web Developer's Guide (dev.mobi)  
Global Authoring Practices for the Mobile Web (Luca Passani) (passani.it/gap)  
Constant Touch: A Global History of the Mobile Web (Jon Agar)  
Personal, Portable, Pedestrian: Mobile Phones in Japanese Life (Mizuko Ito)  
Mobile Interaction Design (Matt Jones)

13. iPhone released just before publication

### Mobile Web Fundamentals

15. [Putting 2.7 Billion in Context: Mobile Phone Users][2]

18. Phone is smaller. Different input methods. Searching for specific data (directions or a phone number) rather than a truckload of data available via the desktop. One handed interaction.

19. Limitations: small screen size, difficulty of data input, user agent inconsistency

Opportunities: location-specific data, on-the-go-messaging, voice communication.

20. Weather Channel - greater reach on mobile web compared to desktop ([source][3])

21. Rollable display - Polymer Vision Readius ([video][4])

Many devices and user agents, making testing expensive and impractical. Emulators and testing on multiple devices will lead to successful deployment.

22. Opera Mini - far better UI than most native browsers

Mostly must be installed manually, except for T-Mobile shipping hundreds of thousands with it pre-installed

23. "…the mobile web experience is often a small screen, intermittent, one-handed experience"

24. understanding of target audience, their usage and what they want, and the contextual relevance (phone numbers, etc.) of data

25. Initiate a phone call: wtai scheme for WML, tel scheme for HTML.

Some browsers (Opera Mini, Safari Mobile) automatically convert links to phone numbers

WML scheme to add a number to the address book: wtai://wp/ap;+5555555;Amy%20Miller

26. carrier myopia: devs thinking the only way to reach the audience is by landing on the carrier deck. Mobile User Experience Conference (MEX) 2007: "Tearing down the walled garden will enhance the mobile content experience and release value for the industry. The objective should be a free market for content and applications, based on open standards and accessible to all. We think the current fragmentation of formats and channels to market is holding back growth."

29. "cell phone" is an outdated term. Use "mobile" or "device".

30. Japanese market: "keitai" (="something you carry with you")

### Four Methods, Revisited

31. [Mobile Web Design ~ The Series][5] (Cameron Moll, 2005)

32. Method 1: Do nothing. If the markup is meaningful and standards-based, the better mobile browsers can adapt.

33. Good browsers such as the iPhone's allow the viewing of the full site (with zooming).

34. Advantages: mobile browsers shoulder the burden of reformatting content, no additional effort needed, users have same content and possibly the same experience as on a PC

Disadvantages: doesn't address contextual relevance or exploit device capabilities, users with zoom-enabled devices are a small market share

35. Method 2: Reduce images and styling

-presentation styling and images reduced on the fly

mowser.com (Russell Beattie, formerly Yahoo! Mobile)  
skweezer.net - an older service dating back to 2001

2-minute mobile mod: <http://www.mikeindustries.com/blog/archive/2005/07/make-your-site-mobile-friendly>

36. Advantages: relies on implied hierarchy in HTML markup, viewable by a variety of devices, faster download, many browsers override CSS anyway, so why bother?

Disadvantages: ignores contextual relevance of mobility, file size may still be excessive

Method 3: Use Handheld Style Sheets

37. media="handheld" style sheet

38. Not widely supported.

Advantages: handheld style sheet is built into CSS, at most one extra style sheet, one web address  
Disadvantages: ignores contextual relevance of mobility, media="handheld" support is inconsistent and nearly unreliable

Method 4: Create Mobile-Optimized Content

39. Kayak.com/moby

41. Advantages: contextually relevant (addresses first how the content is consumed, and presentation secondly), pages are leaner

Disadvantages: denies access to content by making assumptions about the user and device, two sets of files, alternate web addresses

42. Author's opinion: doing nothing and mobile-optimized content are the two viable approaches

### XHTML/CSS Development

43. WML deck and card metaphor. Decline giving way to XHTML. WAP protocol, WML language.

44. With WAP 2.0, XHTML-MP is the preferred markup language

45. [Markup Test Pages][6], [Mobile Web Design: Tips & Techniques (2005)][7]

47. No need to define new standards just for the web. Same regardless of device: "The underlying standards for the greater web, regardless of device, person, or place, are the same: semantic markup, separation of structure and presentation, accessibility, and so on."

[W3C Mobile Web Best Practices 1.0][8]

[Global Authoring Practices for the Mobile Web (Luca Passani)][9]

48. XHTML-MP template

```html
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html PUBLIC "-//WAPFORUM//DTD XHTML Mobile 1.0//EN" "http://www.wapforum.org/DTD/xhtml-mobile10.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Site Title</title>
  <link rel="stylesheet" type="text/css" href="mobile.css"/>
  <meta http-equiv="Cache-Control" content="max-age=600" />
</head>
<body>
  <h1>Page Heading</h1>
  <p>Content</p>
</body>
</html>
```

49. [DeveloperHome.com's XHTML-MP Tutorial][10]

50. [XHTML-MP Tags List][11]

Good case examples:  
[Flickr Mobile][12]  
[Fandango Mobile][13]

 [1]: http://www.amazon.com/Mobile-Web-Design-Cameron-Moll/dp/0615185916
 [2]: http://communities-dominate.blogs.com/brands/2007/01/putting_27_bill.html
 [3]: http://www.comscore.com/Press_Events/Press_Releases/2007/05/Mobile_Web_Usage_Grows_in_UK
 [4]: http://www.youtube.com/watch?v=uQMBzXaCmqY
 [5]: http://www.cameronmoll.com/archives/000398.html
 [6]: http://www.cameronmoll.com/mobile/mkp
 [7]: http://www.cameronmoll.com/archives/000577.html
 [8]: http://www.w3.org/TR/mobile-bp/
 [9]: http://passani.it/gap
 [10]: http://www.developershome.com/wap/xhtmlmp
 [11]: http://htmllint.itc.keio.ac.jp/htmllink/tagslist.cgi?HTMLVersion=XHTML-MP
 [12]: http://flickr.com/mob
 [13]: http://mobile.fandango.com