---
title: What is a closure in JavaScript?
date: 2011-01-03
comments: true
author: David
layout: post
permalink: /2011/what-is-a-closure-in-javascript
tags:
- javascript
- webdev
---

### Intro

There have been many attempts to answer this question in a succinct way, but I haven't really been satisfied by them. Here's my attempt at a (relatively) concise explanation.

This is adapted from a [reply I posted on reddit][1] which people seemed to have found useful.

### Broad definition

Normally when people talk about closures in JavaScript, they're talking about methods and properties that outlive the scope of their original function (more on that in a second), but actually the definition is a bit broader. A closure is how a function "closes over" (Crockford) its variables and creates a different scope for them out of the way of the global [window] scope. So an understanding of closures will require some understanding of scope, which is definitely a common stumbling block in first learning JavaScript.

Essentially, closures make this possible:

```js
var a = 1;
function(){
  var a = 2;
  a; // 2 (functional scope)
};
a;  // 1 (global scope)
```

### Variables that survive after function execution

But when people get excited about closures, they're not really talking about the example above, but about the ability for functional variables to outlive their original functional scope:

```js
var b = function() {
  var myPrivateVar = 'Foo';
  var myPublicVar = 'Bar';

  return myPublicVar;
};

b();  // 'Bar'
myPrivateVar;  // ERROR (not defined, because it was only defined in functional scope and is trying to be accessed from the global [window] scope)
myPublicVar;   // ERROR (not defined)
```

But note that the original method name (myPublicVar) isn't available - but the value IS available from what we exposed to the global scope through the variable &#8216;b'.

### Closures and the Module Pattern

How is this useful? This turns out to be the foundation for the Module Pattern in JavaScript - the building block of modern JavaScript applications. They're in essence a glorified version of the block of code above, with the purpose of hiding the function's private variables (this comes by default when declaring variables with the &#8216;var' keyword in functions), and exposing public variables. And note that because functions are first class in JavaScript, those variables can even be references to functions themselves!

So in essence this is the module pattern, with both private and public properties and methods:

```js
var myAPI = (function() {
  var privateProperty = 'Foo';
  var publicProperty = 'Bar';

  var privateMethod = function() {
    alert('I can only be executed from the scope of myAPI');
  };

  var publicMethod = function() {
    alert('I am publicly accessible (through the global scope) because a reference to publicMethod is returned by myAPI');
  };

  // set up an object whose own property names (on the left) match the references to the internal, functionally-scoped methods (on the right)
  var publicStuff = {
    publicProperty: publicProperty,
    publicMethod: publicMethod
  };

  // return our public object (myAPI is now equal to this object)
  return publicStuff;
})();   // immediately execute myAPI as a function, which returns an object that contains pointers to stuff in myAPI, which is exposed through myAPI.x, myAPI.y, etc
```

By the time we reach the last line of the above script, the function has stopped executing, but some original pieces of the function still live on! Because some references to functional variables were returned by the function, we can now access these through the "namespace" myAPI:

```js
myAPI.publicProperty;  // 'Bar'
myAPI.publicMethod(); // (alert: 'I am publicly accessible'...)
```

But those variables that were not exposed are of course not accessible:

```js
myAPI.privateProperty;  // error (not defined)
myAPI.privateMethod(); // error (not defined)
```

### Access to unexposed variables

Exposed public methods still have the context of the original function, meaning that they have access to all the function's variables, public and private:

```js
var myAPI = (function(){
  var privateProperty = 'Foo';

  var publicFunction = function() {
    // this function has access to privateProperty because it's in the same scope, even after the main function stops executing!
    return privateProperty;
  };
  
  // create a new object and return it
  return {
    publicFunction: publicFunction
  };
})();

privateProperty;         // ERROR (not defined)
myAPI.publicFunction();  // 'Foo'
```

There's definitely more to be said here, but hopefully this helps!

 [1]: http://www.reddit.com/r/javascript/comments/eti86/can_somebody_explain_closures_to_me/c1atir1