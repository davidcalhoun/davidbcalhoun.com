---
title: Descartes on building software frameworks
date: 2012-10-02
comments: true
author: David
layout: post
permalink: /2012/descartes-on-building-software-frameworks
categories:
  - philosophy
---
[<img src="http://davidbcalhoun.com/wp-content/uploads/2012/10/Frans_Hals_-_Portret_van_René_Descartes.jpeg" alt="Rene Descartes" title="Rene Descartes" width="817" height="1000" class="aligncenter size-full wp-image-969" />][1]

Years ago I read Descartes&#8217;s [Discourse on Method][2] for what I found to be some of the more interesting philosophy courses of my college career: those of the history of modern philosophy. Modern philosophy technically starts with Descartes, so it&#8217;s a good place to start, or to get re-acquainted with philosophy in general.

I&#8217;ve been reading through the Discourse again, and have found it to be more interesting and relatable this time around (particularly about lessons learned while traveling, but that&#8217;s a topic for another post).

What&#8217;s particularly interesting here is that a lot of what Descartes talks about seems very relevant for software engineers who wish to create their own software framework from scratch.

I&#8217;m sorry, I know that sounds pretty pretentious and crazy.

This isn&#8217;t as far-fetched as it may seem at first. Be patient!

But first, some background&#8230;

### What was Descartes up to? Does French count as a programming language?

[<img src="http://davidbcalhoun.com/wp-content/uploads/2012/10/René_Descartes_i_samtal_med_Sveriges_drottning_Kristina.jpeg" alt="Rene Descartes" title="Rene Descartes" width="581" height="539" class="aligncenter size-full wp-image-975" />][3]  
*&#8220;Oh my! I find your foundations to be awfully shaky.&#8221;* (note: not an actual Descartes quote)

> Philosophy has been pursued for many centuries by the best minds, and yet everything in it is still disputed and hence doubtful; and I wasn’t so arrogant as to hope to achieve more in philosophy than others had done. Considering how many different opinions learned men may maintain on a single question—where at most one can be true—I regarded everything that was merely probable as being near enough to false. -[Descartes, Discourse on Method][2]

Descartes&#8217;s task, if you&#8217;ll remember, is intense self-examination where he throws out any questionable belief in order to build a strong foundation of clear and unquestionable beliefs. He doubts literally everything, until he comes to the one thing that can&#8217;t be doubted: that there is obviously *something* doing the doubting. Namely himself. This is where the concept &#8220;I think, therefore I am&#8221; comes from (&#8220;Je pense, donc je suis&#8221;, and in Latin as &#8220;Cogito ergo sum&#8221; in a later work).

### The software engineer tie-in

Software engineers, I&#8217;ve found, when given the chance, are likewise just as skeptical of the &#8220;status quo&#8221;. They take a look at the landscape around them, but find themselves dissatisfied and unable to find a perfectly suitable software framework. Of course many people do find close approximations and are perfectly happy using an existing framework. On the other hand, there are definitely purists who believe the proper thing to do is to create their own tailor-made framework from the ground up. Descartes would definitely fit into this latter category.

What I&#8217;ve found over my short career in software is that engineers like to build custom frameworks. Lots of custom frameworks. And they often times like to build them in a purist way, from the ground up.

Building your own framework turns out not only to be more interesting and fun (rather than maintaining some existing framework), but it&#8217;s also supposedly a better way to ensure a lack of cruft, and to ensure a firm foundation. A foundation which has no component that is unneeded or of which can be doubted.

The danger of doing otherwise, it&#8217;s thought, is that after investing the effort to learn an existing framework, one might find it wasn&#8217;t that great after all. Or worse, that it had questionable foundations which would need to be patched up. This is not unlike the task of learning an existing philosophical system, only to see holes poked in its very foundations (as the quote above states, this is essentially what philosophers have been doing for centuries &#8211; poking holes in each other&#8217;s foundations).

### Better than maintaining the old

> Regarding the opinions which I had previously held, I couldn’t do better than set out to get rid of them all at one go, so as then to replace them afterwards with better opinions or even with the same ones after I had straightened them out using reason’s plumb-line. I ﬁrmly believed that this would let me conduct my life much better than if I were to build only on old foundations and rely only on principles that I had accepted in my youth without ever examining whether they were true. Even if I were to see various difﬁculties in this project, they weren’t insurmountable, and weren’t comparable with the difﬁculties involved in reforming even minor matters affecting public institutions. -[Descartes, Discourse on Method][2]

The huge drawback of &#8220;going at it on our own&#8221; is of course the fact that *we* are now responsible for creating the entire foundation and each component of our custom framework. Descartes would be perfectly fine with this.

And this is exactly what he did with himself: he tore down everything he thought he knew to be true, then started to slowly build up his philosophy bit by bit. Better to do this than to patch old shaky foundations in existing philosophies.

### Reusing old bits

[<img src="http://davidbcalhoun.com/wp-content/uploads/2012/10/Descartesmaison.jpeg" alt="Descartes&#039;s house" title="Descartes&#039;s house" width="395" height="597" class="aligncenter size-full wp-image-979" />][4]  
*Descartes&#8217;s house. Hmm, not sure the foundations are secure here&#8230;*

Interestingly enough, parts of old beliefs (old frameworks) may still find their way in, but only after intense scrutiny:

> Just as in demolishing an old house we usually keep the materials for use in building a new one, so in destroying all those opinions of mine that I judged to be ill-founded I made various observations and acquired many experiences that I have since used in establishing more certain opinions. -[Descartes, Discourse on Method][2]

In other words, there&#8217;s some good bits out there that have already been created. Might as well reuse them if they&#8217;re good enough.

### Philosophy as a preview of the future of software development

Obviously philosophy didn&#8217;t stop with Descartes. He did become the foundation for others in the modern tradition to build on (namely Spinoza and Leibniz, and most others who came after him), but of course that wasn&#8217;t the end of it. The famous &#8220;cogito ergo sum&#8221;, the foundation of Descartes&#8217;s philosophy and seemingly common sense, [hasn&#8217;t even been immune from criticism][5].

Folks have continued to build philosophies and have continued to be unsatisfied with what&#8217;s out there, or unconvinced that it&#8217;s even useful in this age.

I believe we approach software frameworks, software itself, and even programming languages the same way. Unsatisfied with what&#8217;s out there, people will continue to build new things and new tools which work for the time being for certain groups of people.

Inevitably, a new generation of developers, not unlike a new generation of philosophers, will eventually tear it all down and start over again.

 [1]: http://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg
 [2]: http://en.wikipedia.org/wiki/Discourse_on_the_Method
 [3]: http://commons.wikimedia.org/wiki/File:Ren%C3%A9_Descartes_i_samtal_med_Sveriges_drottning,_Kristina.jpg
 [4]: http://commons.wikimedia.org/wiki/File:Descartesmaison.jpg
 [5]: http://en.wikipedia.org/wiki/Cogito_ergo_sum#Criticisms