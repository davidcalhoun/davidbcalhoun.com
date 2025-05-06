---
title: "Javascript Bind, Partial Application, and Currying"
description: "Demystifying two often-confused methods to simplify multi-argument functions in JavaScript."
date: 2020-06-16
draft: false
tags:
- javascript
- programming
- functional programming
image: https://www.davidbcalhoun.com/wp-content/uploads/2020/2001-2000px-resize.jpeg
imageAlt: "HAL 9000 computer interface from Stanley Kubrick's 2001"
---

{{< img
    src="2020/2001"
    width="2000"
    height="1125"
    title="HAL 9000 interface, showing HAL's centered fisheye camera lens with code readouts on eight screens, four on each side of HAL's camera."
    caption="HAL 9000 computer interface from Stanley Kubrick's 2001"
>}}

## Summary
Partial application and currying often get muddled; they are related but not the same.  They're both techniques that transform functions that accept multiple arguments, but the difference is in the transformation.

* [**Partial application**](https://en.wikipedia.org/wiki/Partial_application) simplifies a function by prefilling arguments, so the newly-returned function accepts less arguments.  E.g. `add(2, 3)` becomes `addTwo(3)`, which calls `add()` and prefills the first argument as `2`.[^1]

* [**Currying**](https://en.wikipedia.org/wiki/Currying) simplifies a function by breaking it down into multiple one-argument functions.  E.g. `add(3, 1, 4)` becomes `add(3)(1)(4)`.  Also called "chaining", used by libraries such as D3 and jQuery.[^2]

* [**`bind()`**](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) is a native Javascript function that helps us achieve both partial application and currying.  It makes sure the function is called from a specific `this` context, with n number of arguments prefilled.

## Introduction / Why should I care?
Why should you even care about these functional programming concepts?  After all, you can build applications perfectly well without utilizing these.  This is true, but getting your code to run is only the first step.  Making your code cleaner and more readable by coworkers (or your future self) can make it much easier to maintain.

The major benefit is that these can reduce clutter and make your code more readable, which are great things to help code maintenance in the long run.


## Partial application
Partial application is a fancy term for prefilling arguments to a function, nothing more.  Why the "partial" in "partial application"?  Because only some of the arguments to the function are prefilled.  Some arguments are first "partially applied" (passed in), then later the rest of the arguments are passed in.

This is best illustrated by some examples.

### Simple addition example
Say we have a basic function to add two numbers together:

```js
const add = (x, y) => x + y;

// It works just how you'd expect it to:
add(2, 3);
// -> 5
```

Great, simple enough.  But during the course of writing our code, we find that we are often adding the same number over and over, leading to a lot of code repetition:

```js
add(2, 3);
add(2, 1);
add(2, 5);
add(2, 19);
add(2, 23);
add(2, 6);
```

This sort of code should especially stand out during refactoring, when we're often trying to keep things [DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself).

If you previously knew nothing about using `bind()`, you might try to fix this manually with something like this:

```js
// Always prefills the first argument to add() as 2.
const addTwo = y => add(2, y);
```

`addTwo()`[^3] simplifies the code we need to write:

```js
addTwo(3);
addTwo(1);
addTwo(5);
addTwo(19);
addTwo(23);
addTwo(6);
```

But if we know about [`bind()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind), this can be simplified even further.  This does the same thing as the code above:

```js
const addTwo = add.bind(null, 2);
```

In this case, `bind()` returns a new function (which is not immediately called) which makes sure `2` "sticks" as the first argument to `add()`.

Here we're using `bind()` to:
* always call `add()` with the `this` context (`null` in this case, since we don't need to care about it in this example)
* always prefills `2` as the first argument to `add()`.  The value passed to `addTwo()` will be the second argument sent to `add()`.

That's it!

This is the essence of [partial application](https://en.wikipedia.org/wiki/Partial_application): prefilling data to simplify our function calls.  In this case, `bind()` lets us "stick" or "bind" both the `this` context and any number of arguments to the function.

### Custom `console.log()` example
We can even use `bind()` to prefill arguments to native functions, such as `console.log()`:

```js
// Custom log that prefills the two first arguments to console.log.
const log = console.log.bind(null, '(debug)', '(dev)');

log('something happened');
// -> (debug) (dev) something happened

log('something else happened')
// -> (debug) (dev) something else happened
```

### Form input example
Here's one case where I've used partial application in a real app, in this case a React app.

A certain HTML form has a number of text input fields with different input names/keys.  Instead of repeating ourselves and writing a separate `onChange` for each individual text input (`onFirstNameChange`, `onLastNameChange`, etc), we can simply write a generic `handleChange()` that can update the internal state of the form for any text input.

We'll partially apply the input name, so it always gets passed as the first argument.  Because we've prefilled the first argument, the actual `event` will arrive as the second argument here:

```jsx
import React, {useState} from 'react';

export default function App() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: ''
  });

  /** Note: inputName comes first here because it's been partially applied with bind() */
  function handleChange(inputName, event) {
    setForm({
      ...form,
      [inputName]: event.target.value
    });
  }

  return (
    <form>
      <label>
        <p>First Name:</p>
        <input type="text" value={form.firstName} onChange={handleChange.bind(this, 'firstName')}/>
      </label>
      <label>
        <p>Last Name:</p>
        <input type="text" value={form.lastName} onChange={handleChange.bind(this, 'lastName')}/>
      </label>
    </form>
  );
}
```

## Currying
To be honest, in my own code I've mostly found partial application to be a much more useful concept than currying.  But it's good to understand, because the concept is used in some popular JavaScript libraries, including D3 and jQuery.  If you are a library author, you should at least be aware of this pattern, which can simplify your function interfaces.

Currying often gets mixed up with partial application, but it's different.  Like partial application, currying is a way of simplifying functions with multiple arguments.  But unlike partial application, in currying a function with multiple arguments is broken down into several functions, each accepting exactly one argument.

### Simple addition example

Let's reuse the addition example for clarity.  We'll start with the same simple `add()` function:


```js
const simpleAdd = (x, y) => x + y;

// It works just how you'd expect it to:
simpleAdd(2, 3);
// -> 5
```

Currying means breaking this into several functions which accept only one argument, meaning our interface will look like this:

```js
add(2)(3);
```

If you've never seen that sort of thing before, you may be taken aback.  But don't be scared, it's not magic!  We can break it down.

Anytime you see a pair of parentheses `()`, you can assume that a function is being executed.  From looking at the above code, it's clear that two functions are being executed, left-to-right, with `2` being passed into the first function (the function named `add()`) and `3` being passed into the second function.

The first function seems simple enough since it's named, but the second function is more mysterious.  Where did it come from?  Because of the position of the second function, it must be something that was returned from the `add()` function.[^4]  So we know that `add()` is what's called a [higher-order function](https://en.wikipedia.org/wiki/Higher-order_function), which returns another function.  We can start to guess at a skeleton implementation of the curried `add()` function:

```js
// Incomplete!  First guess at a skeleton implementation.
function add(x) {
	return function() {

	}
}
```

In the implementation example above (`add(2)(3)`), we know:
* `2` is passed to `add(x)`, so we know `x` must be `2`.
* The second function (the nested one) must accept the `3` as a second variable (let's call it `y`) and add it to `x`.

With these two pieces of information, we can fill in the gaps in the skeleton function:

```js
function add(x) {
	return function(y) {
		return x + y;
	}
}
add(2)(3);
// -> 5
```

It works!  That wasn't too bad, right?

But this is a pretty naive implementation that only lets you chain exactly two functions together.  No more, no less.  What if you are adding three or more numbers?  You could modify the above to nest even more functions, but things get out of control pretty fast with the level of nesting:

```js
function add(x) {
	return function(y) {
		return function(z) {
			return x + y + z;
		}
	}
}
add(2)(3)(4)
// -> 9
```

There's also the bigger problem that this implementation is inflexible.  The user *must* pass in *exactly* three numbers to three functions, or the reference to the last function is mistakenly returned:

```js
add(2)(3);
// -> function add(z)
```

Oops!  Obviously we wanted a number returned, not a reference to the deepest nested function...

This is where things get a little more tricky.  We want the `add()` function to be flexible and accept n number of arguments, then keep returning the nested function until it's done, when it should return the total.  But that's the trick - how does it know when it's done?  There must be some sort of "signal" at the end of the chain so the code knows when to return the total:

```js
add(2)(3)...(someDoneSignal);
```

Here's a clean recursive solution that returns an object with two methods: an `add()` that partially applies the ongoing total to add() as the first argument:

```js
function add(x = 0, y = 0) {
  const total = x + y;
  return {
    // Not done yet, just return the function add() with the
    // partially-applied current total.
    add: add.bind(null, total),

    // "End signal" - just return the total.
    done: () => total
  }
}

// Usage:
add(2).add(3).add(5).add(1).done();
// -> 11
```

This is pretty clean implementation and the interface is pretty explicit - I like it.

Alternatively, if we really want an implementation where there's less to type, we can achieve it, but with a more unintuitive implementation.  For this, we want the user to only need to type `add(2)(3)()`.  And note the necessary empty parentheses on the end - that's our "stop" signal in this case (it was explicitly called `done()` in the prior example).


```js
function add(rawX, rawY) {
  const xIsPrefilled = typeof rawX === 'object';
  const x = xIsPrefilled ? rawX.total : rawX;
  const y = rawY || 0;
  const total = x + y;

  // Detects an empty parentheses () as a stop condition.
  // Need to make sure that we get a partially-applied total
  // as the first argument, or this will mistakenly look
  // like the very first function call (add(2)).
  const gotStopSignal = xIsPrefilled && typeof rawY === 'undefined';

  return gotStopSignal ? total : add.bind(null, { total });
}

add(2)(3)(5)(1)();
// -> 11
```

This implementation is a little messier, because it's harder to detect the implicit "stop" signal.

Because we're partially-applying the first argument to `add()`, the stop signal actually has the first argument `rawX` present, and the second argument `rawY` undefined.  But the problem is that looks exactly like the first function call `add(2)`, which is definitely not a stop signal!  So we need some way of distinguishing the stop signal from that first function call.  In this implementation I differentiated it by prefilling (partially-applying) rawX as an object that contains the running total.  Now the code can see the difference:

* `add(2)` first call: `rawX` is `2`, `rawY` is undefined
* `()` stop condition: `rawX` is a prefilled object, `rawY` is undefined

### Another currying example
This is an even easier way of implementing currying in your application.

In this example we simply return `this`, which refers to the instance of the object, with all its setter methods intact.  Pretty straightforward, and we can keep chaining just like in the previous example:

```js
class Person {
  setFirstName(name) {
    this.firstName = name;
    return this;
  }

  setLastName(name) {
    this.lastName = name;
    return this;
  }

  setAge(age) {
    this.age = age;
    return this;
  }

  setLocation(location) {
    this.location = location;
    return this;
  }
}

let me = new Person();
me
 .setFirstName('David')
 .setLastName('Calhoun')
 .setAge(90)
 .setLocation('USA');

// -> Object { firstName: "David", lastName: "Calhoun", age: 90, location: "USA" }
```



## Footnotes
[^1]: A more [formal definition of partial application from Wikipedia](https://en.wikipedia.org/wiki/Partial_application): refers to the process of fixing a number of arguments to a function, producing another function of smaller arity (fewer arguments).  For instance, starting with function `add(x, y)` with an arity of 2 and producing a new function `addTwo(y)` with an arity of 1.

[^2]: A more [formal definition of currying from Wikipedia](https://en.wikipedia.org/wiki/Currying): "currying is the technique of translating the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single argument".  For instance, translating `add(x, y, z)` to three functions `add(x)(y)(z)`.

[^3]: This fat arrow syntax is equivalent to `function addTwo(y){ return add(2, y); }`.  I prefer fat arrow syntax in this case since it's simple enough, but I do believe that oftentimes more complex examples need to be written out the long, old way for clarity.  Priority should be given to clarity, over trying to fit everything onto one line.

[^4]: JavaScript is a functional language, which means that functions are first-class citizens.  They can be passed as arguments to other functions, and can be returned from other functions (check out [higher-order functions](https://en.wikipedia.org/wiki/Higher-order_function))!
