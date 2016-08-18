---
title: 'Optimizing based on connection speed: using navigator.connection on Android 2.2+'
date: 2010-09-14
comments: true
author: David
layout: post
permalink: /2010/using-navigator-connection-android
categories: ["javascript", "android", "webdev"]
---
### Introduction

A little while back [this post][1] made the rounds, which took us on a journey through some of the new features introduced in the browser in Android 2.2 Froyo. Among the most overlooked features are the file upload functionality (you can upload photos from your browser now! But we&#8217;re still waiting on iPhone to support this&#8230;) and a little-known JavaScript addition to the Browser Object Model (BOM) in the form of

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          navigator.connection
        </div>
      </td>
    </tr>
  </table>
</div>

. Let&#8217;s take a peek at its contents:

<pre name="code" class="JScript">// contents of navigator.connection object
{
  "type": "3",
  "UNKNOWN": "0",
  "ETHERNET": "1",
  "WIFI": "2",
  "CELL_2G": "3",
  "CELL_3G": "4"
}
</pre>

This is data taken from a Nexus One running on a 2G network, so you can see that the type is set to 3, which corresponds with &#8220;CELL_2G&#8221;. In other words, this phone runs on a slower network, so from a performance perspective, you probably want to consider delivering a lower-bandwidth experience.

So how exactly do we target this?

### The code

The purpose of this code is to first find the connection speed, and then add a class to the

<div class="codecolorer-container text twitlight" style="overflow:auto;white-space:nowrap;width:435px;">
  <table cellspacing="0" cellpadding="0">
    <tr>
      <td class="line-numbers">
        <div>
          1<br />
        </div>
      </td>
      
      <td>
        <div class="text codecolorer">
          html
        </div>
      </td>
    </tr>
  </table>
</div>

element based on this connection. The goal is to be able to target these connections with CSS, so the right content is delivered to the right connection:

<pre name="code" class="CSS">.highbandwidth .logo   { background-image:url('logo-high.jpg'); }
.mediumbandwidth .logo { background-image:url('logo-medium.jpg'); }
.lowbandwidth .logo    { background-image:url('logo-low.jpg'); }
</pre>

And here&#8217;s the JavaScript:

<pre name="code" class="JScript">var connection, connectionSpeed, htmlNode, htmlClass;

// create a custom object if navigator.connection isn't available
connection = navigator.connection || {'type':'0'};

// set connectionSpeed
switch(connection.type) {
  case connection.CELL_3G:
    // 3G
    connectionSpeed = 'mediumbandwidth';
  break;
  case connection.CELL_2G:
    // 2G
    connectionSpeed = 'lowbandwidth';
  break;
  default:
    // WIFI, ETHERNET, UNKNOWN
    connectionSpeed = 'highbandwidth';
}

// set the connection speed on the html element, i.e. &lt;html class="lowbandwidth"&gt;
htmlNode = document.body.parentNode;
htmlClass = htmlNode.getAttribute('class') || '';
htmlNode.setAttribute('class', htmlClass + ' ' + connectionSpeed);
</pre>

### Give the user control!

Just as it&#8217;s a good practice to give the user a link to the full desktop version of the website, if you&#8217;re going to deliver different content based on different connection speeds, then it&#8217;s highly advisable to give the user full control.

So give them control! You can provide something like the following:

<div id="bandwidthControls">
  <p>
    Mobile | <a href="#">Desktop</a>
  </p>
  
  <p>
    Bandwidth: <a href="#">High</a> | <a href="#">Medium</a> | Low
  </p>
</div>

 [1]: http://www.mobilexweb.com/blog/android-froyo-html5-accelerometer-flash-player