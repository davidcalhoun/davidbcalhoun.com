---
title: 'JavaScript tidbit: special variables ($, $$, _, etc)'
date: 2009-12-08
comments: true
author: David
layout: post
permalink: /2009/javascript-tidbit-special-variables-_-etc
categories:
  - javascript
tags:
  - $
  - $$
  - javascript
  - jQuery
  - _
---
You&#8217;re probably used to typical variables names such as the following:

<pre name="code" class="JScript">var personName = 'Joe';</pre>

You may not realize it, but there are some non-alphanumeric variables at your disposal.

### Using $

For instance, the $ variable has been made popular by several JavaScript libraries, most notably [jQuery][1]. You can use it to alias operations that are commonly performed, such as the following (1):

<pre name="code" class="JScript">var $ = document.getElementById;
var myElement = $('targetElement');</pre>

If you declare this variable outside of a function it will be a global variable and will compete with libraries that use the same global variable, so it&#8217;s probably best not to use it.

Interestingly, originally the dollar sign $ was originally intended for &#8220;mechanically generated code&#8221; (2), but as the usage of the symbol has become popular for other purposes, it looks like [the latest version of JavaScript (ECMAScript 5th edition) now officially &#8220;oks&#8221; its use][2]:

> This standard specifies specific character additions: The dollar sign ($) and the underscore (_) are permitted anywhere in an IdentifierName.

### Using $$

Some have come up with the solution of simply using two or more $$ symbols in order to distinguish the variable from libraries that just use a single $:

<pre name="code" class="JScript">var $$ = document.getElementById;
var myElement = $$('targetElement');</pre>

### Using _

You will find that you can use the underscore _ in the same way to alias variables and functions:

<pre name="code" class="JScript">var _ = document.getElementById;
var myElement = _('targetElement');</pre>

### Other symbols

If you&#8217;re really getting adventurous, you can even try using other symbols such as square root √, which seems to work just fine, just as $ and _ above. The only problem: it&#8217;s quite inconvenient using it, since it&#8217;s not available on any keyboards (except through some crazy key combinations perhaps).

Or you can put the symbol to use doing what you would naturally think it should do&#8230;

<pre name="code" class="JScript">var √ = Math.sqrt;
alert(√(4));   // 2</pre>

### References

(1) [Even Faster Web Sites][3], p. 128  
(2) [Stackoverflow: Why would a javascript variable start with a dollar sign?][4]

 [1]: http://jquery.com/
 [2]: http://www.ecma-international.org/publications/standards/Ecma-262.htm
 [3]: http://www.amazon.com/Even-Faster-Web-Sites-Performance/dp/0596522304
 [4]: http://stackoverflow.com/questions/205853/why-would-a-javascript-variable-start-with-a-dollar-sign