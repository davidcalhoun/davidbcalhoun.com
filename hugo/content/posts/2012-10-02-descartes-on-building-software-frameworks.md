---
title: Descartes on building software frameworks
date: 2012-10-02
comments: true
author: David
layout: post
permalink: /2012/descartes-on-building-software-frameworks
tags:
- philosophy
- programming
---

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="817" />
    <meta itemprop="height" content="1000" />
    <meta itemprop="url" content="https://www.davidbcalhoun.com/wp-content/uploads/2012/10/Frans_Hals_-_Portret_van_René_Descartes.jpeg" />
    <a href="http://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg">
        <img itemprop="contentUrl" src="https://www.davidbcalhoun.com/wp-content/uploads/2012/10/Frans_Hals_-_Portret_van_René_Descartes.jpeg" alt="Rene Descartes" />
    </a>
    <figcaption itemprop="caption">Rene Descartes</figcaption>
</figure>

Years ago I read Descartes's [Discourse on Method][2] for what I found to be some of the more interesting philosophy courses of my college career: those of the history of modern philosophy. Modern philosophy technically starts with Descartes, so it's a good place to start, or to get re-acquainted with philosophy in general.

I've been reading through the Discourse again, and have found it to be more interesting and relatable this time around (particularly about lessons learned while traveling, but that's a topic for another post).

What's particularly interesting here is that a lot of what Descartes talks about seems very relevant for software engineers who wish to create their own software framework from scratch.

I'm sorry, I know that sounds pretty pretentious and crazy.

This isn't as far-fetched as it may seem at first. Be patient!

But first, some background...

### What was Descartes up to? Does French count as a programming language?

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="581" />
    <meta itemprop="height" content="539" />
    <meta itemprop="url" content="http://davidbcalhoun.com/wp-content/uploads/2012/10/René_Descartes_i_samtal_med_Sveriges_drottning_Kristina.jpeg" />
    <a href="http://commons.wikimedia.org/wiki/File:Ren%C3%A9_Descartes_i_samtal_med_Sveriges_drottning,_Kristina.jpg">
        <img itemprop="contentUrl" src="http://davidbcalhoun.com/wp-content/uploads/2012/10/René_Descartes_i_samtal_med_Sveriges_drottning_Kristina.jpeg" alt="Oh my! I find your foundations to be awfully shaky. (note: not an actual Descartes quote)" />
    </a>
    <figcaption itemprop="caption">"Oh my! I find your foundations to be awfully shaky." (note: not an actual Descartes quote)</figcaption>
</figure>

> Philosophy has been pursued for many centuries by the best minds, and yet everything in it is still disputed and hence doubtful; and I wasn’t so arrogant as to hope to achieve more in philosophy than others had done. Considering how many different opinions learned men may maintain on a single question—where at most one can be true—I regarded everything that was merely probable as being near enough to false. -[Descartes, Discourse on Method][2]

Descartes's task, if you'll remember, is intense self-examination where he throws out any questionable belief in order to build a strong foundation of clear and unquestionable beliefs. He doubts literally everything, until he comes to the one thing that can't be doubted: that there is obviously *something* doing the doubting. Namely himself. This is where the concept "I think, therefore I am" comes from ("Je pense, donc je suis", and in Latin as "Cogito ergo sum" in a later work).

### The software engineer tie-in

Software engineers, I've found, when given the chance, are likewise just as skeptical of the "status quo". They take a look at the landscape around them, but find themselves dissatisfied and unable to find a perfectly suitable software framework. Of course many people do find close approximations and are perfectly happy using an existing framework. On the other hand, there are definitely purists who believe the proper thing to do is to create their own tailor-made framework from the ground up. Descartes would definitely fit into this latter category.

What I've found over my short career in software is that engineers like to build custom frameworks. Lots of custom frameworks. And they often times like to build them in a purist way, from the ground up.

Building your own framework turns out not only to be more interesting and fun (rather than maintaining some existing framework), but it's also supposedly a better way to ensure a lack of cruft, and to ensure a firm foundation. A foundation which has no component that is unneeded or of which can be doubted.

The danger of doing otherwise, it's thought, is that after investing the effort to learn an existing framework, one might find it wasn't that great after all. Or worse, that it had questionable foundations which would need to be patched up. This is not unlike the task of learning an existing philosophical system, only to see holes poked in its very foundations (as the quote above states, this is essentially what philosophers have been doing for centuries - poking holes in each other's foundations).

### Better than maintaining the old

> Regarding the opinions which I had previously held, I couldn’t do better than set out to get rid of them all at one go, so as then to replace them afterwards with better opinions or even with the same ones after I had straightened them out using reason’s plumb-line. I ﬁrmly believed that this would let me conduct my life much better than if I were to build only on old foundations and rely only on principles that I had accepted in my youth without ever examining whether they were true. Even if I were to see various difﬁculties in this project, they weren’t insurmountable, and weren’t comparable with the difﬁculties involved in reforming even minor matters affecting public institutions. -[Descartes, Discourse on Method][2]

The huge drawback of "going at it on our own" is of course the fact that *we* are now responsible for creating the entire foundation and each component of our custom framework. Descartes would be perfectly fine with this.

And this is exactly what he did with himself: he tore down everything he thought he knew to be true, then started to slowly build up his philosophy bit by bit. Better to do this than to patch old shaky foundations in existing philosophies.

### Reusing old bits

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="395" />
    <meta itemprop="height" content="597" />
    <meta itemprop="url" content="http://davidbcalhoun.com/wp-content/uploads/2012/10/Descartesmaison.jpeg" />
    <a href="http://commons.wikimedia.org/wiki/File:Descartesmaison.jpg">
        <img itemprop="contentUrl" src="http://davidbcalhoun.com/wp-content/uploads/2012/10/Descartesmaison.jpeg" alt="Descartes's house. Hmm, not sure the foundations are secure here..." />
    </a>
    <figcaption itemprop="caption">Descartes's house. Hmm, not sure the foundations are secure here...</figcaption>
</figure>

Interestingly enough, parts of old beliefs (old frameworks) may still find their way in, but only after intense scrutiny:

> Just as in demolishing an old house we usually keep the materials for use in building a new one, so in destroying all those opinions of mine that I judged to be ill-founded I made various observations and acquired many experiences that I have since used in establishing more certain opinions. -[Descartes, Discourse on Method][2]

In other words, there's some good bits out there that have already been created. Might as well reuse them if they're good enough.

### Philosophy as a preview of the future of software development

Obviously philosophy didn't stop with Descartes. He did become the foundation for others in the modern tradition to build on (namely Spinoza and Leibniz, and most others who came after him), but of course that wasn't the end of it. The famous "cogito ergo sum", the foundation of Descartes's philosophy and seemingly common sense, [hasn't even been immune from criticism][5].

Folks have continued to build philosophies and have continued to be unsatisfied with what's out there, or unconvinced that it's even useful in this age.

I believe we approach software frameworks, software itself, and even programming languages the same way. Unsatisfied with what's out there, people will continue to build new things and new tools which work for the time being for certain groups of people.

Inevitably, a new generation of developers, not unlike a new generation of philosophers, will eventually tear it all down and start over again.

 [1]: http://commons.wikimedia.org/wiki/File:Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg
 [2]: http://en.wikipedia.org/wiki/Discourse_on_the_Method
 [3]: http://commons.wikimedia.org/wiki/File:Ren%C3%A9_Descartes_i_samtal_med_Sveriges_drottning,_Kristina.jpg
 [4]: http://commons.wikimedia.org/wiki/File:Descartesmaison.jpg
 [5]: http://en.wikipedia.org/wiki/Cogito_ergo_sum#Criticisms