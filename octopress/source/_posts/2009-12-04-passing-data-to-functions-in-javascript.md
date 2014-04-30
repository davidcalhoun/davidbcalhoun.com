---
title: Ways of passing data to functions in JavaScript
date: 2009-12-04
comments: true
author: David
layout: post
permalink: /2009/passing-data-to-functions-in-javascript
categories:
  - javascript
tags:
  - beginner
  - functions
  - javascript
---
Passing data is quite important in functional programming languages like JavaScript. When there are multiple functions (which is most of the time), there needs to be a way to pass data between the functions. This is done by passing values in parenthesis: myFunction(myData). Even when there is no data to be passed, we still have to declare and execute functions by using parenthesis: myFunction().

### Simple Passing

I&#8217;ve already referred to the common method of passing data. Here&#8217;s an example of the code in action:

<pre name="code" class="JScript">function greeting (name) {
    alert('Hello ' + name);
}
var personsName = 'Joe';
greeting(personsName);  // Hello Joe</pre>

This example only passes one variable to the function. Note that we can get rid of the variable personsName and make the string on the fly. So the code above is equivalent to this:

<pre name="code" class="JScript">function greeting (name) {
    alert('Hello ' + name);
}
greeting('Joe');  // Hello Joe</pre>

Ok. Now let&#8217;s suppose we have a function that accepts two variables:

<pre name="code" class="JScript">function greeting (firstName, lastName) {
    alert('Hello ' + firstName + ' ' + lastName);
}
greeting('Joe', 'Schmoe');  // Hello Joe Schmoe</pre>

This doesn&#8217;t look too hard. But there&#8217;s a catch &#8211; the person writing the code has to remember the order of variables to pass in. Suppose they call the function like this:

<pre name="code" class="JScript">function greeting (firstName, lastName) {
    alert('Hello ' + firstName + ' ' + lastName);
}
greeting('Schmoe', 'Joe');  // Hello Schmoe Joe</pre>

That&#8217;s no good! This isn&#8217;t the result we want. In the case of firstName and lastName the variable order isn&#8217;t too hard to remember, but in other cases the variables aren&#8217;t in any logical order, which can cause confusion.

### No constructor overloading

Unlike other languages such as C++ and Java, JavaScript has no [constructor overloading][1]. In fact, JavaScript is (for better or worse) not even strict about enforcing the number of variables passed in. For example, the following code works fine and throws no errors, even though we&#8217;re not passing in a variable in the function call:

<pre name="code" class="JScript">function test (someVar) {
    // do stuff
};
test();  // no errors!</pre>

It&#8217;s only when you try to use someVar within the function that causes the problems. Otherwise, everything&#8217;s working just fine and dandy.

What happens if we try the other case scenario: pass in more variables than the function expects? No errors again:

<pre name="code" class="JScript">function test () {
    // do stuff
};
test('testing 123');  // again, no errors</pre>

And what happens if we try to declare a function with the same name? No errors, but the previous function is overwritten (this is generally to be avoided of course):

<pre name="code" class="JScript">function test () {
    alert('First function');
};
function test () {
    alert('Second function');
};
test();  // Second function</pre>

Because JavaScript has no function overloading, all it takes to overwrite another function is to redeclare a function with the same name. It doesn&#8217;t matter what sort of arguments they accept.

### Passing with the help of the arguments object

As it turns out, JavaScript has a handy arguments object to access the arguments passed into each function:

<pre name="code" class="JScript">function test () {
    alert(arguments[0]);    // testing 123
};
test('testing 123');</pre>

In the above case the arguments object acts just as an array &#8211; it&#8217;s 0-indexed and can be used to access any arbitrary number of arguments. But arguments also has an interesting and useful property: length. Using arguments.length, we can traverse the array of arguments. This is handy in cases where we might want to add an arbitrary number of elements together:

<pre name="code" class="JScript">function add () {
    var sumTotal = 0;                        // initialize total to 0

    for(var i=0; i&lt;arguments.length; i++) {  // for each argument
        sumTotal += arguments[i];            // add current argument to total
    }
    
    alert(sumTotal);
};
add(2, 3, 4);  // 9
add(1, 1, 1, 1, 1, 1, 1, 1, 1);  // 9
</pre>

### Passing an object

JavaScript libraries such as [YUI][2] have already learned that the variable order is a common nuisance and an opportunity to introduce errors, so they&#8217;ve come up with a solution: pass a single object to the function. It ends up looking something like this:

<pre name="code" class="JScript">function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}
var nameObject = {};
nameObject.first = 'Joe';
nameObject.last = 'Schmoe';
greeting(nameObject);  // Hello Joe Schmoe</pre>

Now the variables become properties of a single object which is passed into the function. And it doesn&#8217;t matter which order the properties are declared in, which is a great relief to the developer.

Note that we can simplify the above code:

<pre name="code" class="JScript">function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}
var nameObject = {
    first: 'Joe',
    last: 'Schmoe'
};
greeting(nameObject);  // Hello Joe Schmoe</pre>

And we can simplify even further:

<pre name="code" class="JScript">function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}
greeting({
    first: 'Joe',
    last: 'Schmoe'
});  // Hello Joe Schmoe</pre>

This is the form commonly used in these JavaScript libraries. It&#8217;s easy to copy-and-paste example code, but it might not always be so obvious what&#8217;s going on behind the scenes. You can see that just as we bypassed declaring a named variable in the Simple Passing model (with greeting(&#8221;)), here we use the same shortcut and bypass declaring a named object (with greeting({})).

### call() and apply()

These two methods have different techniques for passing data to functions, but I&#8217;m going to have to hold off on them for now. It&#8217;s a bit complicated, since they&#8217;re only used to execute methods (functions) in other object contexts. But seeing as I need to explain object context to get into that, I&#8217;ll save that for a future entry!

 [1]: http://en.wikipedia.org/wiki/Method_overloading
 [2]: http://developer.yahoo.com/yui/