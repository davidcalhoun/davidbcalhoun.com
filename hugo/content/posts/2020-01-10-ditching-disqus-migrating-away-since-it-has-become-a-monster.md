---
title: "Ditching Disqus (Migrating Away Since It Has Become a Monster)"
description: "Detailing how to fully export Disqus comments and migrate to Commento."
date: 2020-01-10T10:28:03-05:00
draft: false
tags:
- disqus
- commento
- comments
- blogging
image: https://www.davidbcalhoun.com/wp-content/uploads/2020/disqus-crazy-network-requests.png
imageAlt: "Disqus unleashed: making almost 100 HTTP requests to its own servers and random ad servers."
---

The time has finally come for me to ditch Disqus for comments.  I'll let this gif do the talking:

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="700" />
    <meta itemprop="height" content="474" />
    <meta itemprop="url" content="https://www.davidbcalhoun.com/wp-content/uploads/2020/disqus-crazy-amount-of-requests.gif" />
    <a href="https://www.davidbcalhoun.com/wp-content/uploads/2020/disqus-crazy-amount-of-requests.gif">
        <img itemprop="contentUrl" src="https://www.davidbcalhoun.com/wp-content/uploads/2020/disqus-crazy-amount-of-requests.gif" title="Disqus unleashed: making almost 100 HTTP requests to its own servers and random ad servers." />
    </a>
    <figcaption itemprop="caption">Disqus unleashed: making almost 100 HTTP requests to its own servers and random ad servers.</figcaption>
</figure>

## The downside of a *free* service

As the addage goes: if you are not paying for the product, *you* are the product.  And the ad companies are the customers, vying for the ability to track you and your interests as you move around the web.

Yet for a free product that's really easy to setup, Disqus was not too bad of a choice back in the day when first migrating to a static site.  It was a really easy way to get up and running and requires really minimal configuration.  It's a huge timesaver for folks who are focused more on migrating and hosting their content, when the focus on comments is almost an afterthought.

Back in the day when I first installed Disqus, I really don't think it was as abusive with its HTTP requests.  I think I would have noticed it loading almost 100 additional HTTP requests, but then again I may have just overlooked it or only tested with my browser with its adblocking features.  I think Disqus, like all things tend to do, has likely just grown larger and more out of control with time.

It's a bit shocking to snoop around and see all the HTTP requests being made today: a ton of heavy payloads for content from Disqus servers, in addition to ad servers, Facebook (!?), and YouTube.  After watching the network panel flood with requests (as you can see in the Gif above) I decided it was time to ditch Disqus and look for alternatives.

## Migrating from Disqus to Commento

<figure itemprop="image" itemscope="" itemtype="http://schema.org/ImageObject" class="center">
    <meta itemprop="width" content="700" />
    <meta itemprop="height" content="474" />
    <meta itemprop="url" content="https://www.davidbcalhoun.com/wp-content/uploads/2020/commento-website.png" />
    <a href="https://www.commento.io/">
        <img itemprop="contentUrl" src="https://www.davidbcalhoun.com/wp-content/uploads/2020/commento-website.png" title="Commento's website, promoting performance and privacy above all else.  Sounds good to me!" />
    </a>
    <figcaption itemprop="caption">Commento's website, promoting performance and privacy above all else.  Sounds good to me!</figcaption>
</figure>

There's a few options out there, but [Commento](https://www.commento.io/) stood out.  It is by no means perfect, but it's decent enough, and the setup is quite easy for folks willing to pay the $5/month fee.  For folks who are cheap and/or not currently able to afford that monthly fee (that's yours truly on both counts), Commento is particularly attractive because is an open-source project that has a free self-hosting option.  That's the path I started to go down.

## The disadvantages of using Commento (in general)

Fair warning, Commento has a few rough edges, but it's in active development, so I expect some of the following criticisms to become invalid with time, so do your own research!

Here's a list of some disadvantages:

* Testing locally requires modifying the clientside code in `commento.js`, as [Remy Sharp](https://remysharp.com/2019/06/11/ejecting-disqus) found.

* Disqus will not export user avatars, links to user websites, Disqus profile urls, or post votes.  If you are self-hosting and have access to your local Commento's database, there is a workaround which I've explained below with some helper code.

* If your Disqus export doesn't contain trailing slashes and your website does, there will be a mismatch and the page won't load any comments, and it's won't be obvious what's going wrong.  I solved this by tweaking `commento.js` to remove trailing slashes.

* The comment moderation panel lives on each individual page on your own website. There's no way to see an overview of all comments (the Commento settings page in general is a bit sparse)

* There's a weird issue with spaces getting eaten up when trying to edit comments.

* Relative time formatting is a little funky. Commento displays "24 months ago" instead of a more natural "2 years ago".  This is [intended](https://gitlab.com/commento/commento/issues/258), but it would be nice to make this configurable.  As of now, this is another thing you can simply hack around in `commento.js`

### Disadvantages when self-hosting Commento
This deserves its own section, as many folks will not be going down the self-hosting road.

* No built-in support for SSL. This is a big downside, as it requires extra time fiddling around setting up a proxy.  This [setup guide](https://www.freecodecamp.org/news/how-to-setup-worry-free-blog-comments-in-20-simple-steps/) details that process using Docker containers.

* Extra overhead of setting up and maintaining a server, database, HTTPS proxy, SSL cert generation/renewal, mail server (for email confirmations), and Oath keys if you want to support users loggin in through Twitter, Google, or Gitlab.

## Migrating Disqus avatars, links, and votes
When you [export your comments from Disqus](http://disqus.com/admin/discussions/export/), you receive an email link to a zipped up XML of comments.  Commento uses this file to import all your old comments.  However there is unfortunately missing information which would be unfortunate to lose.

For instance, my blog doesn't get a lot of comments in general, but I have a few popular entries such as my aging post about [UMD and older JavaScript modules](https://www.davidbcalhoun.com/2014/what-is-amd-commonjs-and-umd/) (which now needs to be updated with ES Modules!), which has a few avatars, links to user sites, and post votes.  The top post has over 70 upvotes, so it would be a pity to lose that information.

Luckily there is a way to get this information, albeit somewhat hacky (but hey, it works):

1. Login to [Disqus](https://disqus.com), then click on the site you want to export.
1. Open your `Network` tab in your web dev tools window.
1. Click on `Moderate comments` in the navigation on the left.
1. Click on the `Approved` tab on top.
1. Search for `list` in your Network tab and copy the URL.  It will look something like this: `https://disqus.com/api/3.0/posts/list?attach=postModHtml&attach=postAuthorRep&limit=25&include=approved&order=desc&related=thread&related=forum&forum=[FORUM_ID_REMOVED]&start=2007-01-01T05%3A00%3A00.000Z&end=2020-01-11T04%3A59%3A59.999Z&api_key=[KEY_REMOVED]&_=1578681496399`
1. In your copied URL, change `limit=25` to `limit=100` (100 is the maximum supported by the API).  This is your new "base URL".
1. Request the base URL in your browser or a script.
1. To request the next page of comments, inspect the current JSON and copy the contents of `cursor.next`.  Append this to the base url with `&cursor=[STRING_YOU_COPIED_FROM_ABOVE]`.  Append this to the base URL to get the next page.  Continue this process for each page until `cursor.next` is `null`.  Now you've fetched all the comment pages!

### Sample Node.js Disqus fetch script

Below is the Node.js I made to fetch each page of Disqus comments (what I described above) and then convert the relevant bits of info into SQL statements.  This worked for me but it's not perfect and a bit hacky.  Feel free to tweak it!

I may eventually move this to Github, but it's here for now.  To initialize:

1. `mkdir disqus-migrate && cd disqus-migrate`
1. `npm init` (just accept all the default suggestions)
1. `npm i --save node-fetch`
1. `touch index.js`
1. Paste the following code into `index.js` (**make sure to update the URL passed into `init()` with the "Base URL" from above**):


``` javascript
const fs = require('fs');
const fetch = require('node-fetch');

function escapeQuotes(str = "") {
    return str.replace(/'/g, "''");
}

async function fetchDisqusComments(firstURL) {
	return new Promise(async (resolve, reject) => {
		let isDone = false;

		let posts = [];
		let curURL = firstURL;
		let page = 1;
		while (!isDone) {
			console.log(`Fetching page ${page}`);
			const response = await fetch(curURL);
			const json = await response.json();
			console.log(`Success fetching page ${page}`);

			posts.push(json.response);

			if (json.cursor.hasNext) {
				curURL = `${firstURL}&cursor=${json.cursor.next}`;
			} else {
				isDone = true;
			}

			page++;
		}

		resolve(posts);
	});
}

/**
 * Converts Disqus comments array into an SQL transaction statement to insert into Commento's
 * Postgres database.
 */
function commentsToSQL(comments) {
    let sql = comments.reduce((accum, comment) => {
        const name = escapeQuotes(comment.author.name);

        // Add avatar to user if found (Commento calls this the "photo").
        const hasAvatar = comment.author.avatar.large.permalink.match(/images\/noavatar/) === null;
        if (hasAvatar) {
            accum = accum.concat(`
UPDATE commenters
SET photo='${comment.author.avatar.permalink}'
WHERE
    name='${name}'
    AND photo='undefined';`);
        }

        // Add link to author's website, or their Disqus profile url.
        const link = comment.author.url || comment.author.profileUrl;
        accum = accum.concat(`
UPDATE commenters
SET link='${link}'
WHERE
    name='${name}'
    AND link='undefined';`);

        // Adds post points (Commento calls this the "score").
        if (comment.points > 0) {
        accum = accum.concat(`
UPDATE comments
SET score=${comment.points}
WHERE 
    score=0
    AND html LIKE '%${escapeQuotes(comment.message.substr(0, 50))}%'
    AND exists (
        SELECT * 
        FROM commenters 
        WHERE commenters.commenterhex = comments.commenterhex
        AND commenters.name = '${name}'
    );
`);
        }


      return accum;
    }, 'BEGIN;');

    sql = `${sql}\nCOMMIT;`;

    return sql;
}

async function init(firstURL, filePath = '/tmp/disqus-comments.sql') {
    const comments = await fetchDisqusComments(firstURL);

    const sql = commentsToSQL(comments);

    fs.writeFile(filePath, sql, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log(`Comments saved to ${filePath}`);
    }); 
}

init('https://disqus.com/api/3.0/posts/list?attach=...');
```

Now all the SQL statements you need to run are at `/tmp/disqus-comments.sql`.  If you are like me and are running Commento and its database in a Docker container, you can copy this into the container and run the SQL with the following:

1. Find the id of the container running Postgres:
    * `docker ps`
1. Copy the file from your system into the Docker container:
	* `docker cp /tmp/disqus-comments.sql POSTGRES_CONTAINER_ID:/tmp/disqus-comments.sql`
1. Get inside the Postgres container:
    * `docker exec -it POSTGRES_CONTAINER_ID bash`
1. Run the SQL migration script:
    * `psql -U POSTGRES_USERNAME -d commento -f /tmp/disqus-comments.sql`

Phew!  That should be most of it.  At this point you should now see user website links and comment points (score) showing up.  But no avatars yet?!  What gives?

[Remy's](https://remysharp.com/2019/06/11/ejecting-disqus) solution of self-hosting the original Disqus avatars is probably a better solution, but you can alternatively do what I did and simply point to the original Disqus image paths.  But for that to work you need to make yet another tweak to `commento.js`!  In two places I needed to change this:

```js
avatar = create("img");
attrSet(avatar, "src", cdn + "/api/commenter/photo?commenterHex=" + commenter.commenterHex);
```

To this:

```js
var isFullURL = commenter.photo.match(/(http|https):\/\//).length > 0;
var src = isFullURL
	? commenter.photo
	: cdn + "/api/commenter/photo?commenterHex=" + commenter.commenterHex;
avatar = create("img");
attrSet(avatar, "src", src);
```

Which is a quick check to use the full URL if that's what's in the database (which is what the migrate script above did).

Phew, that was a lot!  I left out a lot of steps about setting up a server on Amazon EC2, configuring the mail server, pointing the CNAME of `comments.davidbcalhoun.com` to the Amazon URL, setting up Docker containers, etc.  You can read a bit of that in this [article Jared Wolff wrote](https://www.freecodecamp.org/news/how-to-setup-worry-free-blog-comments-in-20-simple-steps/).

At this point only a few pages on my site, including this one, are using the new self-hosted Commento comments.  I want to make sure everything seems ready to go, and I'm hoping to keep the EC2 instance within free limits, so hopefully after this setup it will be a truly free solution!

## Related links

* [Ejecting Disqus by Remy Sharp](https://remysharp.com/2019/06/11/ejecting-disqus)
* [Brilliant Add-on For Static Sites That Will Make You Dance by Jared Wolff](https://www.freecodecamp.org/news/how-to-setup-worry-free-blog-comments-in-20-simple-steps/)





