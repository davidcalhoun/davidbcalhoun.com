---
title: Android 3.0 Honeycomb is first to implement the Device API
date: 2011-02-24
comments: true
author: David
layout: post
aliases:
- /2011/android-3-0-honeycomb-is-first-to-implement-the-device-api/
tags:
- javascript
- programming
- webdev
- android
---

I fired up the newly released Android 3.0 SDK to run some tests and found they've implemented part of the long-awaited [Device API][1] (aka the Media Capture API). From your browser you can now upload pictures and videos from the camera as well as sounds from the microphone. The returned data should be available to manipulate via the [File API][2] (although I haven't yet tested this).

### Video
I made a [short video demo][3] with some explanation:

<iframe width="560" height="315" src="https://www.youtube.com/embed/L1XqvLOi-3I" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### Code
Here's the code so you can play around with it for yourself!

```html
<form enctype="multipart/form-data" method="post">
  <h2>Regular file upload</h2>
  <input type="file"></input>
  
  <h2>capture=camera</h2>
  <input type="file" accept="image/*;capture=camera"></input>
  
  <h2>capture=camcorder</h2>
  <input type="file" accept="video/*;capture=camcorder"></input>
  
  <h2>capture=microphone</h2>
  <input type="file" accept="audio/*;capture=microphone"></input>
</form>
```

 [1]: http://www.w3.org/2009/dap/
 [2]: http://www.w3.org/TR/FileAPI/
 [3]: http://www.youtube.com/watch?v=L1XqvLOi-3I