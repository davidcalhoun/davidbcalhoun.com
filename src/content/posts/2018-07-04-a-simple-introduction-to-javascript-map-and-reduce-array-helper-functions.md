---
title: "A Simple Introduction to Javascript Map and Reduce Array Helper Functions"
date: 2018-08-26
tags:
- javascript
- programming
- webdev
- map
- reduce
- functional programming
---

<link itemprop="mainEntityOfPage" href="https://en.wikipedia.org/wiki/JavaScript">

Perhaps you've been programming for a while, and you're pretty comfortable using `for` loops to traverse Arrays.  However, you know how untidy and complicated `for` loops can get, and you are interested in better approaches to keep the code clean.  Enter `map` and `reduce`!

## First steps with `for` loops
Most folks find `for` loops powerful enough to achieve all they need when they need to process items in an `Array`.  For example, say we have a simple list of items:

```js
const beatles = [
    {
        name: 'John Lennon',
        instrument: 'rhythm guitar'
    },
    {
        name: 'Paul McCartney',
        instrument: 'bass guitar'
    },
    {
        name: 'George Harrison',
        instrument: 'lead guitar'
    },
    {
        name: 'Ringo Starr',
        instrument: 'drums'
    }
];
```

Let's say that we want to display all their names in a Markdown list, which means we simply need to prefix each item's name with an asterisk and a space, e.g. `* John Lennon`.

Ok!  Seems easy enough.  Let's see how we'd do this with a loop:

```js
let beatleArray = [];
for (let index = 0; index < beatles.length; index++) {
    beatleArray.push(`* ${ beatles[index].name }`);
}
```

Here's the resulting array (`beatleArray`):

```js
[
    '* John Lennon',
    '* Paul McCartney',
    '* George Harrison',
    '* Ringo Starr'
]
```

## map()
`Map` gives us a far simpler way to achieve the above.  Have you ever heard the expression "mapped 1-to-1"?  That's an easy way to understand what `map` actually does.  Each item in the array is transformed and mapped into a new array which is returned (and therefore the input array length is the same as the output array length).

```js
const beatleArray = beatles.map(beatle => `* ${ beatle.name }`);
```

That's it!

No worries about having to initialize an array, create some temporary variable to iterate, then have to push each item piecemeal into the array.

### Controversial note
Note that loops will technically always be faster than `map` or `reduce`, because it doesn't require a function to be executed for each iteration.  Most of the time this probably will be negligible in terms of real-world app performance (and orders of magnitude smaller performance impact compared to anything involving DOM operations).

If you think this is enough reason to stick with `for` loops, I'd argue that you're prematurely optimizing.

## reduce()
Reduce is very similar to map, except the output array is a different length than the input array.  As it turns out, the output may not be an array at all!

As the name implies, most of the time this means *reducing* the length of the original array.  As such, reduce is quite powerful, as it can act as a filter and transformer in one go.

Without using reduce, let's filter out non-guitarists and also do the same Markdown transform we were doing above.

### Implementation 1: Old-style `for` loops
Let's see how we'd do this the old way.

```js
let beatleArray = [];
for (let index = 0; index < beatles.length; index++) {
    if (beatles[index].instrument.includes('guitar')) { // Note: includes() not available in IE11
        beatleArray.push(`* ${ beatles[index].name }`);
    }
}

/*
Output (sorry, Ringo):
[
    '* John Lennon',
    '* Paul McCartney',
    '* George Harrison'
]
*/
```

Not too bad.  Pretty readable but not really a functional approach.  Let's go one step further, just one step short of using reduce:

### Implementation 2: `filter` and `map`
```js
beatles
    .filter(beatle => beatle.instrument.includes('guitar'))
    .map(beatle => `* ${ beatle.name }`);
```

We could even further and make it explicitly clear what's happening (especially useful when the functions get largers):

```js
const filterGuitarPlayers = beatle => beatle.instrument.includes('guitar');

const nameToMarkdownList = beatle => `* ${ beatle.name }`;

beatles
    .filter(filterGuitarPlayers)
    .map(nameToMarkdownList);
```

This is pretty nice.  Actually, this works well enough and is actually more readable than `reduce`.

It's pretty clear what's going on here, and feels pretty clean and functional.  But suppose the original array is quite big?  Then we will be traversing the large list twice, which isn't ideal.  This brings us to `reduce`.

### Implementation 3: `reduce`

Now we can alternatively use `reduce`, which will allow us to filter and map while traversing the list only once:

```js
beatles.reduce((accumulator, beatle) => {
    return beatle.instrument.includes('guitar')
        ? accumulator.concat(`* ${ beatle.name }`)
        : accumulator;
}, []);

/*
Output array:

[
    '* John Lennon',
    '* Paul McCartney',
    '* George Harrison'
]

*/
```

This may look scary and confusing, but it's really not!  Let's break down what's happening:


```js
beatles.reduce(transformAccumulatorItem, initialAccumulator);
```

In the parlance of `reduce`, the "accumulator" is simply a collection, what eventually evolves into the final output.  It could technically be anything, but is usually an array, string, or an object (it can even be a `Map` or `Set`, but we won't get into those here).

The `initialAccumulator` is the "seed value" that is very much like the empty array we used to initialize before a `for` loop.  Ok, great, that's not so scary anymore!  Let's drop it in:

```js
beatles.reduce(transformAccumulatorItem, []);
```

The real meat is obviously this mysterious `transformAccumulatorItem`.  But it's easy: it's a function that takes two arguments: 1) the current accumulator state (the collection) and 2) one individual item from the array.  The output of this function is the new state of the accumulator (the collection).

This function is basically responsible for taking one item, assessing what to do with it, then returning the accumulator.  That's what makes it so powerful, and so flexible.

Just for instructive purposes, here's a silly example where we're just making an exact copy of the original array.  No filtering, no transforms, just a straight pass-through.

```js
beatles.reduce((accumulator, beatle) => accumulator.concat(beatle), []);
```

Here's another case where we want the output to be an object.  So we seed with an object and then progressively add keys to it:

```js
beatles.reduce((accumulator, beatle) => {
    accumulator[beatle.name] = beatle.instrument;
    return accumulator;
}, {});

/*
Output object:
{
  "John Lennon": "rhythm guitar",
  "Paul McCartney": "bass guitar",
  "George Harrison": "lead guitar",
  "Ringo Starr": "drums"
}
*/
```

Or maybe we just want the output to be a string.  We could easily `filter`, then `map`, then use `join` on the Array, or we could do it all in one go with `reduce`:

```js
beatles.reduce((accumulator, beatle) => {
    return beatle.instrument.includes('guitar')
        ? accumulator.concat(`* ${ beatle.name }\n`)
        : accumulator;
}, '');

/*
Output string (sorry again Ringo):

"* John Lennon
* Paul McCartney
* George Harrison
"

*/
```

## Conclusion
Ok, you're good to go!  You've seen how you probably code with `for` loops currently, and how you could improve those loops by using `map` and `reduce`.  Now it's up to you to get comfortable with them!  Keep practicing!