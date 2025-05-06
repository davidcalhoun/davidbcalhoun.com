---
title: Checking for undefined, null, and empty variables in JavaScript
date: 2011-02-11
comments: true
author: David
layout: post
permalink: /2011/checking-for-undefined-null-and-empty-variables-in-javascript
tags:
  - javascript
  - webdev
  - programming
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

In general it's a good practice to check for the existence of something before blindly using it by faith and hoping it works. There are various times during the execution of scripts when a variable may not be defined, it may be null, or it might be an empty string. These are three things that are easily conflated. A good way to look at this is thinking of these as having increasing levels of existence (getting a bit philosophical here for a moment...):

```javascript
foo0; // existence level 0 (creates the error "not defined")
var foo1; // existence level 1 ("undefined" - variable declared but not defined/initialized)
var foo2 = null; // existence level 2 (variable initialized, but isn't an Object, Number, String, etc)
var foo3 = ""; // existence level 3 (variable initialized to an empty String)
var foo4 = "bar"; // existence level 4 (variable initialized to String "foo")
```

Generally it would be handy if we had some way to filter out everything but the very last line. We simply want to check for these cases without the script entirely blowing up, as it does with the first line:

```javascript
foo; // ReferenceError: foo is not defined
```

We're not particularly doing anything useful with foo here, but notice that the script fails out anyway. At this point any code that follows will not be executed. Your first instinct might be "Oh! I know how to contain these errors! We'll use a try-catch!":

```javascript
try {
  foo;
} catch (e) {
  e.message; // "foo is not defined"
}
```

The script still fails, but not critically, so your script continues to execute. But this turns out to aversely affect performance. The basic lesson here is that try-catch can be useful in some situations, but shouldn't be used where alternatives are available.

### typeof foo

JavaScript has quite a useful remedy for this:

```javascript
typeof foo; // "undefined"
```

Unlike everything else in JavaScript, typeof will deal with whatever you throw at it, including undefined variables. So you can use it as a simple check before using a variable that might not exist:

```javascript
if (typeof foo !== "undefined") {
  // do something with foo
}
```

Note that this is easy to confuse with the `undefined` keyword, which in this case doesn't help us one bit, as it gives us a fatal error:

```javascript
if (foo !== undefined) {
  // ReferenceError: foo is not defined
}
```

This filters out our first two cases, since they both evaluate to "undefined":

```javascript
typeof foo; // "undefined"

var bar;
typeof bar; // "undefined"
```

But this turns out not to work well for our other conditions, which evaluate differently:

```javascript
typeof null; // "object" (what?!)
typeof ""; // "string"
```

So we need to add other "if" conditions to check.. but there turns out to be a better way!

### Exploiting loose typing

JavaScript is a loosely typed language, which means that it will "automagically" cast variables into other types when necessary (i.e. when adding a Number to a String), sometimes resulting in the unexpected. For instance, whenever we use the "if" statement, the expected input is a Boolean true/false value. If JavaScript gets anything other than a Boolean, such as a String or a Number, instead of blowing up completely (as in strictly typed languages such as C), it'll cast the variable into a Boolean for you.

"How handy!" you might think. Except in the following unexpected cases:

```javascript
if ("0") {
  // this will run because "0" is true
}

if ("false") {
  // this will run because "false" is true
}
```

To see what JavaScript will cast a value to without having to use an `if` statement, we could create a new Boolean value with the following:

```javascript
Boolean(0); // false
Boolean("0"); // true
```

Or we can use the less intuitive but quick way of using double exclamation marks (this will probably award you cleverness points in someone's book.. hopefully those points actually matter):

```javascript
!!0; // false
!!"0"; // true
```

This works because !foo converts foo to a Boolean but negates its original value, turning it on its head. !!foo converts foo to a Boolean and flips it back to its expected value, which is the same value that's evaluated by our `if` statement.

Using this ALMOST gives us the answer we're looking for:

```javascript
!!foo0; // ReferenceError: foo0 is not defined

var foo1;
!!foo1; // false

var foo2 = null;
!!foo2; // false (same as !!null)

var foo3 = "";
!!foo3; // false (same as !!"")

var foo4 = "bar";
!!foot4; // true (same as !!"bar")
```

Excluding the first example, now we can test for uninitialized variables (foo1), null variables (foo2), and empty strings (foo3) all with just an `if` statement:

```javascript
if (foo1) {
  // do something with foo1
}

if (foo2) {
  // do something with foo2
}

if (foo3) {
  // do something with foo3
}
```

Dang… so close! But we can't yet test the first case without an error:

```javascript
if (foo0) {
  // ReferenceError: foo0 is not defined
}
```

### foo versus window.foo and this.foo

The secret to our solution lies in how JavaScript handles undefined variables versus undefined properties. Here's a quick reminder on the difference between the two:

```javascript
// variable foo
var foo;

// property bar (and object variable foo)
var foo = {}; // create an empty object to add bar too
foo.bar = "";
```

The difference between these makes all the difference whether a fatal error occurs:

```javascript
foo; // ReferenceError: foo is not defined

var foo = {};
foo.bar; // undefined
foo.blah; // undefined
```

We can randomly invent and check any property of `foo` we want, and the code will keep chugging along:

```javascript
var foo = {};
foo.something = "hello";

if (foo.bar) {
  // undefined, interpreted as false (same as !!foo.bar)
  // never runs
}

if (foo.something) {
  foo.something; // "hello"
}
```

Now comes the magic. If you know anything about JavaScript running in the browser, you know that all global variables are part of the `window` object. This means `foo` and `window.foo` are equivalent:

```javascript
var foo;

foo === window.foo; // true

// "this" is another bag of worms, but note this anyway
this.foo === window.foo;
```

So technically our variable foo is a _property_ of the window object. So we should be able to check for any arbitrary variable in the window scope now!

```javascript
window.foo; // undefined (not a fatal error!)

// even though we're checking for the same thing, we get a fatal error…
foo; // ReferenceError: foo is not defined
```

### Practical uses

Now as long as we have a global entry point for our code, we can write our code in such a way that it won't ever give us a fatal error if our variables aren't yet defined:

```javascript
if (window.foo && foo.bar) {
  foo.bar();
}
```

Of course nothing happens, because we haven't defined foo. But why doesn't foo.bar give us a fatal error? Because the first test, `window.foo` failed out. It would be useless processing for the JavaScript engine to also evaluate the second statement, because the end result will still be the same (false && true results in false, false && false results in false). So it doesn't get so far as `foo.bar`.

And now the code will work properly when we hook up our code to our `foo` global namespace:

```javascript
var foo = {
  bar: function () {
    alert("hello world");
  },
};

if (window.foo && foo.bar) {
  foo.bar(); // "hello world"
}
```

### Shorthand

It's becoming common to see an abbreviation for the above code. Check out the following two methods, which accomplish the same thing:

```javascript
// Method 1
if (window.foo && foo.bar) {
  foo.bar(); // "hello world"
}

// Method 2
window.foo && foo.bar && foo.bar();
```

Don't get too scared.. these blocks of code are equivalent. Method 2 is shorter, but it simply goes something like this: if window.foo isn't set, stop evaluating this line (just as above in the `if` statement). Otherwise, if foo.bar exists then execute the code in parentheses, which gives us an alert ("hello world");

Just a word of caution about using Method 2: it's obviously less clear what's going on here. Your own cleverness might actually result in unnecessary confusion, especially of other people work in the same code base and they're at different levels of understanding. In these cases we should first strive to be clear, and then only clever if it's not at the expense of being clear.

It's also likely that a code minifier would take care of this cleverness for us at build time, giving us the best of both worlds.
