---
title: Basic HTML5 template
date: 2010-09-08
comments: true
author: David
layout: post
permalink: /2010/basic-html5-template
categories: ["html", "html5", "webdev"]
---
### Introduction

Often times I end up creating short pages for testing short pieces of code, and I only need a very basic HTML template to write in. Short of using [HTML5 Boilerplate][1], I just use a quick piece of code like the following. (note: yes, this has issues in IE, so you may want to use [HTML5 Shiv/Shim][2])

### The code

<pre name="code" class="html">&lt;!doctype html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;meta charset="utf-8"/&gt;
  &lt;title&gt;&lt;/title&gt;

  &lt;meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/&gt;
  &lt;link rel="stylesheet" href=""/&gt;
&lt;/head&gt;

&lt;body&gt;
  &lt;header&gt;
  &lt;/header&gt;

  &lt;div&gt;
  &lt;/div&gt;

  &lt;footer&gt;
  &lt;/footer&gt;

  &lt;script src=""&gt;&lt;/script&gt;
&lt;/body&gt;

&lt;/html&gt;
</pre>

Edit: Self-closed tags for compatibility.  
Edit2: removed type=&#8221;text/css&#8221; from the link tag

 [1]: http://html5boilerplate.com/
 [2]: http://remysharp.com/2009/01/07/html5-enabling-script/