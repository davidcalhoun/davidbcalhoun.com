---
title: Dealing with device orientation (Mobile web part 6)
date: 2010-08-24
comments: true
author: David
layout: post
permalink: /2010/dealing-with-device-orientation
tags:
  - javascript
  - webdev
  - mobile
  - media queries
  - orientation
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

### Introduction

If you read [part 4][1] of this series, you'll know that because of the variety of screen sizes, the best way to develop for mobile is to develop fluid layouts that take 100% of the available space on the screen.

What you probably didn't think of is that there's different screen widths _even on the same device_! This is due to screen orientation. And when the user changes the screen orientation, stuff may break (hey, it's not a perfect world). In my experience this has meant needing to tweak percentage widths on elements, but I imagine there's even more needs. Imagine an image carousel that can only fit three images across in portrait mode but can possibly fit four images in landscape mode. It might be nice to re-initialize the carousel to accommodate a forth image when the phone is in landscape mode (then again, that might create a lot of unnecessary overhead...).

In any case, I hope you can agree that it would sometimes be useful to know the screen orientation.

### `window.orientation` and the `orientationchange` event

Luckily on the latest smartphones you have some goodies available to you that you don't have on the desktop (since desktop users aren't in the habit of constantly turning their screens sideways!).

- `window.orientation`: this property gives the current screen orientation: 0 in portrait mode, 90 when rotated left, -90 when rotated right (no special value when the screen is upside-down)

- `orientationchange` event: this window event fires after every 90 degrees of rotation and, like other events, [can be applied in various ways][2]:

```js
// DOM Level 0 (avoid)
window.onorientationchange = function () {};

// DOM Level 2
window.addEventListener("orientationchange", function () {}, false);
```

[Some websites][3] recommend using `orientationchange` to dynamically add an `orient` attribute on the `body` element and target the orientation with CSS selectors (`body[orient=landscape]`), _but this is in error_. As it turns out, `orientationchange` is only fired AFTER the screen has been rotated (which also [triggers a CSS reflow][4]), which means this attribute is updated later (after the reflow). And unfortunately editing this `orient` attribute doesn't trigger another CSS reflow. The result? When you rotate the device, these new CSS styles don't get applied!

The fix is to add the orientation as a CSS class, which does trigger a CSS reflow. So our code at this point will look something like this:

```js
(function () {
  var init = function () {
    var updateOrientation = function () {
      var orientation = window.orientation;

      switch (orientation) {
        case 90:
        case -90:
          orientation = "landscape";
          break;
        default:
          orientation = "portrait";
      }

      // set the class on the HTML element (i.e. )
      document.body.parentNode.setAttribute("class", orientation);
    };

    // event triggered every 90 degrees of rotation
    window.addEventListener("orientationchange", updateOrientation, false);

    // initialize the orientation
    updateOrientation();
  };

  window.addEventListener("DOMContentLoaded", init, false);
})();
```

Now we can target elements like this in CSS:

```css
.portrait body div {
  width: 10%;
}
.landscape body div {
  width: 15%;
}
```

### With a little help from media queries

You may have heard of <a href="https://developer.mozilla.org/en/css/media_queries">media queries</a> being used to target mobile devices (based on screen pixel width) or to <a href="http://www.bdoran.co.uk/2010/07/19/detecting-the-iphone4-and-resolution-with-javascript-or-php/">target the iPhone 4's Retina display</a>, but you may not have known that you can also target screen orientation!

```css
@media all and (orientation: portrait) {
  body div {
    width: 10%;
  }
}

@media all and (orientation: landscape) {
  body div {
    width: 15%;
  }
}
```

The orientation media query is available on iOS 3.2+, Android 2.0+, and some other browsers.

This is a lot cleaner than the above JavaScript example in the sense that it's pure CSS, and it's part of the CSS that gets reflowed when the screen is rotated.

(Minor note: iOS 4 on the iPhone Simulator running 4.0.0 looks like it's stuck in landscape orientation, but the media queries work correctly on my 3GS with 4.0.1)

### Fallback: when window.orientation and media queries aren't available...

If `window.orientation` isn't available on a device, chances are the `orientationchange` event and media queries (for orientation) will also not be available. Oh no, what do we do now?

Even though this isn't an entirely foolproof method, we can dynamically measure the window width and height and guess orientation based on that:

```js
(function () {
  var HTMLNode = document.body.parentNode;
  var updateOrientation = function () {
    // landscape when width is biggest, otherwise portrait
    var orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";

    // set the class on the HTML element (i.e. )
    HTMLNode.setAttribute("class", orientation);
  };
  var init = function () {
    // initialize the orientation
    updateOrientation();

    // update every 5 seconds
    setInterval(updateOrientation, 5000);
  };
  window.addEventListener("DOMContentLoaded", init, false);
})();
```

Ok, so it's not pretty, but it seems to work. The overhead in this fallback example is the fact that we have to use a polling technique (in this case every 5 seconds [5000 milliseconds]) to check for changes in orientation.

Note: there's also the strong possibility that these browsers will not support the `DOMContentLoaded` event, but we'll ignore that for the purposes of this article. (if you have problems, change `DOMContentLoaded` to `load`).

### Putting it all together

Ok, so if you want the fallback example to work in addition to newer methods, unless you want to duplicate your CSS, then avoid using media queries to target orientation. Instead we'll rely on adding a class to the `html` tag (or the `body` tag if you prefer).

Once we put everything together, we get something that looks like this:

```js
(function () {
  var supportsOrientation =
    typeof window.orientation == "number" &&
    typeof window.onorientationchange == "object";
  var HTMLNode = document.body.parentNode;
  var updateOrientation = function () {
    // rewrite the function depending on what's supported
    if (supportsOrientation) {
      updateOrientation = function () {
        var orientation = window.orientation;

        switch (orientation) {
          case 90:
          case -90:
            orientation = "landscape";
            break;
          default:
            orientation = "portrait";
        }

        // set the class on the HTML element (i.e. )
        HTMLNode.setAttribute("class", orientation);
      };
    } else {
      updateOrientation = function () {
        // landscape when width is biggest, otherwise portrait
        var orientation =
          window.innerWidth > window.innerHeight ? "landscape" : "portrait";

        // set the class on the HTML element (i.e. )
        HTMLNode.setAttribute("class", orientation);
      };
    }

    updateOrientation();
  };
  var init = function () {
    // initialize the orientation
    updateOrientation();

    if (supportsOrientation) {
      window.addEventListener("orientationchange", updateOrientation, false);
    } else {
      // fallback: update every 5 seconds
      setInterval(updateOrientation, 5000);
    }
  };
  window.addEventListener("DOMContentLoaded", init, false);
})();
```

Minified (540 bytes):

```js
(function () {
  var e =
      typeof window.orientation == "number" &&
      typeof window.onorientationchange == "object",
    f = document.body.parentNode;
  function c() {
    c = e
      ? function () {
          var d = window.orientation;
          switch (d) {
            case 90:
            case -90:
              d = "landscape";
              break;
            default:
              d = "portrait";
          }
          f.setAttribute("class", d);
        }
      : function () {
          f.setAttribute(
            "class",
            window.innerWidth > window.innerHeight ? "landscape" : "portrait"
          );
        };
    c();
  }
  window.addEventListener(
    "DOMContentLoaded",
    function () {
      c();
      e
        ? window.addEventListener("orientationchange", c, false)
        : setInterval(c, 5e3);
    },
    false
  );
})();
```

### Conclusion

And that's it! Now we can reliably target different screen orientations with some straightforward CSS:

```css
.portrait body div {
  width: 10%;
}
.landscape body div {
  width: 15%;
}
```

Again, in my experience I've used this to fix bugs. But I'm sure you can find more creative uses for it!

### Related

<a href="http://www.nczonline.net/blog/2010/04/06/ipad-web-development-tips/">iPad web development tips (Nicholas C. Zakas)</a><br />
<a href="http://ajaxian.com/archives/iphone-windowonorientationchange-code">iPhone window.onorientationchange Code (Ajaxian)</a><br />
<a href="http://www.quirksmode.org/blog/archives/2010/04/the_orientation.html">The orientation media query (Quirksmode)</a>

### More from the Mobile Web series:

- <a href="https://www.davidbcalhoun.com/2010/viewport-metatag">Part 1: The viewport metatag</a><br />
- <a href="https://www.davidbcalhoun.com/2010/the-mobile-developers-toolkit-mobile-web-part-2">Part 2: The mobile developer’s toolkit</a><br />
- <a href="https://www.davidbcalhoun.com/2010/designing-buttons-that-dont-suck">Part 3: Designing buttons that don’t suck</a><br />
- <a href="https://www.davidbcalhoun.com/2010/on-designing-a-mobile-webpage">Part 4: On designing a mobile webpage</a><br />
- <a href="https://www.davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript">Part 5: Using mobile-specific HTML, CSS, and JavaScript</a><br />
- <a href="https://www.davidbcalhoun.com/2010/dealing-with-device-orientation">Part 6: Dealing with device orientation</a><br />
- <a href="https://www.davidbcalhoun.com/2010/mobile-javascript-libraries-and-frameworks">Part 7: Mobile JavaScript libraries and frameworks</a>

[1]: https://www.davidbcalhoun.com/2010/on-designing-a-mobile-webpage
[2]: http://en.wikipedia.org/wiki/DOM_events
[3]: http://www.iphonemicrosites.com/articles/6-tips-to-optimize-your-current-site-for-the-iphone/
[4]: http://www.stubbornella.org/content/2009/03/27/reflows-repaints-css-performance-making-your-javascript-slow/
