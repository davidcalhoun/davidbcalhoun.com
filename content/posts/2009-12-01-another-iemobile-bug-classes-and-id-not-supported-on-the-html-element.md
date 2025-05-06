---
title: 'IEMobile 6/7 bug: classes and id not supported on the HTML element'
date: 2009-12-01
comments: true
author: David
layout: post
aliases:
- /2009/another-iemobile-bug-classes-and-id-not-supported-on-the-html-element
categories: ["mobile", "webdev", "ie", "internet explorer", "webdev"]
---
As it turns out, IEMobile 6/7 (and presumably anything earlier) doesn&#8217;t support classes and ids that are attached to the HTML element. I confirmed this on both IEMobile 6 and 7. Fortunately it looks to be fixed in IEMobile 8 (which makes sense, since it works fine in desktop IE6, which it&#8217;s based on).

The consequence of this is that adding an id/class to the html tag will result in the style not being applied to the document:

<pre name="code" class="html">&lt;!doctype html&gt;
&lt;html id="a" class="b"&gt;
&lt;head&gt;
	&lt;title&gt;Cascade test&lt;/title&gt;
	
	&lt;style type="text/css" media="screen"&gt;
		#a span { color: red; }     /* style isn't applied in IEMobile 6/7 */
		.b span { color: yellow; }  /* style isn't applied in IEMobile 6/7 */
	&lt;/style&gt;
&lt;/head&gt;

&lt;body&gt;
&lt;span&gt;Testing 123&lt;/span&gt;
&lt;/body&gt;

&lt;/html&gt;</pre>