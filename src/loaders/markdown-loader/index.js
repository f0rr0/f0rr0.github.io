import frontMatter from 'front-matter';
import markdownIt from 'markdown-it';
import hljs from 'highlight.js';
import twemoji from 'twemoji';
import striptags from 'striptags';
import readingTime from 'reading-time';
import excerptHtml from 'excerpt-html';

const highlight = (str, lang) => {
  if (lang !== null && hljs.getLanguage(lang)) {
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
  typographer: true,
  highlight
})
  .use(require('markdown-it-attrs'))
  .use(require('markdown-it-emoji'))
  .use(require('markdown-it-implicit-figures'), {
    figcaption: true,
    copyAttrs: '^class$'
  })
  .use(require('markdown-it-link-attributes'), {
    pattern: /^https?:\/\//,
    attrs: {
      target: '_blank',
      rel: 'noopener noreferrer'
    }
  })
  .use(require('markdown-it-anchor'), {
    permalink: true,
    permalinkBefore: true,
    permalinkSymbol: '§'
  })
  .use(
    require('markdown-it-video', {
      youtube: { width: 640, height: 390 }
    })
  );

md.linkify.tlds('onion', true);
md.linkify.add('git:', 'http:');
md.linkify.add('ftp:', null);
md.set({ fuzzyIP: true });

md.renderer.rules.emoji = (token, idx) =>
  twemoji.parse(token[idx].content, {
    ext: '.svg',
    folder: 'svg'
  });

export default function (content) {
  this.cacheable();

  const meta = frontMatter(content);
  const body = md.render(meta.body);
  const { text: readTime, words } = readingTime(striptags(body));

  if (!meta.attributes.description) {
    meta.attributes.description = excerptHtml(body, {
      pruneLength: 250
    });
  }

  if (typeof meta.attributes.readNext === 'string') {
    meta.attributes.readNext = [meta.attributes.readNext];
  }

  const result = Object.assign({}, meta.attributes, {
    readTime,
    words,
    body
  });

  this.value = result;
  return `module.exports = ${JSON.stringify(result)}`;
}
