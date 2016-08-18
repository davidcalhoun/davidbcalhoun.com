---
title: Different ways of defining functions in JavaScript (this is madness!)
date: 2011-06-24
comments: true
author: David
layout: post
permalink: /2011/different-ways-of-defining-functions-in-javascript-this-is-madness
categories: ["javascript", "programming", "webdev"]
---

Note: updated in July 2016 with ES6 arrow functions.

[Russian translation](http://langtoday.com/?p=303) thanks to Yevgeniy Pyastolov

* TOC
{:toc}


### This is madness! This&#8230; is&#8230; JavaScript!

In JavaScript, there's many different ways of doing something. This is both a good thing and a bad thing. To the newcomer this is definitely a bad thing, as it means not only more things to learn, but more little caveats and more places to go wrong. And so it is with declaring functions!

The aim of this is just an accessible tour of the landscape, just so you know what's out there and what the basic differences are. Do be sure to check out the "further reading" section as well! Much of this is based on [Juriy "kangax" Zaytsev's article][1], which goes into more depth. But I found that there wasn't just one reference to show all the different variable declarations.

How about ways to execute functions? That opens up another can of worms, and incidentally opens up the possibility for a future post on that topic. :)

### Overview: different ways of declaring functions

``` javascript
    function A(){};             // function declaration
    var B = function(){};       // function expression
    var C = (function(){});     // function expression with grouping operators
    var D = function foo(){};   // named function expression
    var E = (function(){        // IIFE that returns a function
      return function(){}
    })();
    var F = new Function();     // Function constructor
    var G = new function(){};   // special case: object constructor
    var H = x => x * 2;         // ES6 arrow function
```


### A: Function declarations: function A(){};

Function declarations are probably the most familiar and oldest way of doing things in JavaScript land. This creates a variable A which is accessible in the current scope. Scope is a separate topic, so well do everything in the global scope for all these examples (something you want to avoid usually).

#### 1. Hoisting

The interesting thing about these is that they are "hoisted" to the top of their scope, which means this code:

``` javascript
    A();
    function A(){
      console.log('foo');
    };
```

Gets executed as this code:

``` javascript
    function A(){
      console.log('foo');
    };
    A();
```

Which practically means that, yes, you can call the functions before they're written in your code. It won't matter, because the entire function gets hoisted to the top of its containing scope. (This is contrasted with variables, which only have their declaration hoisted, not their contents, as we'll see in the next section).

#### 2. No function declarations in ``if`` statements (or loops, etc)
You can't define functions this way in expressions, for example ``if`` statements, which is common if we want to define different versions of a function for different circumstances, usually to address browser inconsistencies. Well, you *can* in some implementations, but the way the code is processed is inconsistent (kangax has documented the inconsistencies [here][1]). If you want to use this pattern, use function expressions instead.

#### 3. Functions declarations must have names

This method doesn't allow you to create anonymous functions, meaning that you always have to give it an identifier (in this case we've used "A").

### B: Function expressions: var B = function(){};

A function expression looks similar to function declarations, except that the function is assigned to a variable name. Though functions are not primitive values in JavaScript, this is the way they can be utilized to their full effect in this functional language. Functions are "[first class][2]":

> "[JavaScript] supports passing functions as arguments to other functions, returning them as the values from other functions, and assigning them to variables or storing them in data structures"

#### 1. Anonymous functions (they don't need names)

The function name is optional in function expressions, and we call these anonymous. Here we're setting the variable B equal to an anonymous function: ```var B = function(){};```


#### 2. Variable declaration hoisting

Variable declarations are hoisted to the top of their scope, somewhat similarly to function hoisting *except* the contents of the variable are not hoisted as well. This happens with all variables, and it means it's now happening with our functions, now that we're assigning them to variables.

This code:

``` javascript
    var A = function(){};
    var B = function(){};
    var C = function(){};
```

Will be executed as this:

``` javascript
    var A, B, C;  // variable declarations are hoisted
    A = function(){};
    B = function(){};
    C = function(){};
```

Therefore the order of setting and calling this type of function is important:

``` javascript
    // this works
    var B = function(){};
    B();

    // this doesn't work
    B2();  // TypeError (B2 is undefined)
    var B2 = function(){};
```

The second example gives us an error because only the variable B2's declaration is hoisted, but not its definition, thus the "undefined" error.

### C: Function expressions with grouping operators: var C = (function(){});

These really aren't different from plain old function expressions and aren't really seen in the wild (so maybe they're just good for JavaScript quizzes?). Recently this way of declaring functions was brought up in [this article][3] and confused some folks including myself.

Here's a good way to see what's happening:

``` javascript
    function(){};  // SyntaxError
    (function(){});
```

Why does one work and the other doesn't? The first example is a function declaration, and we learned above that we can't declare them anonymously - that is, they must have a name. That's why we're getting the syntax error.

The second example is using parenthesis - grouping operators - and is therefore evaluated differently, as a function expression. The grouping operators are the things we use to help show what should be evaluated first, as in mathematical problems. We're saying "evaluate this first, then take the result and do something with it":

``` javascript
    (1 + 2) * 3;  // 9
    1 + (2 * 3);  // 7
```

In the first example we're saying "first add 1 and 2, then take the result and multiply by 3", whereas in the second example we're saying "first multiply 2 and 3, then take the result and add 1".

Because functions are first class, we can use similar grouping operators. Here's a facetious example, but it shows how we can essentially drop in a function in the same way:

``` javascript
    (function(){} + 1);  // function(){}1
```

The result is a string (because toString is being called on the function, then added/appended with 1), but you get the idea I hope.

When the JavaScript engine encounters the opening parenthesis here, we're essentially saying "ok, start grouping this together with something else". Using our technical terms, we're telling the engine that we're not making a function declaration, but instead a function expression. And then we can assign the result to a variable:

``` javascript
    (function(){});           // resulting function not assigned
    var foo = (function(){}); // resulting function assigned to foo
    var bar = function(){};   // resulting function assigned to bar
```

Here we can see that foo and bar are really just the same, because in foo we're not grouping the function together with anything but itself.

### D: Named function expression: var D = function foo(){};

Here we have our same old friend, the function expression. But instead of assigning the variable to an anonymous function, we're assigning it to a named function (with the name foo).

#### 1. The function name is only accessible within the function

We haven't exposed the function name (foo) to the enclosing scope (in this case the global scope):

``` javascript
    var D = function foo(){
      console.log(typeof foo);
    };
    D();                       // function
    console.log(typeof foo);   // undefined
```

#### 2. Useful for recursion

Because the function's name is accessible in the function itself, this turns out to be useful for recursive functions, much more useful than the plain old anonymous function.

Here's a trivial recursive function to illustrate calling itself from within the named function expression:

``` javascript
    var countdown = function a(count){
      if(count > 0) {
        count--;
        return a(count);  // we can also do this: a(--count), which is less clear
      }
      console.log('end of recursive function');
    }
    countdown(5);
```

#### 3. Useful for debugging

As a [few][1] [have][4] pointed out, giving previously anonymous functions names helps in debugging, since the function name shows up on the call stack.

#### 4. Quirks: JScript's bad implementation

[kangax][1] points out that named function expressions are basically poison to JScript, Internet Explorer's implementation of JavaScript.

The named function becomes a global variable, is hoisted like a function declaration, and actually ends up creating multiple instances of the same function.

### E: Immediately-invoked function expressions (IIFE): var E = (function(){return function(){}})();

"Execute this function, whose return value is another function, and assign that to the variable E". This may seem like magic, but it's actually quite simple, and the pattern is powerful and has useful applications, the most famous of which is the [module pattern][5].

First we'll use an example that doesn't look like magic:

``` javascript
    var foo = function(){
      return 'bar';
    };
    var output = foo();
    console.log(output);  // 'bar'
```

We already learned about grouping operators above, so you should feel comfortable with saying this is equivalent:

``` javascript
    var foo = function(){
      return 'bar';
    };
    var output = (foo)(); // note the extra grouping operators
    console.log(output);  // 'bar'
```

Since foo is pointing to our function expression, we know that we can simply refrain from using the variable "foo" and drop in the entire function as an anonymous function (since functions are first class, after all!):

``` javascript
    var output = (function(){
      return 'bar';
    })();
    console.log(output);  // 'bar'
```

Hey wait, we just arrived at the magical resulting function! It turns out to be not so magical after all, once we break it down and see it for what it is. It's simply shorthand for the code we wrote originally, where we defined a function, executed it, and defined output to be its return value.

I've included this method on the list of declaring functions because we can assign the return value to itself be a function:

``` javascript
    var E = (function(){
      return function(){}
    })();
```

#### Applications

There are good applications for this, including information hiding using in the module pattern, ([partial application][6], for example), and other clever uses of it. It's definitely not a trivial pattern.

### F: Function constructor: var F = new Function();

This method is extremely old and it's not recommended to be used. You pass in an unlimited number of arguments in the front, then the actual function body appears as a string in the last argument (because it's a string, it's effectively the equivalent of eval(), and isn't recommended).

#### 1. Defining the function

You can create a function like this:

``` javascript
    var F = new Function('arg1', 'arg2', 'console.log(arg1 + ", " + arg2)');
    F('foo', 'bar');  // 'foo, bar'
```

#### 2. You don't need the ``new`` operator 
You can simply write ``var F = Function();`` to get the same result.

#### 3. Quirks

The [MDN docs][7] have some good examples of the quirks, including the fact that functions declared with the Function constructor don't inherit their current scope properly (i.e. a closure isn't formed).

What this means is that they don't have access to variables in their enclosing scope, which isn't particularly useful:

``` javascript
    function foo(){
      var bar = 'blah';
      
      var first = new Function('console.log(typeof bar)');
      first();   // undefined
      
      var second = function(){
        console.log(typeof bar);
      }
      second();  // string
    }
    foo();
```

In the function "first", we're using the Function constructor, so it doesn't have access to the variable bar. However, if we use the function "second", which is a function expression, it does in fact have access to variables defined in its enclosing scope (via closure).

In other words, *don't use the Function constructor*.

### G: Special case - object constructor: var G = new function foo(){};

I saved this for last because we're not really defining a function, though we are using the function keyword, so it's worth noting at least.

`new function(){};` creates a new object and invokes the anonymous function as its constructor. If an object is returned from the function, that becomes the resulting object, otherwise a new object is created from scratch and function is executed in the context of that new function (let's save the details for another post!).

It's a bit unusual to see it in this form. Let's do it the proper way:

``` javascript
    var Person = function(){
      console.log(this);  // Person
    }
    var joe = new Person();
```

So really with the new operator, we are giving it a new 'this' context and then executing the given function with that new context. Much different than the function definitions we've been dealing with above! This does into a whole new topic, and we'll save that for later!

### H: Arrow functions

With the addition of ES6 came these so-called "fat arrow" functions, or if you prefer the slimmed-down version, simply "arrow functions".

Arrow functions bring no brand new functionality, instead offering some syntactic sugar, meaning that in the end we developers will have to type less to achieve the same result.

Arrow functions are particularly handy in cases where we would've had one-line functions before, as in this case with ES5 JavaScript:

``` javascript
    [1, 2, 3].map(function(x) {return x * 2});
    // [2, 4, 6]
```

We can now write this as follows:

``` javascript
    [1, 2, 3].map(x => x * 2);
    // [2, 4, 6]
```

The second benefit of arrow functions is that they preserve their ``this`` context, which is super convenient.  Often times it's a tedious task trying to preserve scope in JavaScript, usually through the use of ``bind()``.  But this allows us to bypass it and write less.

Consider the following case:

``` javascript
    function multiply(valuesArray) {
      this.multiplier = 2;
      return valuesArray.map(function(x) {return x * this.multiplier});
    };

    var fakeContext = {};

    multiply.call(fakeContext, [1, 2, 3]);
    // -> [NaN, NaN, NaN]
```

This didn't work because the ``this`` context of the multiply function wasn't preserved in the ``map()`` function, forcing us to rewrite things slightly to preserve function context through defining a variable in ``multiple()`` (such as ``var self = this``) or by using ``bind()``.

Instead, using an arrow function we know our ``this`` context will be preserved, allowing us to write with a minor tweak:

``` javascript
    function multiply(valuesArray) {
      this.multiplier = 2;
      return valuesArray.map(x => x * this.multiplier);
    };

    var fakeContext = {};

    multiply.call(fakeContext, [1, 2, 3]);
    // -> [2, 4, 6]
```

As with much of ES6, use caution, as it may not be completely supported yet (see <a href="http://caniuse.com/#feat=arrow-functions">caniuse.com</a>).  As most folks are using some sort of transpiler these days, they probably don't have to worry about this.  It's good to keep in mind however.

Read more about arrow functions <a href="http://exploringjs.com/es6/ch_arrow-functions.html">here</a>.

### Further reading

[Named function expressions demystified][1] (kangax)

[Immediately-Invoked Function Expression (IIFE) (Ben Alman)][8]

[Functions and function scope][9] (Mozilla Developer Network - MDN)

[How does an anonymous function in JavaScript work? (StackOverflow)][10]

[Function Declarations vs. Function Expressions (JavaScript, JavaScript by Angus Croll)][4]

[JavaScript: The Definitive Guide][11] (classic book by David Flanagan)

 [1]: http://kangax.github.com/nfe/
 [2]: http://en.wikipedia.org/wiki/First-class_function
 [3]: http://ironjs.wordpress.com/2011/06/22/my-gripes-with-javascript/
 [4]: http://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/
 [5]: http://www.klauskomenda.com/code/javascript-programming-patterns/#module
 [6]: http://ejohn.org/blog/partial-functions-in-javascript/
 [7]: https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope#Function_constructor_vs._function_declaration_vs._function_expression
 [8]: http://benalman.com/news/2010/11/immediately-invoked-function-expression/
 [9]: https://developer.mozilla.org/en/JavaScript/Reference/Functions_and_function_scope
 [10]: http://stackoverflow.com/questions/1140089/how-does-an-anonymous-function-in-javascript-work
 [11]: http://www.amazon.com/gp/product/0596805527/