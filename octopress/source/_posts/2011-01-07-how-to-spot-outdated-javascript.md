---
title: How to spot outdated JavaScript
date: 2011-01-07
comments: true
author: David
layout: post
permalink: /2011/how-to-spot-outdated-javascript
categories:
  - javascript
---
### Introduction

Those that are just setting out to learn JavaScript are typically overwhelmed by the amount of online resources to be found about learning JavaScript. Not only this, but every webpage visited presents a potential learning opportunity just by inspecting the source.

However, not all resources are guaranteed to be up-to-date. JavaScript has been around for over a decade, and coding standards have changed drastically over time. While a code snippet may still work in today&#8217;s browsers, you may unknowingly be using an outdated practice that might eventually lead to a bit of embarrassment.

You may sometimes find these old practices mixed in with good and modern code. It seems that folks might learn new code styles without necessarily casting away all their old habits. So keep in mind not to throw out the baby with the bathwater!

Here&#8217;s some old practices that should help you spot old outdated code. 

### Global variables

<pre name="code" class="JScript">function foo() {  // global function
  greeting = 'Hello' + name;  // global function
};
name = 'James';  // global variable
foo();
</pre>

Tons of global variables is a sure sign of outdated code. Ideally you want to aim to have at most one global variable, which is a namespace for all your code to be written under. All variables in your functions should be defined with the &#8216;var&#8217; keyword to ensure they don&#8217;t break out of their scope.

Here&#8217;s an example where we defined one global variable entry point (myNamespace) for our code:

<pre name="code" class="JScript">var myNamespace = (function() {
  // declare all variables with var
  var greeting, name;
  
  name = 'James';
  
  greeting = function() {
    return 'Hello ' + name;
  };
  
  return {
    greeting: greeting
  }
})();

greeting();              // ERROR: not defined
myNameSpace.greeting();  // 'Hello James'
</pre>

### Commented CDATA blocks

<pre name="code" class="JScript">/* &lt;![CDATA[ */
// code here
/* ]]&gt; */
</pre>

This appears in old scripts that are presented inline (instead of externally in a separate file). The original purpose of those was to get around HTML validator errors (and to conform to XHTML), but that appears to no longer be an issue with validators today. Also, the usage of HTML validators itself seems to be waning, although they may sometimes be helpful in the development of websites.

### document.write()

<pre name="code" class="JScript">document.write('foo');
</pre>

The [W3C][1], along with most everyone else, warns against using this, as it may result in overwriting (blanking) the entire page and other unwanted behavior.

It&#8217;s now used mostly by ads, and [developers have for years been trying to control them][2]. So don&#8217;t use it, unless you&#8217;re trying to prevent ads from using them. In other words, don&#8217;t use it unless you know what you&#8217;re doing.

### Inlined event handlers

<pre name="code" class="HTML">&lt;a onclick="myClickFunction()" href="http://foo.com"&gt;&lt;/a&gt;
&lt;a onmouseover="myMouseoverFunction()" href="http://foo.com"&gt;&lt;/a&gt;
&lt;form onsubmit="mySubmitFunction()" href="http://foo.com"&gt;&lt;/form&gt;
</pre>

This mixes behavior with the actual content, which means when it&#8217;s time to make changes to the code, you likely have to change both the HTML and the JavaScript, instead of simply just the JavaScript. It also means that you may be serving useless content to users with JavaScript disabled ([they&#8217;re still out there][3], believe it or not). This also might have an affect on search engines, that might not be able to access this JavaScript-only content (although crawlers are getting more sophisticated and this may be less of an issue as time progresses).

Instead, the very least you can do is add IDs to each element (or better, use a JavaScript selector engine) and hook into them in your JavaScript, which makes the code much easier to maintain:

<pre name="code" class="HTML">&lt;a id="link1" href="http://foo.com"&gt;&lt;/a&gt;
&lt;a id="link2" href="http://foo.com"&gt;&lt;/a&gt;
&lt;form id="myForm" href="http://foo.com"&gt;&lt;/form&gt;
</pre>

<pre name="code" class="JScript">(function() {  // sandbox everything
  // variable declarations
  var link1, link2, myForm;

  window.onload = function() {  // or onDOMContentLoaded (wait for DOM to be ready)
    // simple DOM selectors
    link1 = document.getElementById('link1');
    link2 = document.getElementById('link2');
    myForm = document.getElementById('myForm');
    
    // well-supported older event handler
    link1.onclick = function(){
      // code
    };
    
    // better (DOM2)
    link1.addEventListener('click', function(){ // or attachEvent for IE
      // code
    },false);
    
    // etc...
  }

})();
</pre>

link1.onclick is widely supported, but there&#8217;s a few downsides, including the fact you can only add ONE event listener on the element (it will be overwritten if you try to add another). Use addEventListener (attachEvent in IE) instead, or the method of your favorite JavaScript engine.

In any case, the point here is to get the JavaScript out of the HTML and into the rest of your JavaScript.

### Inline JavaScript in link hrefs

<pre name="code" class="HTML">&lt;a href="javascript:doSomething()"&gt;&lt;/a&gt;
&lt;a href="javascript:void(0)"&gt;&lt;/a&gt;
</pre>

Both of these examples commit the same error as above &#8211; mixing JavaScript behavior with the HTML content. And the solution is similar: find these links with JavaScript (most simply by adding an id on them) and hook into them there.

The second example brings up a good issue, and a point of contention. Ideally this would be a link to fallback content for users that have JavaScript disabled (and for search engines!), which would be a link to a new page (Flickr is an example of a modern site that uses this approach). For better or worse, however, you might be building a web app that only works with JavaScript, and you might want a link that only exists to kick off a JavaScript event.

You&#8217;ll find that removing the href value or making it blank (href=&#8221;") might remove the styling from the link and no longer makes it clickable. An easy fix is to set the href equal to a hash tag (href=&#8221;#&#8221;). A side effect might be a &#8220;jump&#8221; to the top of the page after clicking the link, which requires and requires e.preventDefault() within the attached event. Href=&#8221;#&#8221; may soon become an antipattern (or maybe it is already), since you can also fix this with CSS styling:

<pre name="code" class="CSS">a { cursor: pointer; }
</pre>

This gives the cursor a pointer when the user hovers over the link, even if it&#8217;s missing the href value.

But again, this isn&#8217;t generally recommended. It&#8217;s better to make a non-JavaScript fallback by linking to an actual page, then overriding it with e.preventDefault() for JavaScript-enabled users!

### Slow arrays

<pre name="code" class="JScript">var arr = [1, 2, 3, 4, 5];

for(var x in arr) {
  /* code */
}

for(var i=0; i &lt; arr.length; i++) {
  /* code */
}
</pre>

For-in loops turn out to be quite slow while going through arrays, so only use them when iterating through properties of an object. The second for loop is much faster, but can be made faster still when we realize what's being evaluated on each iteration:

<pre name="code" class="JScript">for(1; n; n) {}
</pre>

The first statement is evaluated once (1 time) as the loop is initialized, and the second and third parts are evaluated on each run through the loop (n times). Because of this, just as removing fluff from the main body of the loop itself, we would also do well to remove fluff from these statements themselves. As it turns out, it's quite slow finding the length of the array (arr.length) on each pass, and it's not necessary to do it more than once since it's not changing. So we can "cache" the length in a variable in the initializer:

<pre name="code" class="JScript">for(var i=0, len=arr.length; i &lt; len; i++) {
  // code
}
</pre>

And faster yet is a while loop (keep in mind that it will run backwards), which stops when the counter hits 0, which is falsy, causing the loop to stop:

<pre name="code" class="JScript">var i = arr.length;
while(i--) {
  // code
}
</pre>

### new Object(), new Array(), new Function(), etc

<pre name="code" class="JScript">var obj  = new Object();
var arr  = new Array();
var func = new Function("param1", "param2", "return true;");
</pre>

While these work, no one really uses them, as there exist less verbose and more common alternatives. Use these instead, which are exactly equal to the above code:

<pre name="code" class="JScript">var obj  = {};
var arr  = [];
var func = function(param1, param1) {return true;}
</pre>

### alert()

Ok, alert can sometimes still be useful for debugging, but generally you want to use console.log for that anyway. Generally you don't want to ever prompt the user with alert() however. Its use on the desktop for mainstream use has long been discouraged.

I'm still on the fence about using alert() however, as I think it's pretty useful and not necessarily ugly in mobile browsers. I'll spare you and save that for another post.

### Missing semicolons

<pre name="code" class="JScript">var name='Bill'
alert('Hi ' + name)
</pre>

The above code works fine because of a controversial feature of JavaScript called semicolon insertion. But doesn't it make you feel dirty? It should, especially if you've read JavaScript: The Good Parts. Use semicolons for your own good and to prevent major headaches. Leave it to your JavaScript minifier to be clever in deciding when to remove them:

<pre name="code" class="JScript">var name='Bill';
alert('Hi ' + name);
</pre>

### Code for particular user agents

This is also a bit controversial, since unfortunately user agent sniffing is still sometimes necessary. However, in the past it was really abused with code such as this:

<pre name="code" class="JScript">isIE  = document.all;
isNS4 = document.layers;
isNS6 = document.getElementById;
if(isIE) {
  // code for IE
} else if(isNS4) {
  // code for Netscape 4
} else if(isNS6) {
  // code for Netscape 6
}
</pre>

(did I mention that any references to ancient browsers like Netscape is also a surefire sign of old code? But that's probably too obvious...)

This example detects browsers by features that only exist in each of these old browsers, but the same sin is committed by "sniffing" for words in the user agent string. The unfortunate result is fragmented code targeting each predetermined browser. Not to mention that it's not future-proof, as it can't properly anticipate newer browsers.

The better method? If there's a question about the availability of a method, simply check for it first before using it:

<pre name="code" class="JScript">if(document.addEventListener) {  // detect addEventListener
  // Try the standard first
  document.addEventListener('click', function(){}, false);
} else if(document.attachEvent) {  // detect attachEvent
  // Typically IE
  document.attachEvent('onclick', function(){});
}
</pre>

This code is considered feature detection, which is much more acceptable. It also anticipates newer browsers such as IE9, which support addEventListener. This makes sure the code you write doesn't condemn Internet Explorer to forever use attachEvent.

### Related links

Christian Heilmann and PPK's old posts inspired me to write this brief post. You can read much better rationale against using some of the things above at these links:

[Six JavaScript features we do not need any longer (Christian Heilmann, 2005)][4]

[From DHTML to DOM scripting (Christian Heilmann, 2006)][5]

[Three JavaScript articles and one best practice (PPK 2005)][6]

 [1]: http://dev.w3.org/html5/spec/apis-in-html-documents.html#document.write
 [2]: http://www.stevesouders.com/blog/2010/12/15/controljs-part-3/
 [3]: http://developer.yahoo.com/blogs/ydn/posts/2010/10/followup-how-many-users-have-javascript-disabled/
 [4]: http://www.wait-till-i.com/2005/06/21/six-javascript-features-we-do-not-need-any-longer/
 [5]: http://icant.co.uk/articles/from-dhtml-to-dom/from-dhtml-to-dom-scripting.html
 [6]: http://www.quirksmode.org/blog/archives/2005/06/three_javascrip_1.html