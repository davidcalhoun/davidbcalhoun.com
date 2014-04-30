---
title: The incredibly painful way of getting an RSS feed of a Twitter list
date: 2011-06-05
comments: true
author: David
layout: post
permalink: /2011/the-incredibly-painful-way-of-getting-an-rss-feed-of-a-twitter-list
categories:
  - Uncategorized
---
(why does Twitter make it so hard? What did RSS ever do to it?)

### The skinny

The Twitter API appears to support two methods for getting RSS feeds of lists. Both of these methods are pretty buried and their API docs don&#8217;t help too much, but nonetheless both of these feeds work:

> <http://api.twitter.com/1/nathansmith/lists/javascript/statuses.atom>

If you have the list ID (requires using some dev tools &#8211; see below), you can also use this format:

> <http://api.twitter.com/1/lists/statuses.atom?list_id=41981352>

### The explanation

As it turns out, getting an RSS feed of a Twitter list is no easy task, at least from what I&#8217;ve found. Twitter has largely replaced RSS for me, in terms of getting the latest and greatest information, and maybe Twitter wants to keep it that way by having me rely on their service instead of an RSS feed. That&#8217;s how it seems to me anyway (this is also evidenced by their [killing off of making RSS feeds easily discoverable][1] but still making the feed available as long as you can figure out your Twitter user id (which is a task in itself), for instance here&#8217;s my RSS feed: <https://twitter.com/statuses/user_timeline/16521889.rss>). I&#8217;d say this is simply a conspiracy against RSS feeds and developers in general, which is the direction Twitter is headed these days.

In any case, I digress! I want to get an RSS feed of a Twitter list. Great! All I should have to do is go to the page of the list and subscribe to the RSS feed. But.. there&#8217;s no RSS feed. Hmm.

### Google is your friend&#8230; most of the time

A search for &#8220;twitter list rss&#8221; comes up with links to implementing an RSS feed via Yahoo Pipes as well as pages referring to an appspot service that now 404s ([twiterlist2rss][2]). In any case, they are both not what I&#8217;m looking for. Which means I have to get creative. Which means&#8230; my options at this point are screen scraping (made harder by the fact that Twitter content is now served with JavaScript) or.. gasp.. using their API!

### Twitter REST API to the rescue

After digging through the API docs, I found just the page I was looking for, [detailing the REST service for Twitter lists][3].

As it turns out, the basic structure for requesting list data is as follows:

> http://api.twitter.com/version/lists/statuses.format

As a newbie Twitter developer, there were a couple of things wrong here. First, what&#8217;s the version of the API I&#8217;m supposed to use? From other examples on the web (outside of the documentation&#8230;) I just assumed I&#8217;d be using version 1, and that seemed to work. Ok, whatever, we&#8217;ll go with 1:

> http://api.twitter.com/1/lists/statuses.format

Second step: this API is actually quite nice, and will return data in three different formats: xml, json, or atom (RSS!). Ok, now we&#8217;re making progress!

> http://api.twitter.com/1/lists/statuses.atom

### Where&#8217;s this list_id you speak of?

Now to pass in the info &#8211; I need to pass in the list ID in a key called &#8220;list_id&#8221;. The only problem is&#8230; where do I find the list ID? For the purposes of this example I&#8217;ll use [Nathan Smith&#8217;s excellent JavaScript developers list][4]. To normal human beings, this list might be called &#8220;nathansmith/javascript&#8221;, but a Twitter ID is numerical, so that&#8217;s not what we&#8217;re looking for.

So.. I assume at this point I can use some of the Twitter developer tools and fiddle around with them until I find an API call that will translate the human-readable list name into a numerical ID. But no.. I don&#8217;t want to download anything, I don&#8217;t want to investigate more of the API or go down any more rabbit holes.

It&#8217;s time to cut this rabbit hole short and do a bit of investigating. So I pulled up the list, opened up Web Inspector in Chrome, and took a look at the Network tab in the hopes of seeing an API call with an ID I was looking for&#8230;

&#8230;And I found it! Somewhere down the line, Twitter was calling statuses.json with this request:

> https://api.twitter.com/1/lists/statuses.json?list\_id=41981352&#038;include\_entities=1&#038;include\_available\_features=1&#038;contributor_details=true

There&#8217;s our list_id (and incidentally, the same API call [with json instead of atom].. which shows that Web Inspector is more useful than API docs sometimes)! After a short copy-paste, all the pieces of my Frankenstein API call have been put together:

> <http://api.twitter.com/1/lists/statuses.atom?list_id=41981352>

And it works, without having to mess around with OAuth or authentication, registering an app, or whatever. Of course now we can refer back to the API docs and mess around with some parameters to get just the data I&#8217;m looking for. Maybe most useful to developers is the handy ability to get easily paginated results:

> <http://api.twitter.com/1/lists/statuses.atom?list_id=41981352&#038;page=2>

There&#8217;s also what would be a handy &#8220;count&#8221; variable, but it&#8217;s altogether useless as it appears to be ignored. The API always returned 20 results for me.

In any case, there you have it! The incredibly roundabout way to get an RSS feed of your favorite Twitter list.

### **UPDATE**

Thanks to [this site][5], it looks like there&#8217;s a more straightforward way of getting the RSS feed. Using the same list we were trying to get above, it looks like this also works:

> http://api.twitter.com/1/nathansmith/lists/javascript/statuses.atom

 [1]: https://support.twitter.com/groups/31-twitter-basics/topics/111-features/articles/15361-how-to-find-your-rss-feed
 [2]: http://twiterlist2rss.appspot.com/
 [3]: http://dev.twitter.com/doc/get/lists/statuses
 [4]: https://twitter.com/#!/nathansmith/javascript
 [5]: http://sociable.co/2011/05/05/as-twitter-protects-its-ecosystem-heres-how-to-create-an-rss-feed-of-a-twitter-list/