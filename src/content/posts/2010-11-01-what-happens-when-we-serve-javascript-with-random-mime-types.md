---
title: What happens when we serve JavaScript with random MIME types?
date: 2010-11-01
comments: true
author: David
layout: post
permalink: /2010/what-happens-when-we-serve-javascript-with-random-mime-types
tags:
  - javascript
  - webdev
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

### Introduction

When people started to learn about the HTML5 doctype, they kind of freaked out a little, not knowing how older browsers would handle it. A [post by Dustin Diaz][1] prompted me to test out how pages rendered (in QuirksMode or Standards Mode) with a little help from `document.compatMode`, and [I found that surprisingly every browser rendered in Standards Mode with the new doctype][2]. In other words, no need to worry!

There's another welcome simplification ([along with others][3]): the "type" attribute is no longer necessary on script tags:

> The type attribute gives the language of the script or format of the data. If the attribute is present, its value must be a valid MIME type. The charset parameter must not be specified. **The default, which is used if the attribute is absent, is "text/javascript".** [-W3C HTML5 spec][4]

Which means that this is all that's required now:

```html
<script src="script.js"></script>
```

But how do older browsers handle this? Also, what if we send some crazy Content-Type back in the response header? To make matters more confusing, I noticed that different CDNs send back different Content-Types: [YUI][5] and [jQuery][6]&#8216;s CDNs send back "application/x-javascript" whereas [Google's CDN][7] serving jQuery sends back "text/javascript; charset=UTF-8&#8243;.

So does it really matter what the Content-Type is? Let's find out!

### Setting up the tests

The test is fairly simple: I have six JavaScript files that all write to the DOM when they're executed successfully. Each of these files has a different file extension (js.one, js.two, js.three, etc) and each is served with an extension determined by the .htaccess file, which is in the same directory, and contains this bit of magic:

```
AddType text/javascript .one
AddType application/x-javascript .two
AddType application/javascript .three
AddType text/ecmascript .four
AddType text/jscript .five
AddType text/foo .six
```

My index.html contains a little helper utility for each of these scripts to use:

```js
var TEST = {
  node: document.body,
  addMessage: function (message) {
    var p = document.createElement("p");
    p.innerHTML = message;
    this.node.appendChild(p);
  },
};
```

TEST.addMessage() is simply a glorified document.write. As each of the six scripts is run, they'll write out a message to the page essentially saying "I'm here! It worked!".

### Results

All the browsers I tested worked better than expected. It turns out that Content-Type doesn't even matter. I made up my own content type "text/foo", served the file successfully, and it still executed as JavaScript!

I tried all the major A-grade browsers (yes, including IE6-8), plus other random browsers through [Browsershots.org][8].

One thing I still need to try is IE9, which [Paul Irish said may not work][9]. I'll give it a test... soon.

### Additional test #1: playing with the "type" attribute

Instead of messing around with the MIME type sent back in the response header, what happens when we mess around with the "type" attribute on the script tag? For instance:

```html
<script type="text/foo"></script>
```

Using the same testing technique as above, I found these results to be more pronounced. Browsers were more picky. For instance, Chrome and Safari ran all the content types successfully except my made-up "text/foo". Firefox was even more picky, choosing not to recognize the type "text/jscript". I'd imagine there's similar results with other browsers such as IE.

...But none of that really matters now! Simply omit the type attribute and everything seems to work fine (except possibly not in IE9?).

### Additional test #2: content type and caching

[Philip Tellis][10] wanted to know if Content-Type had any bearing on how the browser caches data. For instance, if something previously requested has the same filename but a different content type, is there a cache hit (304 code returned) or miss?

In the first test I made a page that requested a file. Then in a not-too-fancy way I changed the content type through .htaccess on the fly and made another request. A 304 code was returned even with the new content type, so it was clear that this traditional caching method wasn't affected.

In my second test I instead changed the "type" attribute on the script tag itself (in the HTML). The file was still cached normally, even after the type changed.

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
