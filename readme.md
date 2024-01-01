# davidbcalhoun.com

Source code of [davidbcalhoun.com](https://www.davidbcalhoun.com/)

## Install

- Install [Node.js, which comes with npm](https://nodejs.org)
- Install [brew](https://brew.sh/)
- Install Hugo using brew: `brew install hugo`

## Dev

`cd src` and then run one of the following:

- `npm start` - runs local dev server.  Will open a new browser tab (you may need to refresh the tab)
- `npm run build` - builds to `/docs` for Github pages

- `hugo new content/posts/YYYY-MM-DD-post-title.md` - make a new post
  - Shortcut: `hugo new content/posts/$(date +%F)-post-title.md`

- Update Hugo: `brew update hugo`