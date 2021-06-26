---
title: How to install obsolete Android Virtual Devices (AVDs)
date: 2010-06-09
comments: true
author: David
layout: post
permalink: /2010/how-to-install-obsolete-android-virtual-devices-avds
categories: ["android", "programming"]
tags:
  - android
  - avd
  - emulator
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

Apparently it&#8217;s no longer possible to easily download Android versions 2.0 and 2.0.1 from the AVD Manager. I noticed this problem when I got a new machine and had to install everything from scratch. In the future I suspect even more AVDs will be made obsolete, so this solution also applies to them.

Why would you want to install obsolete AVDs? In my case it&#8217;s a matter of research: I simply want to see the progress of features being added to its browser, and track those changes over time.

### Step 1: Manually download and inspect repository.xml

When updating from &#8220;Available Packages&#8221; there&#8217;s a little one-line error saying &#8220;Some packages were found but are not compatible updates.&#8221;

Ok, so let&#8217;s check out the XML for ourselves to see if we can find anything. So point your browser to <https://dl-ssl.google.com/android/repository/repository.xml> (to see the XML, right click to view the page source if you&#8217;re using a Webkit-based browser).

Search for the AVD version you want. In this case we want 2.0 and 2.0.1, so a simple search find the relevant blocks of code. And we also find the XML tag that&#8217;s the cause of our troubles, which prevents us from easily getting the AVDs:

<pre name="code" class="xml">&lt;sdk:obsolete /&gt;
</pre>

### Step 2: Get the AVDs!

At this point you could do two things, either save repository.xml to your computer and remove these &#8220;obsolete&#8221; tags (then add the XML to your AVD Manager by clicking &#8220;Add Add-on Site&#8230;&#8221;), or simply find the path to the AVD and download it manually.

The second option is to simply manually download the paths, which are easy to find in the XML and are listed here for your convenience:  
[Android 2.0 AVD (Linux)][1]  
[Android 2.0 AVD (Mac OSX)][2]  
[Android 2.0 AVD (Windows)][3]

[Android 2.0.1 AVD (Linux)][4]  
[Android 2.0.1 AVD (Mac OSX)][5]  
[Android 2.0.1 AVD (Windows)][6]

### Step 3: Install!

Create directories under your Android SDK installation&#8217;s &#8220;platforms&#8221; folder. In this case we have 2.0 (API level 5) and 2.0.1 (API level 6), so I created these folders: android-5 and android-6. Now just unzip the contents into these folders.

Start up the AVD Manager and click on &#8220;Installed Packages&#8221;. If you don&#8217;t see your new (obsolete) packages you just installed, hit the Refresh button and you should see them.

Now you can create new AVDs with these obsolete packages!

[1]: https://dl-ssl.google.com/android/repository/android-2.0_r01-linux.zip
[2]: https://dl-ssl.google.com/android/repository/android-2.0_r01-macosx.zip
[3]: https://dl-ssl.google.com/android/repository/android-2.0_r01-windows.zip
[4]: https://dl-ssl.google.com/android/repository/android-2.0.1_r01-linux.zip
[5]: https://dl-ssl.google.com/android/repository/android-2.0.1_r01-macosx.zip
[6]: https://dl-ssl.google.com/android/repository/android-2.0.1_r01-windows.zip
