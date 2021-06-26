---
title: Is a hash faster than a Switch in JavaScript?
date: 2010-08-17
comments: true
author: David
layout: post
permalink: /2010/is-hash-faster-than-switch-in-javascript
aliases:
  - /2010/is-hash-faster-than-switch-in-javascript
tags:
  - javascript
  - performance
  - webdev
  - android
  - hash
  - jsperf
  - mobile safari
  - switch
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

I stumbled across this concept recently and I thought I'd share it, because I don't generally see this pattern being used. More importantly, I also share test results that show that maybe it's not always a good idea to use this pattern...

### The problem with Switch statements

The basic switch statement in JavaScript looks something like this:

```js
var foo = "c";

switch (foo) {
  case "a":
    break;

  case "b":
    break;

  case "c":
    break;

  default:
}
```

So what's wrong with this? The JS engine has to examine a bunch of unrelated cases until it finds the relevant one, executes the code, then breaks out of the switch because the job is done (this is why it's important to break!). In the above example we had to go through case A and case B until finally reaching case C. What's worse is that if it didn't match any of these cases, the JS engine has to jump through ALL of the cases before it reaches Default, the fall-through case.

Actually it's not so bad, as long as there are a limited number of cases. It's probably no big deal if you only have a few cases to jump through. The problem gets bigger as your number of cases increases (some of you may know this as [O(n)][1]). What happens when there's 10 cases? Then there's potentially 10 checks on cases (assuming what ended up being executed was the default). 100 cases? Then potentially 100 checks.

What would be better is if there were a way to reduce the number of checks. One way would be to put the most frequently used cases at the top. This would alleviate some of the pain, but you still end up with extra processing while the JS checks each case. It would be ideal to avoid this extra processing altogether.

### An alternative: The hash table

There is a way to avoid this extra processing! It's by leading the code directly where it needs to go, without unnecessary checking of unrelated cases.

You can do this using a hash. In JavaScript we accomplish this with an object:

```js
var foo = "c";
var cases = {};
cases["a"] = function () {
  alert("I am A!");
};
cases["b"] = function () {
  alert("I am B!");
};
cases["c"] = function () {
  alert("I am C!");
};

if (typeof cases[foo] == "function") {
  // only executes if we've defined it above
  cases[foo](); // I am C!
} else {
  // default (the fallthrough)
}
```

There we go! No extra case checking here. We've led the JS straight to the code we want to execute!

### Performance improvement...?

So.. this hash lookup seems faster in theory, but what about in practice? Unfortunately I ended up with some mixed results...

I created a [simple performance test on jsperf.com][2] and got these results:

<table>
  <tr>
    <td>
      Browser
    </td>
    
    <td>
      Switch ops/sec
    </td>
    
    <td>
      Hash table ops/sec
    </td>
    
    <td>
      % Difference
    </td>
  </tr>
  
  <tr>
    <td>
      Chrome 6.0.490.1 dev
    </td>
    
    <td class="negative">
      34,606,469
    </td>
    
    <td class="positive">
      43,329,587
    </td>
    
    <td class="positive">
      25% faster
    </td>
  </tr>
  
  <tr>
    <td>
      Safari 5.0
    </td>
    
    <td class="positive">
      16,777,216
    </td>
    
    <td class="negative">
      10,854,824
    </td>
    
    <td class="negative">
      35% slower
    </td>
  </tr>
  
  <tr>
    <td>
      Opera 10.61
    </td>
    
    <td class="positive">
      4,405,782
    </td>
    
    <td class="negative">
      2,719,336
    </td>
    
    <td class="negative">
      38% slower
    </td>
  </tr>
  
  <tr>
    <td>
      Firefox 3.6.3
    </td>
    
    <td class="positive">
      2,785,802
    </td>
    
    <td class="negative">
      2,400,586
    </td>
    
    <td class="negative">
      14% slower
    </td>
  </tr>
  
  <tr>
    <td>
      IE6
    </td>
    
    <td class="negative">
      147,870
    </td>
    
    <td class="positive">
      206,869
    </td>
    
    <td class="positive">
      40% faster
    </td>
  </tr>
  
  <tr>
    <td>
      IE7
    </td>
    
    <td class="negative">
      144,735
    </td>
    
    <td class="positive">
      191,179
    </td>
    
    <td class="positive">
      32% faster
    </td>
  </tr>
  
  <tr>
    <td>
      IE8
    </td>
    
    <td class="negative">
      350,085
    </td>
    
    <td class="positive">
      472,417
    </td>
    
    <td class="positive">
      35% faster
    </td>
  </tr>
  
  <tr>
    <td>
      Mobile Safari (iOS4 on iPhone 3GS)
    </td>
    
    <td class="positive">
      668,053
    </td>
    
    <td class="negative">
      416,366
    </td>
    
    <td class="negative">
      37% slower
    </td>
  </tr>
  
  <tr>
    <td>
      Android (2.2 on Nexus One)
    </td>
    
    <td class="negative">
      605,693
    </td>
    
    <td class="positive">
      864,591
    </td>
    
    <td class="positive">
      42% faster
    </td>
  </tr>
</table>

- Ops/sec = Operations per second. Higher is better
- Chrome, Safari, Opera, and Firefox were tested on Mac OSX 10.6.4 2.53GHz Intel Core i5. IE tests were run on Windows 7 64bit 2.4GHz Quad Core

### The Results

From the results, it looks like the hash optimization is only a benefit for Chrome, IE6-IE8, and Android. That's quite a specific sampling. My guess is that the other browsers have implemented some sort of Switch statement optimizations that actually turn the hash optimization into an antipattern.

### More info

Although I first read about this online, by no surprise this trick also appears in [Nicholas Zakas's][3] [High Performance JavaScript][4] in a section on "Lookup Tables" (p. 72).

[1]: http://en.wikipedia.org/wiki/Big_O_notation
[2]: http://jsperf.com/switch-vs-hash/3
[3]: http://www.nczonline.net/
[4]: http://www.amazon.com/Performance-JavaScript-Faster-Application-Interfaces/dp/059680279X
