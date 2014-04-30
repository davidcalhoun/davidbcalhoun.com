---
title: Android 3.0 Honeycomb is first to implement the Device API
date: 2011-02-24
comments: true
author: David
layout: post
permalink: /2011/android-3-0-honeycomb-is-first-to-implement-the-device-api
categories:
  - Uncategorized
---
I fired up the newly released Android 3.0 SDK to run some tests and found they&#8217;ve implemented part of the long-awaited [Device API][1] (aka the Media Capture API). From your browser you can now upload pictures and videos from the camera as well as sounds from the microphone. The returned data should be available to manipulate via the [File API][2] (although I haven&#8217;t yet tested this).

I made a [short video demo][3] with some explanation:



Here&#8217;s the code so you can play around with it for yourself!

<pre name="code" class="html">&lt;form enctype="multipart/form-data" method="post"&gt;
  &lt;h2&gt;Regular file upload&lt;/h2&gt;
  &lt;input type="file"&gt;&lt;/input&gt;
  
  &lt;h2&gt;capture=camera&lt;/h2&gt;
  &lt;input type="file" accept="image/*;capture=camera"&gt;&lt;/input&gt;
  
  &lt;h2&gt;capture=camcorder&lt;/h2&gt;
  &lt;input type="file" accept="video/*;capture=camcorder"&gt;&lt;/input&gt;
  
  &lt;h2&gt;capture=microphone&lt;/h2&gt;
  &lt;input type="file" accept="audio/*;capture=microphone"&gt;&lt;/input&gt;
&lt;/form&gt;
</pre>

 [1]: http://www.w3.org/2009/dap/
 [2]: http://www.w3.org/TR/FileAPI/
 [3]: http://www.youtube.com/watch?v=L1XqvLOi-3I