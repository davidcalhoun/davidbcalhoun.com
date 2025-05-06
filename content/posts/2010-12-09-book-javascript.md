---
title: "Book: JavaScript"
date: 2010-12-09
comments: true
author: David
layout: post
permalink: /2010/book-javascript
tags:
  - javascript
  - programming
  - webdev
draft: true
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

(Note: This was going to be where I was keeping notes to eventually write a book. Needless to say, there's not much here and the book never happened!)

### Functions

#### Parenthesis and function execution

Parenthesis kick off the execution of a function:

```js
function foo() {
  return true;
}

typeof foo; // "function"
typeof foo(); // "boolean"
```

Both of these are related to the function we just defined, but notice that a function reference without parenthesis is simply a pointer to the function and nothing more. The function with parenthesis executes our function and returns a result (true, which is of type "boolean"). We can assign these to variables:

```js
var myFunction = foo; // store the function pointer
var myResult = foo(); // store the result of executing the function

typeof myFunction; // "function"
typeof myResult; // "boolean"
```

#### Passing parameters

-params  
-passing objects

#### Self-executing anonymous functions

A self-executing anonymous function is an unnamed function that's simply executed immediately after being defined. Here's an example:

```js
(function () {})();
```

Just as above, we can pass in parameters:

```js
(function (param) {
  param; // "foo"
})("foo");
```

Why on earth would you want to use this? As it turns out, this is a nice way to sandbox your code and is preferred to simply declaring code out in the open. Have a look at the difference:

```js
// Old way (antipattern!)
var foo = "bar";
console.log(foo);

// New way (sandboxed)
(function () {
  var foo = "bar";
  console.log(foo);
})();
```

These two methods run the same code and achieve the same end, but the second example is sandboxed because we say it has "functional scope" and not "global scope".

#### Scope

#### Function declaration vs. function literal

#### Function hoisting

#### The DOM

...
