---
title: The viewport metatag (Mobile web part 1)
date: 2010-05-06
comments: true
author: David
layout: post
permalink: /2010/viewport-metatag
categories:
  - mobile
tags:
  - handheldfriendly
  - metatag
  - mobile
  - mobileoptimized
  - viewport
---
### The skinny

Use this:

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
{:lang="html"}

### Introduction

This series of posts is intended to introduce web developers to basic techniques for designing for the mobile web. It assumes at least a basic knowledge of creating desktop websites.

### The problem

Ok, so you've settled down to learn how to write a website for a mobile device using your current knowledge of building desktop websites. So you start off with some pretty basic HTML:

    <!doctype html>
    <html>
    <head>
        <title>Hello world!</title>
    </head>

    <body>
    <p>Hello world!</p>
    </body>
    </html>
{:lang="html"}

Ok! You can't get much simpler than that. You check it out and it looks good on all the desktop browsers, since there's really no opportunity yet for any cross-browser inconsistencies. And then you check it out on your mobile device:

<a href="http://davidbcalhoun.com/wp-content/uploads/2010/05/hello-world-iphone.png"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/05/hello-world-iphone.png" alt="" title="hello-world-iphone" width="320" height="480" class="size-full wp-image-199" /></a>Hello World on the iPhone

Doh! Where'd we go wrong? The text is obviously way too small to read without zooming in.

This is the first lesson in making mobile websites: width is your enemy. This is the first of many countless problems with device width you will encounter. Fair warning.

If you think about it logically, it seems to make sense: mobile Safari took a look at the page and assumed it was a document designed for the desktop, which is true of the vast majority of websites. So it gave the website a width of 980 pixels and presented it zoomed out. Which is why we can't read anything until we zoom into the page.

### Viewport

But this is no good! What we need to do is tell the browser that this webpage is optimized for mobile. And this is where the viewport metatag comes into the picture.

Now we tweak our Hello World just a bit...

    <!doctype html>
    <html>
    <head>
        <title>Hello world!</title>

        <meta name="viewport" content="width=device-width"/>
    </head>

    <body>
    <p>Hello world!</p>
    </body>
    </html>
{:lang="html"}

And we get this...  
<a href="http://davidbcalhoun.com/wp-content/uploads/2010/05/hello-world-viewport-iphone.png"><img src="http://davidbcalhoun.com/wp-content/uploads/2010/05/hello-world-viewport-iphone.png" alt="" title="hello-world-viewport-iphone" class="aligncenter size-full wp-image-203" width="320" height="480" /></a>Hello World with the Viewport tag

Much better! By setting the viewport width equal to "device-width", we're essentially telling it that the device width is 320px, not the default value of 980px that it guessed. If we set width=320 it would achieve the same result on the iPhone and a few other smartphones, but not all phones have this exact width, so it's best to simply set device-width and let the mobile browser figure it out.

This viewport metatag is supported on many smartphones, from iPhone to Android to webOS (Palm) to even Internet Explorer Mobile, Opera Mini and Opera Mobile.

At the end of the day here's what the standard viewport looks like, as grabbed from [m.yahoo.com][1]:

    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
{:lang="html"}

EDIT: It's been discussed a bit, and it seems that preventing the user from scaling the page (pinch zooming) isn't necessarily desirable. So here's a version of the tag that allows the user to pinch zoom:

    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
{:lang="html"}

### More fun with the viewport tag

In addition to solving our biggest concern with the width of the content, the viewport tag has more options to play with:

<table class="datatable-medium">
  <tr>
    <td>
      Property
    </td>
    
    <td>
      Description
    </td>
  </tr>
  
  <tr>
    <td>
      width
    </td>
    
    <td>
      Width of the viewport in pixels (or device-width). If width isn't set, it defaults to a desktop size (980px on mobile Safari).
    </td>
  </tr>
  
  <tr>
    <td>
      height
    </td>
    
    <td>
      Height of the viewport in pixels (or device-height). Generally you don't need to worry about setting this property.
    </td>
  </tr>
  
  <tr>
    <td>
      initial-scale
    </td>
    
    <td>
      (0 to 10.0) Multiplier that sets the scale of the page after its initial display. Safe bet: if you need to set it, set it to 1.0. Larger values = zoomed in, smaller values = zoomed out
    </td>
  </tr>
  
  <tr>
    <td>
      minimum-scale
    </td>
    
    <td>
      (0 to 10.0) The minimum multiplier the user can "zoom out" to. Defaults to 0.25 on mobile Safari.
    </td>
  </tr>
  
  <tr>
    <td>
      maximum-scale
    </td>
    
    <td>
      (0 to 10.0) The minimum multiplier the user can "zoom in" to. Defaults to 1.6 on mobile Safari.
    </td>
  </tr>
  
  <tr>
    <td>
      user-scalable
    </td>
    
    <td>
      (yes/no) Whether to allow a user from scaling in/out (zooming in/out). Default to "yes" on mobile Safari.
    </td>
  </tr>
</table>

### Feature phones: when viewport isn't available...

Unfortunately the viewport tag is relatively new and as such isn't universally supported, especially if you're working on older feature phones. But there are some older methods at your disposal for identifying your website as optimized for mobile:

    <meta name="HandheldFriendly" content="true"/>
{:lang="html"}

This tag was originally used to identify mobile content in AvantGo browsers, but has now been made the general standard for identifying mobile websites. However, it's unknown what range of browsers support this meta tag.

Another tag at your disposal is a Windows-proprietary meta tag that also took root and eventually became used as another means of identifying mobile content. The drawback with this tag is that a specific width must be given, which doesn't make it as flexible as the viewport tag (see above). Again, it's unknown what the support for this tag is:

    <meta name="MobileOptimized" content="320"/>
{:lang="html"}

Lastly, your website will be identified as a mobile optimized site if your doctype is either XHTML-MP or WML. However, this is becoming less and less the case these days, as browsers begin to support good old HTML4.01 and HTML5+.

(info for this section comes from [Beginning Smartphone Web Development][2])

### Custom Android properties

[The official Android documentation][3] lists a special property they've added to the meta tag: target-densitydpi. This property essentially allows developers to specify which screen resolution the page has been developed for, or more specifically how to handle the scaling of media such as images.

Here's an example of the tag in action:

    <meta name="viewport" content="target-densitydpi=device-dpi" />
{:lang="html"}

### References

[Safari HTML Reference: Supported Meta Tags][4]  
[Mobile META Tags][5]

### More from the Mobile Web series:
* [Part 1: The viewport metatag][6]  
* [Part 2: The mobile developer’s toolkit][7]  
* [Part 3: Designing buttons that don’t suck][8]  
* [Part 4: On designing a mobile webpage][9]  
* [Part 5: Using mobile-specific HTML, CSS, and JavaScript][10]  
* [Part 6: Dealing with device orientation][11]  
* [Part 7: Mobile JavaScript libraries and frameworks][12]

 [1]: http://m.yahoo.com
 [2]: http://www.amazon.com/gp/product/B003U890OQ/ref=pd_lpo_k2_dp_sr_1?pf_rd_p=486539851&#038;pf_rd_s=lpo-top-stripe-1&#038;pf_rd_t=201&#038;pf_rd_i=143022620X&#038;pf_rd_m=ATVPDKIKX0DER&#038;pf_rd_r=017307F07YKBPJX46DXB
 [3]: http://developer.android.com/reference/android/webkit/WebView.html
 [4]: http://developer.apple.com/safari/library/documentation/AppleApplications/Reference/SafariHTMLRef/Articles/MetaTags.html
 [5]: http://learnthemobileweb.com/tag/mobile-web-development/page/3/
 [6]: http://davidbcalhoun.com/2010/viewport-metatag
 [7]: http://davidbcalhoun.com/2010/the-mobile-developers-toolkit-mobile-web-part-2
 [8]: http://davidbcalhoun.com/2010/designing-buttons-that-dont-suck
 [9]: http://davidbcalhoun.com/2010/on-designing-a-mobile-webpage
 [10]: http://davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript
 [11]: http://davidbcalhoun.com/2010/dealing-with-device-orientation
 [12]: http://davidbcalhoun.com/2010/mobile-javascript-libraries-and-frameworks