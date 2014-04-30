---
title: Post a status update to the native Facebook app from a web link
date: 2012-02-02
comments: true
author: David
layout: post
permalink: /2012/post-a-status-update-to-the-native-facebook-app-from-a-web-link
categories:
  - Uncategorized
---
### **UPDATE 2/25/2013**

**As of Facebook&#8217;s update last year, it appears that many of the old [Facebook URL schemes][1] are no longer working&#8230;**. So this post looks to be outdated and useless already. <img src='http://davidbcalhoun.com/wp-includes/images/smilies/icon_razz.gif' alt=':P' class='wp-smiley' /> 

### The skinny

Copy this code:

    <a href="fb://publish/profile/me?text=foo">Post to Facebook</a>
{:lang="html"}

### Explanation

As you may know, Facebook has a URL scheme

    fb://

which seems to be mainly used by native developers. What most folks don&#8217;t realize is that it&#8217;s just a URL scheme, like http://, and that we can use it within our mobile browsers! The only problem is that there&#8217;s no official documentation for it, so folks have had to hunt down the particulars.

After poking around a bit, you might find [this topic on Stackoverflow][2], which contains a ton of protocols for getting to specific sections of the Facebook app, as well as this interesting snippet:

    <a href="fb://publish/profile/#ID#?text=#BODY#">fb://publish/profile/#ID#?text=#BODY#</a>
{:lang="html"}

Trying that as a link does work, but it takes you to this blank screen:

<img src="http://davidbcalhoun.com/wp-content/uploads/2012/02/facebook-blank-screen.png" alt="Facebook app - blank screen" title="Facebook app - blank screen" width="320" height="480" class="aligncenter size-full wp-image-878" />

That blank screen isn&#8217;t too exciting, but it is peaceful, like a Zen rock garden. Bookmark that page so you can come back later, when you&#8217;re overwhelmed by friends flooding your updates screen with baby pictures.

### Google to the rescue!

Ok, now back to work!

After poking around and trying to find my Facebook id, I inserted it and got the link to work. But that&#8217;s not ideal, since everyone has different user ids. And I&#8217;m not about to load in all the bloatware that comes with the Facebook API just to find a user id!

After poking around a bit, I found [this link][3] which showed this generic pattern:

    <a href="fb://publish/profile/me">fb://publish/profile/me</a>
{:lang="html"}

Whoo! And that works! But I still want to prepopulate the status field. We can do that by passing in a URL parameter:

    <a href="fb://publish/profile/me?text=foo">fb://publish/profile/me?text=foo</a>
{:lang="html"}

Clicking on it will get you to a screen which looks like this:

<img src="http://davidbcalhoun.com/wp-content/uploads/2012/02/facebook-status-disabled.png" alt="Facebook status update with share button disabled" title="Facebook status update with share button disabled" width="320" height="480" class="aligncenter size-full wp-image-865" />

This, interestingly enough, appears to be the old implementation of the status screen. Here&#8217;s what it looks like if you launch it through the button on the native app:

<img src="http://davidbcalhoun.com/wp-content/uploads/2012/02/facebook-status-normal.png" alt="Facebook status - what it looks like normally" title="Facebook status - what it looks like normally" width="320" height="480" class="aligncenter size-full wp-image-867" />

Also note that the Share button is disabled until the user types in text themselves. This might be a little confusing for some users, but it&#8217;s probably the best way to prevent spam.

### Detecting if the Facebook app is installed

There&#8217;s another issue with *folks who don&#8217;t have the native Facebook app installed*. There doesn&#8217;t seem to be a perfect way to detect if the link failed and went nowhere. What we have to work with are [hacky workarounds involving setTimeout][4].

It looks like native iOS apps have an ideal URL scheme checking ability with a [canOpenURL][5] method. Unfortunately it doesn&#8217;t look like the web has this function (yet). Let&#8217;s bug Apple to implement it! <img src='http://davidbcalhoun.com/wp-includes/images/smilies/icon_smile.gif' alt=':)' class='wp-smiley' /> 

### Related

Just a heads up &#8211; I&#8217;m definitely not the first one to figure this out, as I found a [jsfiddle][6] with the same information, plus an example for posting to Twitter. That was surprisingly the only result! I couldn&#8217;t find anyone who blogged about it yet, so here you are!

[More URI schemes for other launching other native apps][7]

 [1]: http://wiki.akosma.com/IPhone_URL_Schemes#Facebook
 [2]: http://stackoverflow.com/questions/5707722/what-are-all-the-custom-url-schemes-supported-by-the-facebook-iphone-app/
 [3]: http://stackoverflow.com/questions/9077817/open-facebook-app-with-text-from-ipad-app
 [4]: http://stackoverflow.com/questions/7231085/how-to-fall-back-to-marketplace-when-android-custom-url-scheme-not-handled
 [5]: http://mobile.tutsplus.com/tutorials/iphone/ios-sdk-working-with-url-schemes/
 [6]: http://jsfiddle.net/ThinkingStiff/dpUKh/
 [7]: http://wiki.akosma.com/IPhone_URL_Schemes