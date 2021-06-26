---
title: A primer on CSS colors
date: 2009-12-29
comments: true
author: David
layout: post
permalink: /2009/a-primer-on-css-colors
categories: ["webdev", "css"]
tags:
  - color
  - css
  - hex
  - rgb
  - rgba
  - web safe
---

## ⚠️ Warning: this is an old article and may include information that's out of date. ⚠️

### Color keywords

Example usage:

<pre name="code" class="css">// Example
body { color: red; }

// Generalization (not actual code)
body { color: color_name; }</pre>

Because color names are easy to remember, they&#8217;re handy for getting quick results, especially while doing rapid prototyping.

[W3C&#8217;s CSS1 recommendation][1] first mentioned 16 color keywords that you can use: _aqua, black, blue, fuchsia, gray, green, lime, maroon, navy, olive, purple, red, silver, teal, white, and yellow_:

<table>
  <tr>
    <th>
      Color
    </th>
    
    <th>
      Hexadecimal
    </th>
    
    <th>
      Color
    </th>
    
    <th>
      Hexadecimal
    </th>
    
    <th>
      Color
    </th>
    
    <th>
      Hexadecimal
    </th>
    
    <th>
      Color
    </th>
    
    <th>
      Hexadecimal
    </th>
  </tr>
  
  <tr>
    <td>
      aqua / cyan
    </td>
    
    <td style="background:#0FF; color:#000; font-family:monospace;">
      #00FFFF
    </td>
    
    <td>
      gray
    </td>
    
    <td style="background:#808080; color:#FFF; font-family:monospace;">
      #808080
    </td>
    
    <td>
      navy
    </td>
    
    <td style="background:#000080; color:#FFF; font-family:monospace;">
      #000080
    </td>
    
    <td>
      silver
    </td>
    
    <td style="background:#C0C0C0; color:#000; font-family:monospace;">
      #C0C0C0
    </td>
  </tr>
  
  <tr>
    <td>
      black
    </td>
    
    <td style="background:#000; color:#FFF; font-family:monospace;">
      #000000
    </td>
    
    <td>
      green
    </td>
    
    <td style="background:#008000; color:#FFF; font-family:monospace;">
      #008000
    </td>
    
    <td>
      olive
    </td>
    
    <td style="background:#808000; color:#FFF; font-family:monospace;">
      #808000
    </td>
    
    <td>
      teal
    </td>
    
    <td style="background:#008080; color:#fff; font-family:monospace;">
      #008080
    </td>
  </tr>
  
  <tr>
    <td>
      blue
    </td>
    
    <td style="background:#00F; color:#FFF; font-family:monospace;">
      #0000FF
    </td>
    
    <td>
      lime
    </td>
    
    <td style="background:#0F0; color:#000; font-family:monospace;">
      #00FF00
    </td>
    
    <td>
      purple
    </td>
    
    <td style="background:#800080; color:#FFF; font-family:monospace;">
      #800080
    </td>
    
    <td>
      white
    </td>
    
    <td style="background:#FFF; color:#000; font-family:monospace;">
      #FFFFFF
    </td>
  </tr>
  
  <tr>
    <td>
      fuchsia / magenta
    </td>
    
    <td style="background:#F0F; color:#000; font-family:monospace;">
      #FF00FF
    </td>
    
    <td>
      maroon
    </td>
    
    <td style="background:#800000; color:#FFF; font-family:monospace;">
      #800000
    </td>
    
    <td>
      red
    </td>
    
    <td style="background:#F00; color:#FFF; font-family:monospace;">
      #FF0000
    </td>
    
    <td>
      yellow
    </td>
    
    <td style="background:#FF0; color:#000; font-family:monospace;">
      #FFFF00
    </td>
  </tr>
</table>

(color table from [Wikipedia][2])

[CSS2][3] officially mapped the colors to recommended hex values and also added the color orange. [CSS3][4] removed orange, presumably because having 17 colors was aesthetically unpleasing in a binary world?

In addition to these 16 &#8220;official&#8221; colors, there&#8217;s [even more unofficial color names][5] you can use that appear to be supported in all the major browsers.

### RGB values

Example usage:

<pre name="code" class="css">// Example
body { color: rgb(255,0,0); }

// Generalization (not actual code)
body { color: rgb(red [integer 0-255], green [integer 0-255], blue [integer 0-255]); }</pre>

For this section it&#8217;s very handy to know a bit about [color theory][6], particularly these facts:

- all colors can be made from a combination of red, green, and blue (RGB) as the primary colors
- in light (additive color mixing), the absence of all color results in the color black
- in light (additive color mixing), the mixing of red, green, and blue in equal amounts results in the color white

With the rgb attribute, we specify the amount of each color we want with an integer from 0 to 255. Here we can see both black and white expressed as rgb values:

Black:  
<span class="small-box" style="background-color: rgb(0,0,0);"></span>rgb(0,0,0)

White:  
<span class="small-box" style="background-color: rgb(255,255,255);"></span>rgb(255,255,255)

Also note that if all three values are equal, there is no color that predominates and the result is a shade of gray.

Dark gray:

<span class="small-box" style="background-color: rgb(30,30,30);"></span>rgb(30,30,30)

A lighter shade of gray:

<span class="small-box" style="background-color: rgb(200,200,200);"></span>rgb(200,200,200)

And of course we can favor only one color, which in this case gives us a full red, with no green or blue:

<span class="small-box" style="background-color: rgb(255,0,0);"></span>rgb(255,0,0)

You may have guessed that we can also use percentage values to represent the same color:

<span class="small-box" style="background-color: rgb(100%, 0%, 0%);"></span>rgb(100%, 0%, 0%)

### RGBA values

<pre name="code" class="css">// Example
body { color: rgba(255,0,0,0.5); }

// Generalization (not actual code)
body { color: rgb(red [integer 0-255], green [integer 0-255], blue [integer 0-255], alpha transparency [float 0-1]); }</pre>

[CSS3][7] introduced rgba, which is in every way similar to rgb, except for the addition of a fourth value, alpha opacity, which gives us control over the transparency of the color.

So the equivalent full red we have above would look like this (no transparency):

<span class="small-box" style="background-color: rgba(255, 0, 0, 1);"></span>rgba(255, 0, 0, 1)

<span class="small-box" style="background-color: rgba(100%, 0%, 0%, 1);"></span>rgba(100%, 0%, 0%, 1)

And the same color, only now semitransparent:

<span class="small-box" style="background-color: rgba(255, 0, 0, 0.5);"></span>rgba(255, 0, 0, 0.5)

<span class="small-box" style="background-color: rgba(100%, 0%, 0%, 0.5);"></span>rgba(100%, 0%, 0%, 0.5)

### Hex values

Example usage:

<pre name="code" class="css">// Example
body { color: #ff0000; }

// Generalization (not actual code)
body { color: #rrggbb; }</pre>

Hex values are probably the most common out of all of the ways to represent colors in CSS. But I included them last &#8211; what gives? It seems to me that the rgb value should logically be explained first. The hex value is just a hex version (and thus slightly more confusing version) of expressing rgb values.

For this section you ought to know the basics of [hexadecimal numbers][8]. In particular, the fact that hexadecimals are base 16 and use letters a-f to represent numbers beyond our conventional base 10 range.

The hex value starts with a hash (#) and is followed by six numbers and/or letters. This is simply our three color values again: red, green, blue, with each color allowed two digits.

We express our solid red color like this:

<span class="small-box" style="background-color: #ff0000;"></span>#ff0000

As long as you can convert between decimal and hexadecimal (there&#8217;s [a few free tools online][9]), it&#8217;s relatively easy to convert between rgb and hex color values. Just keep in mind that the first 16 hex values are preceded by a zero (0 becomes 00, 1 becomes 01, 10 becomes 0a, 11 becomes 0b, etc.)

### Shorthand hex

Example usage:

<pre name="code" class="css">// Example
body { color: #f00; }

// Generalization (not actual code)
body { color: #rgb; }</pre>

Last but not least, if each rgb value has a repeating value, you can simply omit the repeating value. In the case above each of our color values was repeating (red = ff, green = 00, blue = 00), so we simply drop the repeating digit from each color and cut three bytes from our code:

<span class="small-box" style="background-color: #f00;"></span>#f00

### A note on web-safe colors

[Web safe colors][10] were a recommended subset of about 256 colors with which to design websites. The rationale for solely using them for web design was for rendering consistency, so even users with very limited displays could see the page as it was intended to be displayed.

The concept of a &#8220;web safe&#8221; color was becoming obsolete even in 1997 or so, when I started making my personal website on AOL. It&#8217;s safe to say that the vast majority of users today are now able to view webpages with at least 16 million colors (256\*256\*256).

But this doesn&#8217;t mean we shouldn&#8217;t be concerned about colors. Apart from pure aesthetics, in the area of accessibility it&#8217;s often mentioned that users with colorblindness find certain combinations of colors difficult to see. So keep this in the back of your head when you go crazy with those wild color schemes!

### More info

Probably the best way to learn how to use these color values is to actually try them on your website, however you might also find the following links useful.

<div class="website">
  <a href="http://colorschemedesigner.com/"><img src="http://davidbcalhoun.com/wp-content/uploads/2009/12/color-scheme-designer.png" alt="Color Scheme Designer" title="Color Scheme Designer" width="300" /></a> <div>
    <p>
      <a href="http://colorschemedesigner.com/">Color Scheme Designer</a> is a nice tool for finding several colors that (theoretically) should go well together. It&#8217;s a nice place to go when building a website from the ground-up.
    </p>
    
    <p>
      <a href="http://colorschemedesigner.com/">http://colorschemedesigner.com/</a>
    </p>
  </div>
</div>

<div class="website">
  <a href="http://schlaeps.com/mootools/gradient-creator/"><img src="http://davidbcalhoun.com/wp-content/uploads/2009/12/mootols-webkit-gradient.png" alt="Color Scheme Designer" title="Color Scheme Designer" width="300" /></a> <div>
    <p>
      <a href="http://schlaeps.com/mootools/gradient-creator/">Jonathan Schlaepfer</a> made a nice helper tool built in Mootols for creating webkit gradients. Gradients wasn&#8217;t the subject of this entry, but it&#8217;s helpful to see a nice visualization of rgb values corresponding to the hex values.
    </p>
    
    <p>
      <a href="http://schlaeps.com/mootools/gradient-creator/">http://schlaeps.com/mootools/gradient-creator/</a>
    </p>
  </div>
</div>

[Wikipedia: Web colors][2]

[HTML Colors][11]

[1]: http://www.w3.org/TR/CSS1/#color-units
[2]: http://en.wikipedia.org/wiki/Web_colors
[3]: http://www.w3.org/TR/CSS2/syndata.html#keywords
[4]: http://www.w3.org/TR/css3-color/#html4
[5]: http://www.w3schools.com/css/css_colornames.asp
[6]: http://en.wikipedia.org/wiki/Color_theory
[7]: http://www.w3.org/TR/css3-color/#rgba-color
[8]: http://en.wikipedia.org/wiki/Hexadecimal
[9]: http://www.google.com/search?aq=f&ie=UTF-8&q=decimal+to+hex
[10]: http://en.wikipedia.org/wiki/Web_colors#Web-safe_colors
[11]: http://www.w3schools.com/html/html_colors.asp
