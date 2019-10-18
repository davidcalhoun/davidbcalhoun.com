---
title: "Matching Accented Strings in Javascript"
date: 2019-10-10
draft: false
tags:
- javascript
- regexp
- criterion
---

## The problem: accented characters versus user input
I've really been enjoying (wait for it, unpaid endorsement) [The Criterion Channel](https://www.criterionchannel.com/) since it launched earlier this year.  The app and the website are nascent and therefore have had their share of problems, but to their credit they have been hard at work making things smoother day by day.

But one big annoying thing in general is searchability of films in general.  Recently I found a [reddit post](https://www.reddit.com/r/criterion/comments/ddg08d/channel_software_engineers_your_input_validation/) revealing another big search annoyance: bad handling of matching strings with accented titles, particularly when searching for 'samourai' and expecting 'Le Samouraï' to pop up in the results:

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="700" />
    <meta itemprop="height" content="496" />
    <meta itemprop="url" content="https://www.davidbcalhoun.com/wp-content/uploads/2019/criterion-search-without-diacritic.gif" />
    <a href="https://www.davidbcalhoun.com/wp-content/uploads/2019/criterion-search-without-diacritic.gif">
        <img itemprop="contentUrl" src="https://www.davidbcalhoun.com/wp-content/uploads/2019/criterion-search-without-diacritic.gif" title="Searching for 'samourai' without a diacritic yields no results :(" />
    </a>
    <figcaption itemprop="caption">Searching for 'samourai' without a diacritic yields no results :(</figcaption>
</figure>

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="700" />
    <meta itemprop="height" content="496" />
    <meta itemprop="url" content="https://www.davidbcalhoun.com/wp-content/uploads/2019/criterion-search-with-diacritic.gif" />
    <a href="https://www.davidbcalhoun.com/wp-content/uploads/2019/criterion-search-with-diacritic.gif">
        <img itemprop="contentUrl" src="https://www.davidbcalhoun.com/wp-content/uploads/2019/criterion-search-with-diacritic.gif" title="Successful exact match only when the user types in an 'i' with a diacritic (ï)" />
    </a>
    <figcaption itemprop="caption">Successful exact match only when the user types in an 'i' with a diacritic (ï).  (note: the original search text also disappears, another bug!)</figcaption>
</figure>

The Criterion Collection is home to many foreign films, so it's natural that many of the titles would have accents, so this is a bit unfortunate for their users.

## First steps at a solution
I used this as an opportunity to learn something new!  I realized that I didn't immediately know how to solve for this either.  A simple regexp was no help:

```js
// Only works because there's no accented characters.
'Le Samourai'.match(/samourai/i);
// -> ['Samourai']

// ...but once we introduce accented characters, our naïve implementation blows up...
'Le Samouraï'.match(/samourai/i);
// -> null
```

I had to go digging a bit to figure out how to make progress...

This [great answer by Lewis Diamond on Stackoverflow](https://stackoverflow.com/a/37511463/214017) lead the way to [String.prototype.normalize()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize), but before we jump into that, first we need to take care of some prerequisites with a super brief Unicode overview.

Like many other Unicode characters, what appears to be just one simple character `'ï'` can actually be represented in two different ways which are displayed identically as `'ï'`:

* `'\u00ef'` ('Latin Small Letter I with Diaeresis')
* `'\u0069\u0308'` ('Latin Small Letter I' plus 'Combining Diaeresis')

Unicode generally calls the first the composed/precomposed form, while the second is decomposed into two symbols ('i' and the [diacritic](https://en.wikipedia.org/wiki/Diaeresis_(diacritic))).

## Side note: with Unicode, things are not always as they appear...
What is somewhat strange is that though the Unicode characters display exactly the same way and are considered [Unicode equivalent](https://en.wikipedia.org/wiki/Unicode_equivalence), in JavaScript they are not equal:

```js
'ï' === '\u00ef';        // true
'ï' === '\u0069\u0308';  // true

// You may then think that the following must be true in JavaScript (transitive equality), but you'd be wrong!

'\u00ef' === '\u0069\u0308';  // false
// Note that the line above may display as 'ï' === 'ï', but it will still evaluate to false!
```

## Removing diacritics

What is most interesting for us here is that we can actually take the decomposed form `'\u0069\u0308'` and **remove** the diacritic (the two dots) simply by removing the symbol `'\u0308'` ('Combining Diaeresis'):

```js
// Before: with accent
'ï' === '\u0069\u0308';

// After: violà!  accent removed
'i' === '\u0069';
```

That's looking a lot closer to what the original user input was, and will make things easier to match.  Sort of like converting two strings using `toLowerCase()` to check their case-insensitive equivalence.

It turns out that all diacritics have a predictable Unicode range, so we can easily remove any diacritics with a regexp character range:

```js
'\u0069\u0308'.replace(/[\u0300-\u036f]/g, '');
// -> 'i'
```

One big catch though - this will only work for decomposed symbols.  What happens if we get a composed symbol?  We'd be stuck, since we can't break it apart into separate character and diacritic symbols...

...or ***can*** we?

## ***`String.prototype.normalize()` to the rescue!***

This handy function can convert Unicode characters between their composed and decomposed forms:

```js
// Remember, though Unicode equivalent and identical in display, this is false...
'\u0069\u0308' === '\u00ef';  // false

// BUT we can use String.prototype.normalize() to help out!

// To composed form ('NFC' means Normalization Form Canonical Composition)
'\u0069\u0308'.normalize('NFC') === '\u00ef';  // true

// To decomposed form ('NFD' means Normalization Form Canonical Decomposition)
'\u00ef'.normalize('NFD') === '\u0069\u0308';  // true
```

This normalization allows us to easily convert to decomposed form, so our regexp above will correctly remove diacritics.  We can now put together the pieces (pun intended) and make a basic helper function to remove accents (diacritics):

```js
const removeDiacritics = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

// Let's try it out!
removeDiacritics('àbçdëfghïjklmñöpqrśtüvwxÿž');
// -> 'abcdefghijklmnopqrstuvwxyz'
```

## Complete example code
Now we can put it all together into a working example that would solve the original problem with user input in the Criteria Channel's website:

```js
// Strips diacritics from a string
// Example: removeDiacritics('ï') -> 'i'
const removeDiacritics = str => {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
}

// Determines if a haystack contains a needle.  Case and accent insensitive.
// Example: normalizedContains('Le Samouraï', 'I') -> true
const normalizedContains = (haystack, needle) => {
  const regExp = new RegExp(removeDiacritics(needle), 'gi');
  return regExp.test(removeDiacritics(haystack));
}

// Returns all films matching the input string.  Case and accent insensitive.
const findMatchingFilms = (strToMatch, films) => {
  return films.filter(filmTitle => normalizedContains(filmTitle, strToMatch))
}

// List of all films available (shortened for this example of course!)
const allFilms = [
  'Le Samouraï',
  'House',
  'The Samourai Witches From Gomorrah',
  'Black Narcissus',
  'Citizen Kane',
  'Citizen Samourai'
]

console.log(findMatchingFilms('samourai', allFilms));
// -> ["Le Samouraï", "The Samourai Witches From Gomorrah", "Citizen Samourai"]
```

## References
* https://stackoverflow.com/a/37511463/214017
* https://dmitripavlutin.com/what-every-javascript-developer-should-know-about-unicode/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
* https://en.wikipedia.org/wiki/Precomposed_character
