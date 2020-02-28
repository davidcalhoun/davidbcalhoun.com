---
title: When to base64 encode images (and when not to)
date: 2011-08-28
comments: true
author: David
layout: post
permalink: /2011/when-to-base64-encode-images-and-when-not-to
tags:
- webdev
- performance
---

### Introduction

Ever since Steve Souders started evangelizing web performance, it's been pounded into our heads that extra HTTP requests add a lot of additional overhead, and that we should combine them if possible to dramatically decrease the load time of our web pages.

The practical implication of this has been to combine our JavaScript and CSS files, which is relatively easy and straightforward, but the harder question has been what to do with images.

#### Sprites

Image sprites are a concept taken from video games: the idea is to cram a ton of image assets into one file, and rearrange a "viewport" of sorts to view only specific pieces of that file at a time. For instance, a simple sprite that holds two images might have one viewport that only looks at the top half of the sprite (image #1), and another viewport that only looks at the bottom half (image #2).

On the web side of things, this means that those multiple requests have now been combined into one request. This is nice because it saves both the overhead of additional HTTP requests as well as the overhead of setting up an image's [file header][1] each time.

But there's a few drawbacks with using image sprites:

*   hard to maintain and update: without some tool to help, manually editing and putting together image sprites is quite a chore
*   [increased memory consumption][2] (possibly very dramatic): this is often overlooked. The time to deliver the images is decreased at the expense of a bigger memory and CPU footprint, especially for large sprites and sprites with a lot of whitespace. 
*   bleedthrough: for sprites that don't have much whitespace to separate images, there's an increased chance of nearby images visibly bleeding through other elements, as in this case where bleedthrough was only seen on iOS (but looked fine on Chrome and Safari on the desktop). Note the bleedthrough under the CNN logo:[<img src="https://davidbcalhoun.com/wp-content/uploads/2011/08/image-sprite-bleedthrough-example.png" alt="Example of image sprite bleedthrough on Reddit" width="360" height="75" class="aligncenter size-full wp-image-1157" />][3]

#### Data URIs and Base64 encoding

Data URIs (see [this][4], [this][5], and [this][6]) and Base64 encoding goes hand-in-hand. This method allows you to embed images right in your HTML, CSS, or JavaScript.

Just like sprites, you save HTTP requests, but there's also some drawbacks:

*   base64 encoding makes file sizes [roughly 33% larger][7] than their original binary representations, which means more data down the wire (this might be exceptionally painful on mobile networks)
*   data URIs aren't supported on IE6 or IE7
*   base64 encoded data may possibly take longer to process than binary data (anyone want to do a study on this?) (again, this might be exceptionally painful for mobile devices, which have more limited CPU and memory) (side note: [CSS background-images seem to actually be faster than img tags][8])

The "33% larger" claim is generally accepted truth now, despite the fact that the figure varies wildly depending on the type of content. This is exactly what I wanted to test, albeit in a pretty limited and nonscientific way.

Before I tested, I wanted to keep in mind a few *unverified intuitions* (which aren't entirely my own, but seem to be ideas that are floating around out there). Here's a few questions I had before going to test:

*   Is base64 encoding with gzipping roughly equal to the original filesize of the binary file?
*   Is base64 encoding best for small images?
*   Is base64 encoding best for small and simple icons and not good for pictures and photos?
*   Is base64 encoding best when multiple files are merged together?

There's something else I wanted to test: whether Gzipping binary image data made much difference. I know text compresses well, but is it even worth compressing JPEG files with Gzip, for instance?

I ran three tests: one with a set of small UI icons, one with a set of small photographs, and one with a set of the same photographs in a larger size. Though my tests were by no means extensive, they do show that care should be taken in making assumptions about base64.

Just a note about the tables: they are comparing the binary form (original png or jpeg) with the base64 form as it would appear in a CSS stylesheet, and comparing each of those with their gzipped form, which is most likely how they would be sent down the wire. The CSS representation has a few practical declarations and looks something like this:

```css
.address-book--arrow {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAp1JREFUeNqEU21IU1EYfu7unW5Ty6aBszYs6MeUjGVYokHYyH5E1B9rZWFEFPQnAwmy6Hc/oqhfJsRKSSZGH1JIIX3MNCsqLTD9o1Oj6ebnnDfvvefezrnbdCHhCw/n433P8z7nPe/hBEEAtX0U7hc164uwuvVSXKwZLoOmaRDim+7m9vZa0WiEKSUFFpNpCWlmMyypqTDRuYn6t3k8vmQ2gRDCxs0t9fW45F52aBTROJLtZl7nEZad2m+KtoQCQ0FBARyOCGRZ/q92I1WgqqXlfdd95VsrK8/pChIEqqpCkiQsiCII0aBQZZoWl8lzFDwsFjMl0DBLY8Lj41hBwK4jSQrWOIphL6xYyhwJDWGo6wFSaH1Y3PTCAsITE1oyAa8flhWkbSiCLX8vun11eiGIpiJ/z2nYdx5HqLdVV7elrOzsuqysL3rmBIGiKPizKCHHWY4PLVeQbnXAdegqdhy+hu8dDTBnbqQJZJ1A7u+vz7RaiymWCZgCRSF6Edk8b9cx+B/W6WuVxPaZnyiqXoPpyUmVYvkKTIFClHigEieKjYuSvETUllaF4GAUM1NT6ooaJDKx+aDfC9fByxj90REb+9ppmIoAscH/6leg8MS9DJXPAM9xHCM443K57C6biMjcHDaVVCHw9RmCA2/RGC5C00AqXk/m4p20HZK4CM/J3Zk9n0ecMBhDQnJHcrTisyMfdQXOilrdMfxcwoHq/fg5R59TiQV3hYGKo6X2J/c7LyQIjOx9GXhOw/zoJ8wEevRGyp53o/lGMNYsBgPtEwLecwov7/jGDKa1twT6o3KpL4MdZgGsWZLtfPr7f1q58k1JNHy7YYaM+J+K3Y2PmAIbRavX66229hrGVvvL5uzsHDEUvUu+NT1my78CDAAMK1a8/QaZCgAAAABJRU5ErkJggg==);  
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
}
```

Ok, onto the tests!

### Test #1: Five 16&#215;16 icons from the [Fugue Icon set][9] (PNG)

| File          | Binary         | Binary Gzipped | CSS + Base64   | CSS + Base64 Gzipped  |
| ------------- | :------------- | :------------- | :------------- | :-------------------- |
| abacus | 1443 | ***1179*** | 2043 | 1395 |
| acorn | 1770 | ***1522*** | 2478 | 1728 |
| address-book-arrow | ***763*** | 810 | 1153 | 948 |
| address-book-exclamation | ***795*** | 848 | 1199 | 988 |
| address-book-minus | ***734*** | 781 | 1113 | 919 |
| Total | 5,505 | ***5,140*** | 7,986 | 5,978 |
| Combined file | (5,505) | ***(4,128)*** | 7,986 | 4,423 |

* All numbers are byte sizes  
** Numbers in parenthesis represent actual but impractical data. Unfortunately, images cannot be combined and delivered together in their binary form.

Takeaways:

*   The binaries are always smaller.
*   Sometimes Gzipping makes the files larger.
*   Gzipping the base64 version brings the filesize close to the size of the original binary, but this ignores the fact that the binaries get Gzipped as well. The Gzipped binaries (how they would be delivered to the client) are always smaller than the Gzipped base64 images
*   Combining files together dramatically reduces filesizes.

Practically, the developer has two options: deliver 5,140 bytes to the user in 5 separate HTTP requests, or 4,423 bytes in one HTTP request (CSS with base64 encoded image data). Base64 is the clear winner here, and seems to confirm that small icons compress extremely well.

### Test #2: Five Flickr 75&#215;75 Pictures (JPEG)

| File          | Binary         | Binary Gzipped | CSS + Base64   | CSS + Base64 Gzipped  |
| ------------- | :------------- | :------------- | :------------- | :-------------------- |
| <a href="https://www.flickr.com/photos/franksvalli/6064665766/sizes/sq/in/photostream/">1</a> | 6734 | ***5557*** | 9095 | 6010 |
| <a href="https://www.flickr.com/photos/franksvalli/6064638202/sizes/sq/in/photostream/">2</a> | 5379 | ***4417*** | 7287 | 4781 |
| <a href="https://www.flickr.com/photos/franksvalli/6063380824/sizes/sq/in/photostream/">3</a> | 25626 | ***18387*** | 34283 | 20103 |
| <a href="https://www.flickr.com/photos/franksvalli/6062803159/sizes/sq/in/photostream/">4</a> | 7031 | ***6399*** | 9491 | 6702 |
| <a href="https://www.flickr.com/photos/franksvalli/6017796233/sizes/sq/in/photostream/">5</a> | 5847 | ***4655*** | 7911 | 5077 |
| Total | 50,617 | ***39,415*** | 68,067 | 42,673 |
| Combined file | (50,617) | ***(36,838)*** | 68,067 | 40,312 |


Takeaways:

*   (some of the same takeaways as Test #1)
*   Separately, photos aren't too much bigger when base64 encoded and Gzipped. It's very much within reason.

Practically, the developer can deliver 39,415 bytes in 5 separate requests, or 40,312 in 1 request. Not much filesize difference here, but 1 request seems preferable when we're talking about 40kb.

### Test #3: Five Flickr 240&#215;160 Pictures (JPEG)

| File          | Binary         | Binary Gzipped | CSS + Base64   | CSS + Base64 Gzipped  |
| ------------- | :------------- | :------------- | :------------- | :-------------------- |
| 1 | 24502 | ***23403*** | 32789 | 23982 |
| 2 | 20410 | ***19466*** | 27333 | 19954 |
| 3 | 43833 | ***36729*** | 58561 | 38539 |
| 4 | 31776 | ***31180*** | 42485 | 31686 |
| 5 | 21348 | ***20208*** | 28581 | 20761 |
| Total | 141,869 | ***130,986*** | 189,749 | 134,922 |
| Combined file | (141,869) | ***(129,307)*** | 189,749 | 133,615 |


Takeaways:

*   (some of the same takeaways as Test #1)
*   Larger photos seem to bring the Gzipped binary and Gzipped base64 filesizes MUCH closer together, making the difference very minimal

The developer must choose between delivering 130,986 bytes in 5 HTTP requests, or 133,615 bytes in one HTTP request. Any good Souders follower would opt for the one request, BUT I would be careful here...

#### Caution: things aren't always as they seem

There's a huge caveat here: it may actually be more beneficial for perceived performance to deliver the images in 5 separate requests.

Why? Because 133,615 bytes is a lot to deliver all in one package to an end user who will be staring at blank placeholders for the duration. If the 5 base64 images all come in one request, that request will have to complete before ANYTHING is shown on the screen. All 5 images go from blank placeholders to almost immediately decoded from base64 and displayed in place.

Compare this with 5 requests that are most likely made in parallel and actually give a visual indicator to the user that actual image content is being downloaded, by showing parts of the images as they're downloaded (you can also try a throwback to progressive JPEGs - really anything will be better than just a blank screen). That's why it might actually be beneficial for *perceived* performance to just load images in the good old fashioned way. They will most likely load in parallel anyway, so the extra HTTP requests may actually not really make a difference. Not to mention it will be easier to let the browser manage the cache for each file instead of having to make your JavaScript manage your cache and prevent you from downloading an image that's already stored away in localStorage or sessionStorage.

This being said, it's generally advisable to put your common UI icons in base64 in your CSS, then let that whole chunk get cached by the browser. Those are usually clean vector icons as well, which seem to get compressed quite well (see Test #1).

But for image content, where there is nothing to be saved but HTTP requests, you should definitely think twice about base64 encoding to save requests. Yes, you will save a few HTTP requests, you won't really be saving bytes, and the user might actually think the experience is slower because they can't see the image content as it's being downloaded. Even if you shave off a few milliseconds of wait time, the *perceived* performance is what matters most.

(EDIT: changed the wording of the "unverified intuitions" section from "not verified" to actual questions, to make it clearer)

EDIT May 2013: added an example of sprite bleedthrough

 [1]: https://en.wikipedia.org/wiki/Portable_Network_Graphics#File_header
 [2]: https://web.archive.org/web/20110810152343/https://blog.vlad1.com/2009/06/22/to-sprite-or-not-to-sprite/
 [3]: https://www.davidbcalhoun.com/wp-content/uploads/2011/08/image-sprite-bleedthrough-example.png
 [4]: https://www.phpied.com/data-urls-what-are-they-and-how-to-use/
 [5]: https://css-tricks.com/data-uris/
 [6]: https://humanwhocodes.com/blog/2010/07/06/data-uris-make-css-sprites-obsolete/
 [7]: https://en.wikipedia.org/wiki/Base64
 [8]: https://twitter.com/stoyanstefanov/status/106605257265655809
 [9]: https://p.yusukekamiyamane.com/