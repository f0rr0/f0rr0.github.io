import Feed from 'feed';
import { processFile as parseMd } from 'md-yaml-json';
import { parse as parseToml } from 'toml';
import { load as parseHtml } from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import moment from 'moment';

const isBlogPost = path => path && path.indexOf('/blog/') >= 0 && path !== '/blog/';

const config = parseToml(readFileSync(`${resolve(__dirname, '../../config.toml')}`).toString());

const author = {
  name: config.authorName,
  email: config.email,
  link: `${config.domain}/about`
};

export default function generateFeed(pages) {
  const now = moment(new Date());

  // Instantiate new Feed
  const feed = new Feed({
    title: config.blogTitle,
    description: config.description,
    id: `${config.domain}/`,
    link: config.domain,
    copyright: `All rights reserved  ${now.format('YYYY')}, Sid Jain`,
    updated: now.toJSON(),
    author
  });

  // Parse blog posts
  pages.forEach(({ path, requirePath, data }) => {
    if (isBlogPost(path) && !data.draft) {
      const { meta: { title, date, description }, html } = parseMd(`${resolve(__dirname, `../../${requirePath}`)}`);

      // Replace relative image links to absolute
      const $ = parseHtml(html, {
        recognizeSelfClosing: true
      });
      $('img').each((index, elem) => {
        const src = $(elem).attr('src').split('./').pop();
        $(elem).attr('src', `${config.domain}${path}${src}`);
      });

      // Add post to feed
      feed.addItem({
        title,
        link: `${config.domain}${path}`,
        description,
        content: $.html(),
        date: moment(date, 'MM/DD/YYYY').toDate(),
        author: [author]
      });
    }
  });

  writeFileSync(`${resolve(__dirname, '../../public/atom.xml')}`, feed.render('atom-1.0'));
}
