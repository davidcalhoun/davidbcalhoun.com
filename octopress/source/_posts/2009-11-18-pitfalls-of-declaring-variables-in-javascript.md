---
title: Pitfalls of declaring variables in JavaScript
date: 2009-11-18
comments: true
author: David
layout: post
permalink: /2009/pitfalls-of-declaring-variables-in-javascript
categories:
  - Uncategorized
tags:
  - javascript
---
### Introduction

One of the things that&#8217;s always been confusing to me is that there are multiple ways to declare variables in JavaScript, and some ways are better than others. For the beginner programmer, just getting to code to work means complete success, but for the intermediate or advanced programmer, this is just the first step. The next step is to clean up the code and make sure everything is written in the best way it could have been written.

Declaring variables seems like such a basic thing that one almost feels insulted reading about it. Yes, this whole post is about declaring variables. But not just this &#8211; it&#8217;s about declaring variables *the right way*. This means declaring variables in the scope they were intended to be declared in.  For the most part this means writing variables in the scope of a function, as opposed to the global namespace (in which everything becomes a property of the window object).

### Global variables can be declared in functions

When I was starting to learn JavaScript, I read about global and functional scope and *wrongly* assumed that functions *completely* protected the variables declared inside.  As it turns out, there&#8217;s many ways to create global variables in JavaScript, and none of them throw up red flags or sound off bells and whistles (unfortunately).

Here&#8217;s a few ways to create global variables in JavaScript:

<pre name="code" class="JScript">// Creating global variables outside of a function
window.global1 = 1;
global2 = 2;
var global3 = 3;

// Created global variables within a function
function test() {
    global4 = 4;
    window.global5 = 5;
};
test();</pre>

You can confirm this for yourself by checking the values of the variables with alert().

### Good practice: always precede variables with var

What I learned was that it was essentially good practice to always write variables preceded by the var keyword.  For variables declared outside of functions this has no effect &#8211; they are still global, but for variables within functions this ensures that they&#8217;re kept within their functional scope:

<pre name="code" class="JScript">var global = null;
function test() {
    var local = null;
}
test();</pre>

### Same name, but different variables

And check this out &#8211; confusingly, you can create a global variable, then create a variable with the *same name* that&#8217;s functionally-scoped, yet a completely different variable!

<pre name="code" class="JScript">var number = 0;

function test() {
    var number = 1;
}
test();

alert(number);  // 0</pre>

When you precede a variable with the var keyword, you&#8217;re essentially saying you&#8217;re creating the variable for the first time.  So when you create &#8220;number&#8221; inside the function, no error is thrown because the variable is created in the function&#8217;s scope.  If you try to create another variable with the name &#8220;number&#8221; inside the function, you will get an error because it&#8217;s already been defined within the scope.

### There&#8217;s no such thing as magical protective parenthesis

For some reason I was further mistaken into believing that extra parenthesis around an anonymous function magically protected *all* the variables within:

<pre name="code" class="JScript">(function() {
    global = null;
    var local = null;
})();</pre>

Nope &#8211; as you can see, the global variable is still global since it&#8217;s not preceded by the var keyword.  However, the local variable is local because it&#8217;s within its functional scope and preceded by the var keyword.

### Shorthand for declaring multiple functionally-scoped variables

The following code ensures each variable is functionally (locally) scoped, even though only the first variable is preceded by the var keyword:

<pre name="code" class="JScript">// shorthand #1
function test() {
    var local1 = null,
        local2 = null;
}
test();

// shorthand #2
function test2() {
    var local1, local2;  // these are of type 'undefined' but they have functional scope!
}
test2();
</pre>

### Multiple variable declaration equivalence gives different scope to each variable

Today I learned another way to mistakenly create a global variable.  Trying to be fancy and declare multiple variables to be the same value, I mistakenly created a global variable (again, no bells and whistles went off to warn me, unfortunately):

<pre name="code" class="JScript">function test() {
    var local = global = null;
}
test();</pre>

This sets both variables to &#8220;null&#8221; using the shortest code possible, but unfortunately only the variable &#8220;local&#8221; is preceded by the var keyword, so only that variable will be in its proper functional scope. Variable &#8220;global&#8221;, on the other hand, is&#8230; well&#8230; global. (thanks to [Crescent Fish][1])

You learn something new every day&#8230;

### Update 1

If you want to check your code for &#8220;accidental global variables&#8221; you can use [JSLint][2] or you can even use Firebug (click on the Script tab, then click on &#8220;New watch expression&#8230;&#8221;, then type &#8220;window&#8221;, which will display all the properties of the window object &#8211; these are all global variables!). Thanks to Nick for the Firebug tip.

### Update 2

Just another quick note to remind you that after a variable has been initially declared, the scope will not change. Which is why you can redefine variables, but have them keep their scope:

<pre name="code" class="JScript">function test() {
    var local = null;
    local = 5;    // still keeps its local/functional scope
}
test();</pre>

As you can see above, the variable &#8220;local&#8221; keeps its local scope, even though it&#8217;s redefined to be 5. This is one of the reasons it&#8217;s recommended to declare all variables at the start of a function &#8211; to make sure the scope gets set correctly.

One final note: var should only be used when declaring a variable for the first time. If you try to use var for the same variable name in the same scope, it will result in an error:

<pre name="code" class="JScript">function test() {
    var local = null;
    var local = 5;    // throws an error!
}
test();</pre>

### Update 3: Graphical representation

<div id="attachment_115" style="width: 710px" class="wp-caption alignleft">
  <a href="http://davidbcalhoun.com/wp-content/uploads/2009/11/js-scope.png"><img src="http://davidbcalhoun.com/wp-content/uploads/2009/11/js-scope.png" alt="Scope in JavaScript" title="Scope in JavaScript" width="700" class="size-full wp-image-115" /></a><p class="wp-caption-text">
    Scope in JavaScript
  </p>
</div>

 [1]: http://stackoverflow.com/questions/1758576/multiple-left-hand-assignment-with-javascript/1758912#1758912
 [2]: http://www.jslint.com/