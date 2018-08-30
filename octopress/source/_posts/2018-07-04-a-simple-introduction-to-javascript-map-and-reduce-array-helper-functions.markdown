---
layout: post
title: "A simple introduction to JavaScript map() and reduce() (Array helper functions)"
date: 2018-07-04 16:39:53 -0700
comments: true
categories: ["webdev", "javascript", "programming"]
---

## First steps with `for` loops
Most folks find `for` loops powerful enough to achieve all they need when they need to process items in an `Array`.  For example, say we have a simple list of items:

``` js
const beatles = [
	'John Lennon',
	'Paul McCartney',
	'George Harrison',
	'Ringo Starr'
];
```

Let's say that we want to display all these names in a Markdown list, which means we simply need to prefix each item with an asterisk and a space, e.g. `* John Lennon`.

Ok!  Seems easy enough.  Let's see how we'd do this with a loop:

``` js
const beatles = [
	'John Lennon',
	'Paul McCartney',
	'George Harrison',
	'Ringo Starr'
];

let beatlesMarkdown = [];
for (let index = 0; index < beatles.length; index++) {
	beatlesMarkdown.push(`* ${ beatles[index] }`);
}
```

Here's the resulting array, which we've put into `beatlesMarkdown`:

``` js
[
	'* John Lennon',
	'* Paul McCartney',
	'* George Harrison',
	'* Ringo Starr'
]
```

(note the extra line break at the end, which isn't too big of a deal in this case, but could be annoying for other use cases)

## map()

## reduce()

