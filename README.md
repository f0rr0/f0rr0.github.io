
Source code for my blog.

### Installation

You will need [gatsby](https://github.com/gatsbyjs/gatsby), obviously.

```
npm i -g gatsby
git clone https://github.com/f0rr0/f0rr0.github.io
cd f0rr0.github.io
npm i
npm run dev
```

You should have the site running on `localhost:8000`.

### Deployment

Gatsby can be deployed on any static server. This one is deployed via GitHub Pages on the master branch.

### Cross-post to Medium

Make a `.env` file in `./src/scripts` and set your [Medium Integration Token](https://help.medium.com/hc/en-us/articles/215274738-Integration-tokens) like so:

```
TOKEN=YOUR_TOKEN_HERE
```

That's it. Cross-posting works out of the box with:

```
npm run medium
```

Make sure you edit `config.toml` to reflect *your own* website.

### License

The files under `blog` are Copyright 2016, All Rights Reserved.

The rest of the project is under the [GNU Affero General Public License v3.0.](http://www.gnu.org/licenses/agpl-3.0.txt)
