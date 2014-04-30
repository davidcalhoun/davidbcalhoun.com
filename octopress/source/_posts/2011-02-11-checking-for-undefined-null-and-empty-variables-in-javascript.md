---
title: Checking for undefined, null, and empty variables in JavaScript
date: 2011-02-11
comments: true
author: David
layout: post
permalink: /2011/checking-for-undefined-null-and-empty-variables-in-javascript
categories:
  - javascript
---
In general it&#8217;s a good practice to check for the existence of something before blindly using it by faith and hoping it works. There are various times during the execution of scripts when a variable may not be defined, it may be null, or it might be an empty string. These are three things that are easily conflated. A good way to look at this is thinking of these as having increasing levels of existence (getting a bit philosophical here for a moment&#8230;):

<pre name="code" class="JScript">foo0;             // existence level 0 (creates the error "not defined")
var foo1;         // existence level 1 ("undefined" - variable declared but not defined/initialized)
var foo2 = null;  // existence level 2 (variable initialized, but isn't an Object, Number, String, etc)
var foo3 = "";    // existence level 3 (variable initialized to an empty String)
var foo4 = "bar"; // existence level 4 (variable initialized to String "foo")
</pre>

Generally it would be handy if we had some way to filter out everything but the very last line. We simply want to check for these cases without the script entirely blowing up, as it does with the first line:

<pre name="code" class="JScript">foo;  // ReferenceError: foo is not defined
</pre>

We&#8217;re not particularly doing anything useful with foo here, but notice that the script fails out anyway. At this point any code that follows will not be executed. Your first instinct might be &#8220;Oh! I know how to contain these errors! We&#8217;ll use a try-catch!&#8221;:

<pre name="code" class="JScript">try {
  foo;
} catch(e) {
  e.message;  // "foo is not defined"
}
</pre>

The script still fails, but not critically, so your script continues to execute. But this turns out to aversely affect performance. The basic lesson here is that try-catch can be useful in some situations, but shouldn&#8217;t be used where alternatives are available.

### typeof foo

JavaScript has quite a useful remedy for this:

<pre name="code" class="JScript">typeof foo; // "undefined"
</pre>

Unlike everything else in JavaScript, typeof will deal with whatever you throw at it, including undefined variables. So you can use it as a simple check before using a variable that might not exist:

<pre name="code" class="JScript">if(typeof foo !== "undefined") {
  // do something with foo
}
</pre>

Note that this is easy to confuse with the

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          undefined
        </div>
      </td>
    </tr>
  </table>
</div>

keyword, which in this case doesn&#8217;t help us one bit, as it gives us a fatal error:

<pre name="code" class="JScript">if(foo !== undefined) {  // ReferenceError: foo is not defined

}
</pre>

This filters out our first two cases, since they both evaluate to &#8220;undefined&#8221;:

<pre name="code" class="JScript">typeof foo; // "undefined"

var bar;
typeof bar; // "undefined"
</pre>

But this turns out not to work well for our other conditions, which evaluate differently:

<pre name="code" class="JScript">typeof null;  // "object" (what?!)
typeof "";    // "string"
</pre>

So we need to add other &#8220;if&#8221; conditions to check.. but there turns out to be a better way!

### Exploiting loose typing

JavaScript is a loosely typed language, which means that it will &#8220;automagically&#8221; cast variables into other types when necessary (i.e. when adding a Number to a String), sometimes resulting in the unexpected. For instance, whenever we use the &#8220;if&#8221; statement, the expected input is a Boolean true/false value. If JavaScript gets anything other than a Boolean, such as a String or a Number, instead of blowing up completely (as in strictly typed languages such as C), it&#8217;ll cast the variable into a Boolean for you.

&#8220;How handy!&#8221; you might think. Except in the following unexpected cases:

<pre name="code" class="JScript">if("0") {
  // this will run because "0" is true
}

if("false") {
  // this will run because "false" is true
}
</pre>

To see what JavaScript will cast a value to without having to use an

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          if
        </div>
      </td>
    </tr>
  </table>
</div>

statement, we could create a new Boolean value with the following:

<pre name="code" class="JScript">Boolean(0);    // false
Boolean("0");  // true
</pre>

Or we can use the less intuitive but quick way of using double exclamation marks (this will probably award you cleverness points in someone&#8217;s book.. hopefully those points actually matter):

<pre name="code" class="JScript">!!0;    // false
!!"0";  // true
</pre>

This works because !foo converts foo to a Boolean but negates its original value, turning it on its head. !!foo converts foo to a Boolean and flips it back to its expected value, which is the same value that&#8217;s evaluated by our

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          if
        </div>
      </td>
    </tr>
  </table>
</div>

statement.

Using this ALMOST gives us the answer we&#8217;re looking for:

<pre name="code" class="JScript">!!foo0; // ReferenceError: foo0 is not defined

var foo1;
!!foo1; // false

var foo2 = null;
!!foo2; // false (same as !!null)

var foo3 = "";
!!foo3; // false (same as !!"")

var foo4 = "bar";
!!foot4; // true (same as !!"bar")
</pre>

Excluding the first example, now we can test for uninitialized variables (foo1), null variables (foo2), and empty strings (foo3) all with just an

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          if
        </div>
      </td>
    </tr>
  </table>
</div>

statement:

<pre name="code" class="JScript">if(foo1) {
  // do something with foo1
}

if(foo2) {
  // do something with foo2
}

if(foo3) {
  // do something with foo3
}
</pre>

Dang… so close! But we can&#8217;t yet test the first case without an error:

<pre name="code" class="JScript">if(foo0) {  // ReferenceError: foo0 is not defined

}
</pre>

### foo versus window.foo and this.foo

The secret to our solution lies in how JavaScript handles undefined variables versus undefined properties. Here&#8217;s a quick reminder on the difference between the two:

<pre name="code" class="JScript">// variable foo
var foo;

// property bar (and object variable foo)
var foo = {};  // create an empty object to add bar too
foo.bar = "";
</pre>

The difference between these makes all the difference whether a fatal error occurs:

<pre name="code" class="JScript">foo;  // ReferenceError: foo is not defined

var foo = {};
foo.bar;  // undefined
foo.blah; // undefined
</pre>

We can randomly invent and check any property of

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          foo
        </div>
      </td>
    </tr>
  </table>
</div>

we want, and the code will keep chugging along:

<pre name="code" class="JScript">var foo = {};
foo.something = "hello";

if(foo.bar) { // undefined, interpreted as false (same as !!foo.bar)
  // never runs
}

if(foo.something) {
  foo.something;  // "hello"
}
</pre>

Now comes the magic. If you know anything about JavaScript running in the browser, you know that all global variables are part of the

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          window
        </div>
      </td>
    </tr>
  </table>
</div>

object. This means

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          foo
        </div>
      </td>
    </tr>
  </table>
</div>

and

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          window.foo
        </div>
      </td>
    </tr>
  </table>
</div>

are equivalent:

<pre name="code" class="JScript">var foo;

foo === window.foo;  // true

// "this" is another bag of worms, but note this anyway
this.foo === window.foo;
</pre>

So technically our variable foo is a *property* of the window object. So we should be able to check for any arbitrary variable in the window scope now!

<pre name="code" class="JScript">window.foo;  // undefined (not a fatal error!)

// even though we're checking for the same thing, we get a fatal error…
foo;  // ReferenceError: foo is not defined
</pre>

### Practical uses

Now as long as we have a global entry point for our code, we can write our code in such a way that it won&#8217;t ever give us a fatal error if our variables aren&#8217;t yet defined:

<pre name="code" class="JScript">if(window.foo &#038;&#038; foo.bar) {
  foo.bar();
}
</pre>

Of course nothing happens, because we haven&#8217;t defined foo. But why doesn&#8217;t foo.bar give us a fatal error? Because the first test,

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          window.foo
        </div>
      </td>
    </tr>
  </table>
</div>

failed out. It would be useless processing for the JavaScript engine to also evaluate the second statement, because the end result will still be the same (false &#038;&#038; true results in false, false &#038;&#038; false results in false). So it doesn&#8217;t get so far as

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          foo.bar
        </div>
      </td>
    </tr>
  </table>
</div>

.

And now the code will work properly when we hook up our code to our

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          foo
        </div>
      </td>
    </tr>
  </table>
</div>

global namespace:

<pre name="code" class="JScript">var foo = {
  bar: function() {
    alert("hello world");
  }
}

if(window.foo &#038;&#038; foo.bar) {
  foo.bar();  // "hello world"
}
</pre>

### Shorthand

It&#8217;s becoming common to see an abbreviation for the above code. Check out the following two methods, which accomplish the same thing:

<pre name="code" class="JScript">// Method 1
if(window.foo &#038;&#038; foo.bar) {
  foo.bar();  // "hello world"
}

// Method 2
window.foo &#038;&#038; foo.bar &#038;&#038; (foo.bar());
</pre>

Don&#8217;t get too scared.. these blocks of code are equivalent. Method 2 is shorter, but it simply goes something like this: if window.foo isn&#8217;t set, stop evaluating this line (just as above in the

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          if
        </div>
      </td>
    </tr>
  </table>
</div>

statement). Otherwise, if foo.bar exists then execute the code in parentheses, which gives us an alert (&#8220;hello world&#8221;);

Just a word of caution about using Method 2: it&#8217;s obviously less clear what&#8217;s going on here. Your own cleverness might actually result in unnecessary confusion, especially of other people work in the same code base and they&#8217;re at different levels of understanding. In these cases we should first strive to be clear, and then only clever if it&#8217;s not at the expense of being clear.

It&#8217;s also likely that a code minifier would take care of this cleverness for us at build time, giving us the best of both worlds.