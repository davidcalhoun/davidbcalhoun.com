---
title: Ways of passing data to functions in JavaScript
date: 2009-12-04
comments: true
author: David
layout: post
permalink: /2009/passing-data-to-functions-in-javascript
categories: ["webdev", "javascript", "programming"]
tags:
  - beginner
  - functions
  - javascript
---
Passing data is quite important in functional programming languages like JavaScript. When there are multiple functions (which is most of the time), there needs to be a way to pass data between the functions. This is done by passing values in parenthesis: myFunction(myData). Even when there is no data to be passed, we still have to declare and execute functions by using parenthesis: myFunction().

### Simple Passing

I've already referred to the common method of passing data. Here's an example of the code in action:

``` javascript
function greeting (name) {
    alert('Hello ' + name);
}
var personsName = 'Joe';
greeting(personsName);  // Hello Joe
```

This example only passes one variable to the function. Note that we can get rid of the variable personsName and make the string on the fly. So the code above is equivalent to this:

``` javascript
function greeting (name) {
    alert('Hello ' + name);
}
greeting('Joe');  // Hello Joe
```

Ok. Now let's suppose we have a function that accepts two variables:

``` javascript
function greeting (firstName, lastName) {
    alert('Hello ' + firstName + ' ' + lastName);
}
greeting('Joe', 'Schmoe');  // Hello Joe Schmoe
```

This doesn't look too hard. But there's a catch - the person writing the code has to remember the order of variables to pass in. Suppose they call the function like this:

``` javascript
function greeting (firstName, lastName) {
    alert('Hello ' + firstName + ' ' + lastName);
}
greeting('Schmoe', 'Joe');  // Hello Schmoe Joe
```

That's no good! This isn't the result we want. In the case of firstName and lastName the variable order isn't too hard to remember, but in other cases the variables aren't in any logical order, which can cause confusion.

### No constructor overloading

Unlike other languages such as C++ and Java, JavaScript has no [constructor overloading][1]. In fact, JavaScript is (for better or worse) not even strict about enforcing the number of variables passed in. For example, the following code works fine and throws no errors, even though we're not passing in a variable in the function call:

``` javascript
function test (someVar) {
    // do stuff
};
test();  // no errors!
```

It's only when you try to use someVar within the function that causes the problems. Otherwise, everything's working just fine and dandy.

What happens if we try the other case scenario: pass in more variables than the function expects? No errors again:

``` javascript
function test () {
    // do stuff
};
test('testing 123');  // again, no errors
```

And what happens if we try to declare a function with the same name? No errors, but the previous function is overwritten (this is generally to be avoided of course):

``` javascript
function test () {
    alert('First function');
};
function test () {
    alert('Second function');
};
test();  // Second function
```

Because JavaScript has no function overloading, all it takes to overwrite another function is to redeclare a function with the same name. It doesn't matter what sort of arguments they accept.

### Passing with the help of the arguments object

As it turns out, JavaScript has a handy arguments object to access the arguments passed into each function:

``` javascript
function test () {
    alert(arguments[0]);    // testing 123
};
test('testing 123');
```

In the above case the arguments object acts just as an array - it's 0-indexed and can be used to access any arbitrary number of arguments. But arguments also has an interesting and useful property: length. Using arguments.length, we can traverse the array of arguments. This is handy in cases where we might want to add an arbitrary number of elements together:

``` javascript
function add () {
    var sumTotal = 0;                        // initialize total to 0

    for(var i=0; i<arguments.length; i++) {  // for each argument
        sumTotal += arguments[i];            // add current argument to total
    }
    
    alert(sumTotal);
};
add(2, 3, 4);  // 9
add(1, 1, 1, 1, 1, 1, 1, 1, 1);  // 9
```

### Passing an object

JavaScript libraries such as [YUI][2] have already learned that the variable order is a common nuisance and an opportunity to introduce errors, so they've come up with a solution: pass a single object to the function. It ends up looking something like this:

``` javascript
function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}
var nameObject = {};
nameObject.first = 'Joe';
nameObject.last = 'Schmoe';
greeting(nameObject);  // Hello Joe Schmoe
```

Now the variables become properties of a single object which is passed into the function. And it doesn't matter which order the properties are declared in, which is a great relief to the developer.

Note that we can simplify the above code:

``` javascript
function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}
var nameObject = {
    first: 'Joe',
    last: 'Schmoe'
};
greeting(nameObject);  // Hello Joe Schmoe
```

And we can simplify even further:

``` javascript
function greeting (obj) {
    alert('Hello ' + obj.first + ' ' + obj.last);
}
greeting({
    first: 'Joe',
    last: 'Schmoe'
});  // Hello Joe Schmoe
```

This is the form commonly used in these JavaScript libraries. It's easy to copy-and-paste example code, but it might not always be so obvious what's going on behind the scenes. You can see that just as we bypassed declaring a named variable in the Simple Passing model (with `greeting('')`), here we use the same shortcut and bypass declaring a named object (with `greeting({})`).

### call() and apply()

These two methods have different techniques for passing data to functions, but I'm going to have to hold off on them for now. It's a bit complicated, since they're only used to execute methods (functions) in other object contexts. But seeing as I need to explain object context to get into that, I'll save that for a future entry!

 [1]: http://en.wikipedia.org/wiki/Method_overloading
 [2]: http://developer.yahoo.com/yui/