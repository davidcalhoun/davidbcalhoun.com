---
title: Basic HTML5 template
date: 2010-09-08
comments: true
author: David
layout: post
permalink: /2010/basic-html5-template
tags:
- html
- html5
- webdev
---

### Introduction

Often times I end up creating short pages for testing short pieces of code, and I only need a very basic HTML template to write in. Short of using [HTML5 Boilerplate][1], I just use a quick piece of code like the following. (note: yes, this has issues in IE, so you may want to use [HTML5 Shiv/Shim][2])

### The code

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8"/>
  <title></title>

  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>
  <link rel="stylesheet" href=""/>
</head>

<body>
  <header>
  </header>

  <div>
  </div>

  <footer>
  </footer>

  <script src=""></script>
</body>

</html>
```

Edit: Self-closed tags for compatibility.  
Edit2: removed `type="text/css"` from the link tag

 [1]: http://html5boilerplate.com/
 [2]: http://remysharp.com/2009/01/07/html5-enabling-script/