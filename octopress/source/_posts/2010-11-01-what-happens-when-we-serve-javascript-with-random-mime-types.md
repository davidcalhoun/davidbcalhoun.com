---
title: What happens when we serve JavaScript with random MIME types?
date: 2010-11-01
comments: true
author: David
layout: post
permalink: /2010/what-happens-when-we-serve-javascript-with-random-mime-types
categories:
  - javascript
---
### Introduction

When people started to learn about the HTML5 doctype, they kind of freaked out a little, not knowing how older browsers would handle it. A [post by Dustin Diaz][1] prompted me to test out how pages rendered (in QuirksMode or Standards Mode) with a little help from

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          document.compatMode
        </div>
      </td>
    </tr>
  </table>
</div>

, and [I found that surprisingly every browser rendered in Standards Mode with the new doctype][2]. In other words, no need to worry!

There&#8217;s another welcome simplification ([along with others][3]): the &#8220;type&#8221; attribute is no longer necessary on script tags:

> The type attribute gives the language of the script or format of the data. If the attribute is present, its value must be a valid MIME type. The charset parameter must not be specified. **The default, which is used if the attribute is absent, is &#8220;text/javascript&#8221;.** [-W3C HTML5 spec][4]

Which means that this is all that&#8217;s required now:

<pre name="code" class="html">&lt;script src="script.js"&gt;&lt;/script&gt;
</pre>

But how do older browsers handle this? Also, what if we send some crazy Content-Type back in the response header? To make matters more confusing, I noticed that different CDNs send back different Content-Types: [YUI][5] and [jQuery][6]&#8216;s CDNs send back &#8220;application/x-javascript&#8221; whereas [Google&#8217;s CDN][7] serving jQuery sends back &#8220;text/javascript; charset=UTF-8&#8243;.

So does it really matter what the Content-Type is? Let&#8217;s find out!

### Setting up the tests

The test is fairly simple: I have six JavaScript files that all write to the DOM when they&#8217;re executed successfully. Each of these files has a different file extension (js.one, js.two, js.three, etc) and each is served with an extension determined by the .htaccess file, which is in the same directory, and contains this bit of magic:

<pre>AddType text/javascript .one
AddType application/x-javascript .two
AddType application/javascript .three
AddType text/ecmascript .four
AddType text/jscript .five
AddType text/foo .six
</pre>

My index.html contains a little helper utility for each of these scripts to use:

<pre name="code" class="JScript">var TEST = {
  node: document.body,
  addMessage: function(message) {
    var p = document.createElement('p');
    p.innerHTML = message;
    this.node.appendChild(p);
  }
}
</pre>

TEST.addMessage() is simply a glorified document.write. As each of the six scripts is run, they&#8217;ll write out a message to the page essentially saying &#8220;I&#8217;m here! It worked!&#8221;.

### Results

All the browsers I tested worked better than expected. It turns out that Content-Type doesn&#8217;t even matter. I made up my own content type &#8220;text/foo&#8221;, served the file successfully, and it still executed as JavaScript!

I tried all the major A-grade browsers (yes, including IE6-8), plus other random browsers through [Browsershots.org][8].

One thing I still need to try is IE9, which [Paul Irish said may not work][9]. I&#8217;ll give it a test&#8230; soon.

### Additional test #1: playing with the &#8220;type&#8221; attribute

Instead of messing around with the MIME type sent back in the response header, what happens when we mess around with the &#8220;type&#8221; attribute on the script tag? For instance:

<pre name="code" class="HTML">&lt;script type="text/foo"&gt;&lt;/script&gt;
</pre>

Using the same testing technique as above, I found these results to be more pronounced. Browsers were more picky. For instance, Chrome and Safari ran all the content types successfully except my made-up &#8220;text/foo&#8221;. Firefox was even more picky, choosing not to recognize the type &#8220;text/jscript&#8221;. I&#8217;d imagine there&#8217;s similar results with other browsers such as IE.

&#8230;But none of that really matters now! Simply omit the type attribute and everything seems to work fine (except possibly not in IE9?).

### Additional test #2: content type and caching

[Philip Tellis][10] wanted to know if Content-Type had any bearing on how the browser caches data. For instance, if something previously requested has the same filename but a different content type, is there a cache hit (304 code returned) or miss?

In the first test I made a page that requested a file. Then in a not-too-fancy way I changed the content type through .htaccess on the fly and made another request. A 304 code was returned even with the new content type, so it was clear that this traditional caching method wasn&#8217;t affected.

In my second test I instead changed the &#8220;type&#8221; attribute on the script tag itself (in the HTML). The file was still cached normally, even after the type changed.

I only tested in Chrome, Safari, and Firefox, so the story might be different in IE. Anyhow, this is an edge case anyway and more of a test out of curiosity! It seems the way browsers handle caching in these instances is truly RESTful, that is, the current state of the file is determined entirely by the filename.

 [1]: http://www.dustindiaz.com/skinny-on-doctypes/
 [2]: http://themaingate.net/dev/html/all-you-need-is-doctype-html
 [3]: http://davidbcalhoun.com/2010/top-ten-things-html5-makes-simpler
 [4]: http://dev.w3.org/html5/spec/Overview.html#script
 [5]: http://yui.yahooapis.com/3.2.0/build/yui/yui-min.js
 [6]: http://code.jquery.com/jquery-1.4.3.min.js
 [7]: https://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
 [8]: http://browsershots.org/
 [9]: http://twitter.com/#!/paul_irish/status/29416115232
 [10]: http://twitter.com/#!/bluesmoon/status/29418676869