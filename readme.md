# davidbcalhoun.com

Source code of [davidbcalhoun.com](https://www.davidbcalhoun.com/)

## Install

- Install [Node.js, which comes with npm](https://nodejs.org)
- Install [brew](https://brew.sh/)
- Install Hugo using brew: `brew install hugo`

## Dev

`cd src` and then run one of the following:

- `npm start` - runs local dev server. Will open a new browser tab (you may need to refresh the tab)
- `npm run build` - builds to `/docs` for Github pages

- `hugo new content/posts/YYYY-MM-DD-post-title.md` - make a new post

  - Shortcut: `hugo new content/posts/$(date +%F)-post-title.md`

- Update Hugo: `brew update hugo`

## Example new post flow

1. In the `image-resizer` copy the original fullsize JPEGs into the `test` directory, then run `npm start`.
1. Copy the terminal output, this will be a shortcut for dropping in images in the post.
1. In this repo (`davidbcalhoun.com`), copy the minified images from the last step (but not originals!) into `/static/wp-content/uploads/`
1. Run `hugo new content/posts/$(date +%F)-post-title.md`
1. Run `npm start`

If Hugo crashes because of syntax issues, it might still be kept alive as a zombie process.  When you relaunch, pay attention if it launched on a new port.