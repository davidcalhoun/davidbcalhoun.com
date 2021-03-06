---
title: How to import imiwa? vocabulary lists directly into Anki (iOS, iPhone guide)
date: 2013-02-27
comments: true
author: David
layout: post
aliases:
- /2013/how-to-import-imiwa-vocabulary-lists-directly-into-anki-ios-iphone-guide/
tags:
- japanese
---
EDIT: big thanks to my classmate Robin from Switzerland who showed me the key steps to getting this figured out!

For the last six months, I've mainly been using imiwa? for iOS to look up Japanese words whenever I don't know them (mostly in class). However, I found that I built up big lists without ever reviewing them.

The best way to review is of course through Anki, but it was a laborious process to import each word one-by-one. I should've figured there was an easier way!

### Step 1: Export list and email to yourself

Most good apps, including imiwa?, include an export function. They may export directly to an Anki file (all the easier!), or they may export to a tab-delimited file, as imiwa? does. For this tutorial I'll assume you have a dictionary that does the latter, and for the purpose of this quick tutorial, I'll use screenshots from imiwa? on iOS as a guide.

Your first step is to open up imiwa? and go to the Lists tab (click the icon at the bottom):

[<img src="https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-list.jpg" alt="imiwa-ios-list" width="320" height="480" class="aligncenter size-large wp-image-1026" />][1]

Click on the list you want to export, then click on the icon next to the Edit button at the top of the screen:

[<img src="https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-list-export.jpg" alt="imiwa-ios-list-export" width="320" height="480" class="aligncenter size-full wp-image-1029" />][2]

At this point we have a few options. Choose the bottom option ("Tab separated values"):

[<img src="https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-tab-separated-values-export.jpg" alt="imiwa-ios-tab-separated-values-export" width="320" height="480" class="aligncenter size-large wp-image-1028" />][3]

After a little processing, imiwa? will finish and direct you to the email app, where you need to email the list to yourself. Just type in your email address and hit Send:

[<img src="https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-email-to-self.jpg" alt="imiwa-ios-email-to-self" width="320" height="480" class="aligncenter size-large wp-image-1025" />][4]

### Step 2: Download and import to desktop Anki

Now switch to your desktop and download the file you emailed to yourself. It should look something like this:

[<img src="https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-tab-separated-values-export-sample-1024x588.png" alt="imiwa-ios-tab-separated-values-export-sample" width="512" height="294" class="aligncenter size-large wp-image-1027" />][5]

Note that there's a lot of "junk" data that we won't need when we import into Anki. Don't worry, there's a way to get rid of it!

Now open up Anki, click File -> Import... and select the file you downloaded (from the email you send to yourself).

### Step 3: Hide junk columns from Anki

When you import the file, you'll get prompted with a screen that looks like this:

[<img src="https://www.davidbcalhoun.com/wp-content/uploads/2013/02/anki-tab-delimited-import-1024x876.png" alt="anki-tab-delimited-import" width="512" height="438" class="aligncenter size-large wp-image-1024" />][6]

This allows you to tell Anki which deck to import into (you probably will want to create a brand new deck), but most importantly you need to tell Anki which fields are import.

Here's a typical line from a list I imported:

"JMDICT 1431110 直接 ちょくせつ direct, immediate, personal, firsthand L41-50"

In other words:

"1. [Junk] 2. [Junk] 3. Expression 4. Reading 5. Meaning 6. [Junk]"

On this screen in Anki, hit the Change button for fields 1, 2, and 6, and be sure to tell Anki to ignore them. For the rest of the fields, match them up appropriately (Field 3 is Expression, Field 4 is Reading, Field 5 is Meaning).

Now click the Import button, and you magically have a new Anki deck to work through!

 [1]: https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-list.jpg
 [2]: https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-list-export.jpg
 [3]: https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-tab-separated-values-export.jpg
 [4]: https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-email-to-self.jpg
 [5]: https://www.davidbcalhoun.com/wp-content/uploads/2013/02/imiwa-ios-tab-separated-values-export-sample.png
 [6]: https://www.davidbcalhoun.com/wp-content/uploads/2013/02/anki-tab-delimited-import.png