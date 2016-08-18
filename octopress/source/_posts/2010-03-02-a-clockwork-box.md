---
title: A Clockwork Box
date: 2010-03-02
comments: true
author: David
layout: post
permalink: /2010/a-clockwork-box
categories: ["css", "webdev"]
tags:
  - box model
  - css
---
<div class="intro">
  <img src="http://davidbcalhoun.com/wp-content/uploads/2010/03/clockwork-box.png" alt="Clockwork Orange cover" title="Clockwork Orange cover" width="450" height="320" class="left alignleft size-full wp-image-174" /> <div>
    With CSS there are always various ways to accomplish something. After reading this short tidbit, you should be familiar with the various ways of controlling the size of an element&#8217;s padding, border, and margin, and you should know what the handy &#8220;clockwork&#8221; tip is, and how it will be useful to remember when you&#8217;re putting your CSS into practice.
  </div>
</div>

### Equal values on all four sides

If all four values (top, right, bottom, and left) are equal, then you simply write the following:

<pre name="code" class="css">padding: 1px;
border-width: 1px;
margin: 1px;
</pre>

### The longhand way

If you don&#8217;t want equal values on all four sides, then you can specify each side individually:

<pre name="code" class="css">padding-top: 1px;
padding-right: 2px;
padding-bottom: 3px;
padding-left: 4px;

border-top-width: 1px;
border-right-width: 2px;
border-bottom-width: 3px;
border-left-width: 4px;

margin-top: 1px;
margin-right: 2px;
margin-bottom: 3px;
margin-left: 4px;
</pre>

### The shortcut (like clockwork)

However this seems to be quite a hassle typing out each property, so you&#8217;ll find it&#8217;s much easier to use the following shorthand, which is in this order: top, right, bottom, left (think of the hands going clockwise around a clock). The following is equivalent to the above code:

<pre name="code" class="css">padding: 1px 2px 3px 4px;
border-width: 1px 2px 3px 4px;
margin: 1px 2px 3px 4px;
</pre>

### Other shorthands

This is the style I find myself writing in most often, but there are two other shorthand styles you should be aware of:

<pre name="code" class="css">padding: 1px 2px 3px;  /* top, left/right, bottom */
padding: 1px 2px;      /* top/bottom, left/right */
</pre>

### Summary

In short, there are various ways to define the padding, border, and margin on an element. Here&#8217;s a recap, with padding used as an example:

<pre name="code" class="css">padding: 1px;              /* 1 value: top/right/bottom/left     */
padding: 1px 2px;          /* 2 values: top/bottom, left/right   */
padding: 1px 2px 3px;      /* 3 values: top, left/right, bottom  */
padding: 1px 2px 3px 4px;  /* 4 values: top, right, bottom, left */
</pre>