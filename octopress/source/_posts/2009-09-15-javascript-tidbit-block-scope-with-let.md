---
title: 'JavaScript Tidbit: Block scope with &#8220;let&#8221;'
date: 2009-09-15
comments: true
author: David
layout: post
permalink: /2009/javascript-tidbit-block-scope-with-let
categories:
  - Uncategorized
tags:
  - 1.7
  - block scope
  - javascript
  - let
---
JavaScript has **functional scope**. Meaning that if you (properly) define variables within functions, those variables remain accessible only inside the function.

**Block scope**, on the other hand, defines scope within a block of code, usually defined by braces. JavaScript now has block scope as of version 1.7, which means it&#8217;s available in these browsers:

*   Firefox 2+

Block scope is enabled in JavaScript with the use of &#8220;let&#8221;:

<pre name="code" class="JScript">let(x=100) {
    alert(x);
};</pre>

It also works perfectly well on one line, without the use of braces:

<pre name="code" class="JScript">let(x=100) alert(x);</pre>

Note that we can define global variables with the same name outside the block scope and the variables won&#8217;t interfere with each other:

<pre name="code" class="JScript">x = 200;
let(x=100) alert(x);
alert(x);
// result: 100, 200
</pre>

Note that there&#8217;s a slight caveat &#8211; not only is this not available in any version of IE, but it also requires a special script type declaration in order to work (at least for Firefox): **type=&#8221;text/javascript;version=1.7&#8243;**

References:  
[JavaScript Versions][1]  
[Video: Best Practices in Javascript Library Design (John Resig)][2]  
[New in JavaScript 1.7][3]

 [1]: http://en.wikipedia.org/wiki/JavaScript#Versions
 [2]: http://www.youtube.com/watch?v=0LKDImgRfrg#t=32m2s
 [3]: https://developer.mozilla.org/en/New_in_JavaScript_1.7