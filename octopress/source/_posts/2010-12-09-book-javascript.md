---
title: 'Book: JavaScript'
date: 2010-12-09
comments: true
author: David
layout: post
permalink: /2010/book-javascript
categories: ["javascript", "programming", "webdev"]
draft: true
---

(Note: This was going to be where I was keeping notes to eventually write a book.  Needless to say, there's not much here and the book never happened!)

### Functions

#### Parenthesis and function execution

Parenthesis kick off the execution of a function:

<pre name="code" class="JScript">function foo() {
	return true;
}

typeof foo;    // "function"
typeof foo();  // "boolean"
</pre>

Both of these are related to the function we just defined, but notice that a function reference without parenthesis is simply a pointer to the function and nothing more. The function with parenthesis executes our function and returns a result (true, which is of type &#8220;boolean&#8221;). We can assign these to variables:

<pre name="code" class="JScript">var myFunction = foo;  // store the function pointer
var myResult = foo();  // store the result of executing the function

typeof myFunction;     // "function"
typeof myResult;       // "boolean"
</pre>

#### Passing parameters

-params  
-passing objects

#### Self-executing anonymous functions

A self-executing anonymous function is an unnamed function that&#8217;s simply executed immediately after being defined. Here&#8217;s an example:

<pre name="code" class="JScript">(function(){})();
</pre>

Just as above, we can pass in parameters:

<pre name="code" class="JScript">(function(param){
	param;  // "foo"
})('foo');
</pre>

Why on earth would you want to use this? As it turns out, this is a nice way to sandbox your code and is preferred to simply declaring code out in the open. Have a look at the difference:

<pre name="code" class="JScript">// Old way (antipattern!)
var foo = 'bar';
console.log(foo);

// New way (sandboxed)
(function(){
	var foo = 'bar';
	console.log(foo);
})();
</pre>

These two methods run the same code and achieve the same end, but the second example is sandboxed because we say it has &#8220;functional scope&#8221; and not &#8220;global scope&#8221;.

#### Scope

#### Function declaration vs. function literal

#### Function hoisting

#### The DOM

&#8230;