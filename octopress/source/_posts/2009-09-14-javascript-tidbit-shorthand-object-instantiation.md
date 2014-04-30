---
title: 'JavaScript Tidbit: Shorthand Object Instantiation'
date: 2009-09-14
comments: true
author: David
layout: post
permalink: /2009/javascript-tidbit-shorthand-object-instantiation
categories:
  - Uncategorized
tags:
  - javascript
  - john resig
  - OO
---
The skinny: here&#8217;s a neat little trick to reduce the amount of code users have to type to instantiate objects:

    function jQuery(str, con){
        if ( window == this )
            return new jQuery(str, con);
        // ...
    }

    new jQuery("#foo"); // this is now equivalent...
    jQuery("#foo");     // ...to this!
{:lang="js"}

Explanation: when jQuery(&#8220;#foo&#8221;) is typed, the function first determines if the context in which it&#8217;s being called is the global object (window).  If it is, it returns an instantiation of itself.  When it&#8217;s instantiated, the context in which it&#8217;s being called is inside its own function, and NOT within the global object (window), thus it bypasses our little instantiation trick and moves on to execute any remaining code in the function.

From John Resig&#8217;s [Best Practices in Javascript Library Design][1]

 [1]: http://www.youtube.com/watch?v=0LKDImgRfrg#t=32m2s