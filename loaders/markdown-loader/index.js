import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
import twemoji from 'twemoji';
import striptags from 'striptags';
import readingTime from 'reading-time';
import excerptHtml from 'excerpt-html';

const highlight = (str, lang) => {
  if ((lang !== null) && hljs.getLanguage(lang)) {
    try {
      return hljs.highlight(lang, str).value;
    } catch (error) {
      console.error(error); // eslint-disable-line
    }
  }
  try {
    return hljs.highlightAuto(str).value;
  } catch (error) {
    console.error(error); // eslint-disable-line
  }
  return '';
};

const md = markdownIt({
  html: true,
  linkify: true,
  highlight
}).use(require('markdown-it-emoji'))
  .use(require('markdown-it-implicit-figures'), {
    figcaption: true
  })
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§'
  })
  .use(require('markdown-it-attrs'));

md.linkify.tlds('onion', true);
md.linkify.add('git:', 'http:');
md.linkify.add('ftp:', null);
md.set({ fuzzyIP: true });

md.renderer.rules.emoji = (token, idx) => twemoji.parse(token[idx].content, {
  ext: '.svg',
  folder: 'svg'
});

export default function (content) {
  this.cacheable();

  const meta = frontMatter(content);
  const body = md.render(meta.body);
  const { text: readTime, words } = readingTime(striptags(body));
  const excerpt = excerptHtml(body, {
    pruneLength: 140
  });

  if (typeof meta.attributes.readNext === 'string') {
    meta.attributes.readNext = [meta.attributes.readNext];
  }

  const result = Object.assign({}, meta.attributes, {
    excerpt,
    readTime,
    words,
    body
  });

  this.value = result;
  return `module.exports = ${JSON.stringify(result)}`;
}
