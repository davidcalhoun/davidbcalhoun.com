---
title: 'Designing buttons that don&#8217;t suck (Mobile web part 3)'
date: 2010-05-19
comments: true
author: David
layout: post
permalink: /2010/designing-buttons-that-dont-suck
categories:
  - mobile
tags:
  - button
  - testing
  - usability
---
A button is something that seems to be made just for mobile: it&#8217;s designed to be big and easy to activate, as opposed to small and harder to activate, like normal text links. This seems ideal for a mobile devices, which have a small display area and whose form of input is a person&#8217;s (relatively) fat finger interacting with the screen. Contrast this with the desktop, where the display area is much larger and the input device, the mouse, is a much more highly refined and sensitive pointing device.

But you probably don&#8217;t want to make everything into a button. After all, there&#8217;s still a place for good old fashioned anchor tags. So what do you make into a button? Simple: areas of your website that get frequent usage. For instance, [mobile.twitter.com][1] has buttons for Search, Refresh results, and More (display more tweets), but leaves other things as anchors/hyperlinks, such as usernames and links in tweets. Basically, use common sense. You should have a mixture of both buttons and hyperlinks.

There&#8217;s a distinction to be made between form input buttons and other things that look like buttons. The former occurs within a Form tag and can be used to submit a form of data when clicked (and you can [style it up all you want][2]!). The latter is simply an Anchor tag disguised as a big clickable button, which is the focus of this article.

A button can be a very useful thing, and can make the user experience much much better. Yet it&#8217;s surprisingly easy to fail to create a proper button.

### How to fail at creating a button

See if you can tell the difference between these two buttons:

<div class="button-container">
  <div class="incorrect button">
    <a href="#">More</a>
  </div>
  
  <p>
    <a href="#" class="correct button">More</a> </div> <p>
      If the difference isn&#8217;t immediately apparent, try mousing over the following buttons:
    </p>
    
    <div class="button-container hovers">
      <div class="incorrect button">
        <a href="#">More</a>
      </div>
      
      <p>
        <a href="#" class="correct button">More</a> </div> <p>
          What&#8217;s the problem? The button on the top is only clickable when hovering over the text. In other words, it looks like a button but it acts just like a regular hyperlink. This is a common problem that I&#8217;ve seen a LOT, and I&#8217;ve even seen it on major websites (in fact, the faulty button is inspired by the live code on <a href="http://mobile.twitter.com">mobile.twitter.com</a>).
        </p>
        
        <h3>
          How does this happen?
        </h3>
        
        <p>
          My theory is that when a design is passed down to a developer, the developer may think their job ends when their code produces output that looks like the original design documents. But they fail to take into consideration the actual usability of the website.
        </p>
        
        <p>
          This is a simple mistake, but it definitely causes frustration when I find it on websites. And I find myself even more annoyed when I see this while browsing websites with my iPhone. It basically tells me that the developers don&#8217;t use their own website. That&#8217;s not a good impression to leave with your visitors.
        </p>
        
        <h3>
          Summary
        </h3>
        
        <p>
          In summary, buttons are an important part of your mobile website. They are designed to be easy to activate, so make sure that frequently used functions on your website are buttons. Also, don&#8217;t be lazy: TEST your code for usability and don&#8217;t assume that the product is done when it looks identical to the design specs.
        </p>
        
        <h3>
          More from the Mobile Web series:
        </h3>
        
        <p>
          <a href="http://davidbcalhoun.com/2010/viewport-metatag">Part 1: The viewport metatag</a><br /> <a href="http://davidbcalhoun.com/2010/the-mobile-developers-toolkit-mobile-web-part-2">Part 2: The mobile developer’s toolkit</a><br /> <a href="http://davidbcalhoun.com/2010/designing-buttons-that-dont-suck">Part 3: Designing buttons that don’t suck</a><br /> <a href="http://davidbcalhoun.com/2010/on-designing-a-mobile-webpage">Part 4: On designing a mobile webpage</a><br /> <a href="http://davidbcalhoun.com/2010/using-mobile-specific-html-css-javascript">Part 5: Using mobile-specific HTML, CSS, and JavaScript</a><br /> <a href="http://davidbcalhoun.com/2010/dealing-with-device-orientation">Part 6: Dealing with device orientation</a><br /> <a href="http://davidbcalhoun.com/2010/mobile-javascript-libraries-and-frameworks">Part 7: Mobile JavaScript libraries and frameworks</a>
        </p>

 [1]: http://mobile.twitter.com
 [2]: http://girliemac.com/blog/2010/02/04/css3-box-shadow-with-inset-values-the-aqua-button-rerevisited/