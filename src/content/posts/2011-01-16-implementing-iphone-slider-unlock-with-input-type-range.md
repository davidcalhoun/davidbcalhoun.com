---
title: "Implementing iPhone's slider unlock with input type='range'"
date: 2011-01-16
comments: true
author: David
layout: post
aliases:
  - /2011/implementing-iphone-slider-unlock-with-input-type-range/
tags:
  - css
  - iphone
  - demo
  - webdev
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

(check out the live [demo][1])

### Introduction

After reading ["What the Heck is Shadow DOM?"][2] I was inspired to see how far I could style the `<input type="range">` element. Pretty far, as it turns out!

My goal was to change the input's default appearance:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/input-range.png" alt="The default appearance for input type=range" title="The default appearance for input type=range" width="144" height="25" class="aligncenter size-full wp-image-567" />

To the visual appearance of the iPhone's unlock slider:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/iphone-slider-native.png" alt="The iPhone's unlock slider" title="The iPhone's unlock slider" width="300" height="69" class="aligncenter size-full wp-image-566" />

As far as I can tell, only WebKit-based browsers and Opera have implemented `input type=range`. Mobile Safari hasn't yet implemented it as of iOS 4.2 and Android also hasn't fully implemented it as of Android 2.3 (although curiously the elements are styleable but not yet interactive). Surprisingly, the only mobile OS to implement this input type seems to be BlackBerry OS 6.

However, the focus here will be to get this working on just Chrome and WebKit. This will make it a bit easier to do this proof of concept. So we'll be using lots of `-webkit` vendor prefixed CSS.

### What we have to work with

Of course we have our simple range input:

```html
<input type="range" />
```

Which looks like this:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/input-range.png" alt="The default appearance for input type=range" title="The default appearance for input type=range" width="144" height="25" class="aligncenter size-full wp-image-567" />

We can target the input itself with a CSS attribute selector:

```css
input[type="range"] {
}
```

And if we want, we can transform it into a vertical slider by changing the `-webkit-appearance` property:

```css
input[type="range"] {
  -webkit-appearance: slider-vertical;
}
```

Which looks like this:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/input-range-vertical.png" alt="Input range in a vertical orientation" title="Input range in a vertical orientation" width="25" height="119" class="aligncenter size-full wp-image-579" />

If we want to style it as if it was any other element, there's a slight catch, as we first have to set "-webkit-appearance" to "none" and then add our customizations (this appears to mean that we can't actually style vertical sliders...). Here we'll set the background color as a simple demo:

```css
input[type="range"] {
  -webkit-appearance: none;
  background-color: gray;
}
```

This outputs the following:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/input-range-gray-background.png" alt="Input range with a gray background" title="Input range with a gray background" width="129" height="15" class="aligncenter size-full wp-image-577" />

Most interestingly, we can target and style the slider button itself with CSS, although we can't get access to it with JavaScript (for the time being anyhow). Here we'll style it a slightly darker shade of gray:

```css
input[type="range"] {
  -webkit-appearance: none;
  background-color: gray;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background-color: #444;
  width: 15px;
  height: 20px;
}
```

Which results in this:  
<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/input-range-styled.png" alt="Input range with a gray background and a slightly darker slider control" title="Input range with a gray background and a slightly darker slider control" width="129" height="20" class="aligncenter size-full wp-image-583" />

Now all the pieces are in place to fully style the input!

### Styling the background

This part's no big deal. We just want to set up the width/height, slap on some handy rounded corners, and add a very slight background gradient:

```css
input[type="range"] {
  -webkit-appearance: none;
  width: 280px;
  height: 46px;
  padding: 3px;
  -webkit-border-radius: 15px;
  border-radius: 15px;
  border: 1px solid #525252;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #000000),
    color-stop(1, #222222)
  );
}
```

Now we have the backdrop in place:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/iphone-slider-background.png" alt="iPhone slider background" title="iPhone slider background" width="288" height="54" class="aligncenter size-full wp-image-585" />

### Styling the button

To get the button, we'll add some width/height and rounded corners. Here we'll also need a more complicated background gradient as well as an arrow icon. Your first instinct might be to add more markup to hook the arrow icon to, but remember that this is impossible. We're working in the "shadow DOM" of elements created and maintained by the browser itself. We can style the existing elements but we can't create any new ones.

So what do we do? Take advantage of multiple backgrounds! We can specify the background as both the arrow image and the gradient we need. In this case we'll also base64 encode the small image to avoid an extra HTTP request.

The CSS for the button looks like this:

```css
input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 68px;
  height: 44px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASJJREFUeNpi7OnpYaAC0AXiF0D8mhzNTAzUASBHnAdim4F0BAhIA/EBIC4aSEeAADMQ9wLxRiDmHyhHwIAfNHqMiXZEcXExGJMCiNCjCMTHgDiTkFmM////p4rXe3t78Rm0DIjTgfgLNkkWoGZQij7MQFsQBY2aICC+Rq80gQ2oA/EZIE4YSEeAACcQzwfimVD2gDgCBtKgiVZlIB0BAgbQbBwykI5A5I4BtPsaNLfcHKiQWADEJiAHDERIfAfiLKgjBiQ67kCD/zK2NAFqjMyi0AJQVnPCI78GiBNxFttQF6ZToVjG5ohfoLoOiKcMVO54BA3+swPVntgKxIbEOIAWjvgLxJVA7APE7waisHoKxBFAfGSgSszL0MLnBTmaAQIMAKg/OsrT7JG8AAAAAElFTkSuQmCC"),
    -webkit-gradient(linear, left top, left bottom, color-stop(0, #fefefe), color-stop(0.49, #dddddd), color-stop(0.51, #d1d1d1), color-stop(1, #a1a1a1));
  background-repeat: no-repeat;
  background-position: 50%;
}
```

Which outputs this:  
<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/iphone-slider-button.png" alt="" title="iPhone slider button styled" width="288" height="54" class="aligncenter size-full wp-image-587" />

### "Slide to unlock" text

Now we're getting somewhere! And now we're approaching the limits of what we can do without getting pretty creative. We need some "slide to unlock" text in the background.

The first thing to do is to move the slider all the way to the left, to the default position. We do this through HTML by setting the value to 0:

```html
<input type="range" value="0" />
```

Ok, that wasn't too hard. But what about the text? We can't modify anything in the input itself, because it doesn't contain any element to display text. And we can't dynamically add text with JavaScript, because again, it's the shadow DOM! What we can do is create a separate text element outside of the input and position it on top of the slider using absolute positioning.

But this would be no good, since the text would appear over the button itself. What we want is for the text to show up in-between the button and the background. Since we can style both of these with CSS, we can control the stacking order with good old z-index!

And while we're at it, we might as well animate the "spotlight" effect on the text. We can do this with a combination of a semitransparent -webkit-mask and animations (see below).

First we have the HTML, which has changed a bit. For positioning and grouping, we need a wrapped element for the input and the span of text:

```html
<div class="iphone-slider">
    <input type="range" value="0"></input>
    <span>slide to unlock</span>
</div>
```

The final complete CSS is as follows:

```css
.iphone-slider {
  width: 280px;
  height: 46px;

  /* set the wrapper as the anchor element for positioning */
  position: relative;
}

.iphone-slider input {
  -webkit-appearance: none;
  width: 100%;
  background: #ddd;
  padding: 3px;
  border: 1px solid #525252;
  -webkit-border-radius: 15px;
  border-radius: 15px;
  background-image: -webkit-gradient(
    linear,
    left top,
    left bottom,
    color-stop(0, #000000),
    color-stop(1, #222222)
  );
}

.iphone-slider input::-webkit-slider-thumb {
  -webkit-appearance: none;

  /* position the button on top of everything */
  z-index: 100;
  position: relative;

  width: 68px;
  height: 44px;
  -webkit-border-radius: 10px;
  border-radius: 10px;

  /* arrow and button gradient */
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAYCAYAAAB0kZQKAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAASJJREFUeNpi7OnpYaAC0AXiF0D8mhzNTAzUASBHnAdim4F0BAhIA/EBIC4aSEeAADMQ9wLxRiDmHyhHwIAfNHqMiXZEcXExGJMCiNCjCMTHgDiTkFmM////p4rXe3t78Rm0DIjTgfgLNkkWoGZQij7MQFsQBY2aICC+Rq80gQ2oA/EZIE4YSEeAACcQzwfimVD2gDgCBtKgiVZlIB0BAgbQbBwykI5A5I4BtPsaNLfcHKiQWADEJiAHDERIfAfiLKgjBiQ67kCD/zK2NAFqjMyi0AJQVnPCI78GiBNxFttQF6ZToVjG5ohfoLoOiKcMVO54BA3+swPVntgKxIbEOIAWjvgLxJVA7APE7waisHoKxBFAfGSgSszL0MLnBTmaAQIMAKg/OsrT7JG8AAAAAElFTkSuQmCC"),
    -webkit-gradient(linear, left top, left bottom, color-stop(0, #fefefe), color-stop(0.49, #dddddd), color-stop(0.51, #d1d1d1), color-stop(1, #a1a1a1));
  background-repeat: no-repeat;
  background-position: 50%;
}

.iphone-slider span {
  /* position the text just under the button in the stacking order */
  position: absolute;
  z-index: 99;
  top: 30%;
  left: 37%;

  font-family: "Helvetica Neue", Helvetica, sans;
  font-size: 24px;
  color: white;
  cursor: default;
  -webkit-user-select: none;

  /* semitransparent gradient mask to animate over the text */
  -webkit-mask-image: -webkit-gradient(
    linear,
    left top,
    right top,
    color-stop(0, rgba(0, 0, 0, 0.3)),
    color-stop(0.45, rgba(0, 0, 0, 0.3)),
    color-stop(0.5, rgba(0, 0, 0, 1)),
    color-stop(0.55, rgba(0, 0, 0, 0.3)),
    color-stop(1, rgba(0, 0, 0, 0.3))
  );
  -webkit-mask-size: 1000px;
  -webkit-mask-repeat: no-repeat;
  -webkit-animation-timing-function: ease-in-out;
  -webkit-animation: text-spotlight 4s infinite;
}

/* animate the webkit-mark over the text */
@-webkit-keyframes text-spotlight {
  0% {
    -webkit-mask-position: -800px;
  }

  100% {
    -webkit-mask-position: 0px;
  }
}
```

This renders as the following:

<img src="http://davidbcalhoun.com/wp-content/uploads/2011/01/iphone-slider-mask.png" alt="" title="The final result" width="288" height="52" class="aligncenter size-full wp-image-589" />

Which looks pretty dang close the the native iPhone slider if I do say so myself! (perhaps the arrow could use some box-shadow to make it pop a bit more however).

### Just a bit of JavaScript

Since we've come this far, we might as well make the experience as authentic as possible. Here I've thrown in some JavaScript to check if the slider has been fully moved to the right, giving the user notification that the phone is unlocked.

Also, you'll notice the opacity of the text slowly fade as the slider is moved farther to the right. This mimics the actual experience on the iPhone.

Here's the JavaScript to make this work:

```javascript
(function () {
  // variable declarations
  var slider,
    sliderInput,
    sliderButton,
    sliderText,
    sliderTimeout,
    sliderOnchange,
    unlockCheck;

  // cache our DOM elements in variables
  slider = document.querySelector(".iphone-slider");
  sliderInput = slider.querySelector("input");
  sliderButton = sliderInput.querySelector("::-webkit-slider-thumb");
  sliderText = slider.querySelector("span");

  /*
      Check if it's been unlocked, else return the
      button back to the left side (default position).
  */
  unlockCheck = function () {
    if (sliderInput.value == 100) {
      sliderText.innerHTML = "Unlocked!";
      sliderInput.value = 0;
      sliderText.style.opacity = 1;
    } else {
      setTimeout(function () {
        sliderInput.value = 0;
        sliderText.style.opacity = 1;
      }, 1000);
    }
  };

  sliderOnchange = function () {
    /*
        Set the opacity of the text relative to the value
        on the input range.
    */
    sliderText.style.opacity = (100 - sliderInput.value) / 200;

    /*
        Add a timeout to prevent the function from being called
        on EVERY onchange event.
    */
    clearTimeout(sliderTimeout);
    sliderTimeout = setTimeout(unlockCheck, 300);
  };

  slider.onchange = sliderOnchange;
})();
```

### Live example

Here's a [video][3] of the slider in action:

If you're running Safari or Chrome, you should be able to see and interact with the [standalone demo][1].

Sweet! Well, that was fun! This was some good practice of using a ton of good stuff: border radius, gradients, multiple backgrounds, data URI images, webkit-mask-image, webkit-animation, and of course styleable input ranges via webkit-slider-thumb.

UPDATE: [Chrome has now made the shadow DOM inspectable][4].

[1]: https://www.davidbcalhoun.com/a/_old%20mobile%20tests/iphone-slider.html
[2]: http://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/
[3]: http://www.youtube.com/watch?v=lC_pcRZgNm0
[4]: http://peter.sh/2011/05/inspectable-shadow-dom-the-file-browser-and-new-default-avatars/
