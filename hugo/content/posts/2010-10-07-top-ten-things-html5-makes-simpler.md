---
title: Top ten things HTML5 makes simpler
date: 2010-10-07
comments: true
author: David
layout: post
permalink: /2010/top-ten-things-html5-makes-simpler
tags:
  - async
  - autofocus
  - cache manifest
  - charset
  - defer
  - doctype
  - html5
  - localStorage
  - placeholder
  - sessionStorage
  - video
  - html
  - webdev
---

General word of caution: not all of these HTML5 simplifications are compatible with older browsers. Test it for yourself before implementing!

### 1. The doctype

#### Old
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
"http://www.w3.org/TR/html4/strict.dtd">
```

#### New
```html
<!DOCTYPE html>
```

### 2. charset

#### Old
```html
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
```

#### New
```html
<meta charset="utf-8">
```


### 3. The link tag’s `type` attribute

#### Old
```html
<link href="style.css" type="text/css" rel="stylesheet" />
```

#### New
```html
<link href="style.css" rel="stylesheet" />
```

This one may be a bit controversial, but the HTML5 spec actually tells browser vendors not to treat the `type` attribute as the final word, which makes it seem pretty redundant:

> User agents must not consider the type attribute authoritative — upon fetching the resource, user agents must not use the type attribute to determine its actual type. Only the actual type (as defined in the next paragraph) is used to determine whether to apply the resource, not the aforementioned assumed type.
>
> -[W3C HTML5 spec](http://w3c.github.io/html/#the-link-element)

The spec then goes on to state that the browser must effectively determine the type by examining the `Content-Type` sent back in the header from the server when requesting the CSS file. If this extra work is already being performed and there’s no noticeable downside of omitting the `type` attribute, then it seems pretty redundant. Save the extra bytes by omitting it!

### 4. The script tag’s `type` attribute

#### Old
```html
<script src="script.js" type="text/javascript"></script>
```

#### New
```html
<script src="script.js"></script>
```

According the the W3C, if the `type` attribute isn’t present, it should default to `text/javascript`:

> The type attribute gives the language of the script or format of the data. If the attribute is present, its value must be a valid MIME type. The charset parameter must not be specified. The default, which is used if the attribute is absent, is “text/javascript”.
> 
> -[W3C HTML5 spec](http://w3c.github.io/html/#script)

### 5. The script tag’s `async` and `defer` attributes

Moving scripts to the bottom of a document is [one of the top performance tips](http://developer.yahoo.com/performance/) and one of the easiest ways to speed up a website. This is because script downloading (in older browsers) and parsing/executing is done synchronously, that is, in a way which blocks everything else which comes after them.

It’s not too hard to move the scripts to the bottom, but wouldn’t it be handy if there was an attribute we could add on the script to make it behave, no matter where it’s located? Now there is! Check out the async attribute:

```html
<script async src="script.js"></script>
```

This tells the browser to download and execute the script asynchronously, without blocking the rendering of elements below it. There’s one catch: scripts with this attribute aren’t guaranteed to run in the order they appear in the document, which is their default behavior when the `async` attribute isn’t present. So be careful or this will definitely lead to code dependency issues.

The `defer` attribute is an older attribute with a similar goal:

```html
<script defer src="script.js"></script>
```

Believe it or not, this attribute was first implemented in IE4! It tells the browser the same thing: to download and execute the script in such a way that it doesn’t block the elements below it from rendering. The difference from `async` is that `defer` executes the scripts in the order they appear in the document.

### 6. placeholder and autofocus attributes

The `placeholder` attribute can be added to `input` and `textarea` elements.  This is a piece of interaction that was originally accomplished with a bit of JavaScript: placeholder text (usually gray in appearance) appears in a text field, but disappears when the user focuses on it (and reappears if the user moves focus without typing any text).

```html
<input type="text" placeholder="Search">
<textarea type="text" placeholder="Search"></textarea>
```

Similarly, the `autofocus` attribute creates some interaction that was originally developed with JavaScript: when the page loads, focus on a specified form element. Now all you have to do is add the attribute to make the same thing work with without JavaScript! The `autofocus` tag can be added to `input`, `select`, `textarea`, and `button` tags:

```html
<input type="text" autofocus></input>
```

### 7. JavaScript: localStorage and sessionStorage

When coding JavaScript, instead of having to deal with cookies, which are quite limiting in terms of storage space, you now have the option to use `localStorage` and `sessionStorage`.

The size limit may depend on the browser, but it seems to have been set at a minimum of 5mb per domain. It may also be the case that the size limit for sessionStorage may be larger (which [seems to be the case for IE8 and possibly IE9](https://social.msdn.microsoft.com/Forums/ie/en-US/1fe562b8-1a16-42ca-a02f-280630958bcc/only-5mb-in-ie8-dom-local-storage?forum=iewebdevelopment)).

It should be noted, if it wasn’t immediately obvious from their names, that `localStorage` data persists across sessions and `sessionStorage` data persists only for the length of the browser session.

It should also be noted that data can only be stored in this way in key-value pairs, where the values can only be strings. This presents a problem when trying to store JSON objects, and requires you to go through the extra step of using `JSON.stringify(myObj)` before storing your data.

Here’s an example of how easy it is to use `localStorage` and `sessionStorage`:

```js
// localStorage - data can be retrieved by the site after user closes the browser!
localStorage.userName = "Biff Tannen";

// sessionStorage - data only persists for the current session
sessionStorage.userMood = "Angry";
```


### 8. Caching

Traditionally, you could only control caching on your website through primarily headers (Cache-Control and Expires headers). Now through the use of the [cache manifest](http://diveintohtml5.org/offline.html), developers have more control over which components they want to be cached. Theoretically, controlling this caching is now as easy as changing one file (instead of having to change server configurations and such).

Setting up the cache manifest is relatively easy:

1. Add this line to your `.htaccess` file or Apache configuration: `AddType text/cache-manifest .manifest`
1. Create a file. For this example we’ll call it `cache.manifest`.  This file contains a list of files that should be cached:
```
CACHE MANIFEST
# version 1
/style.css
/script.js
/image.jpg
```
1. Add the manifest attribute on the `html` element, pointing to your `cache.manifest` file:
```js
<html manifest="/cache.manifest">
```

Now these files specified will be cached. They will only be redownloaded if our `cache.manifest` file is changed in any way. That’s why there’s a comment with the version number. Simply update the version to force the browser to redownload the files:

```
CACHE MANIFEST
# version 2
/style.css
/script.js
/image.jpg
```

### 9. Form input validation
HTML5 has a ton of new features for forms, one of which is handy form validation which requires no JavaScript. In the days before Ajax, form validation was perhaps the most useful feature of JavaScript, giving developers the ability to prevent unnecessary roundtrips to the server for forms with incomplete or invalid data.

Now you can use the `required` attribute to make sure a particular input is filled out. The browser won’t send the form without the completed input:

```html
<input type="text" name="email" required>
```

There’s much more to be said about improvements to forms in general, in addition to some other handy form validation tools such as the [`min` and `max` attributes](http://dev.w3.org/html5/spec/Overview.html#the-min-and-max-attributes) and the [`pattern` attribute](http://dev.w3.org/html5/spec/Overview.html#the-placeholder-attribute).


### 10. Video (and [audio](http://html5doctor.com/native-audio-in-the-browser/))

#### Old
The old way - a common example using a Flash container in an object:

```html
<object width="500" height="350">
  <param name="movie" value="flashcontainer.swf">
  <embed src="flashcontainer.swf" width="500" height="350">
  </embed>
</object>
```

#### New
```html
<video id="movie" width="500" height="350" controls>
  <source src="movie.mp4" />
  <source src="movie.webm" type='video/webm; codecs="vp8, vorbis"' />
  <source src="movie.ogv" type='video/ogg; codecs="theora, vorbis"' />
</video>
```

Ok, so the simplicity of this one is the most debatable. The thing that’s tricky about this is that you have to encode the movie into several different formats, because of the differing implementations on browsers out there.

Also, here’s an example with a Flash fallback (read more [here](http://diveintohtml5.org/video.html)):

```html
<video id="movie" width="500" height="350" controls>
  <source src="movie.mp4" />
  <source src="movie.webm" type='video/webm; codecs="vp8, vorbis"' />
  <source src="movie.ogv" type='video/ogg; codecs="theora, vorbis"' />
  <object width="500" height="350">
    <param name="movie" value="flashcontainer.swf">
    <embed src="flashcontainer.swf" width="500" height="350">
    </embed>
  </object>
</video>
```

### Related
* [Basic HTML5 template](https://www.davidbcalhoun.com/2010/basic-html5-template)
* [W3C: HTML5 differences](http://www.w3.org/TR/html5-diff/)
