import moment from 'moment';
import sortBy from 'lodash.sortby';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

export function isBlogPost({ path }) {
  return path.indexOf('/blog/') >= 0 && path !== '/blog/' && path !== prefixLink('/blog/');
}

export function getBlogPosts(route) {
  const { pages } = route;
  const posts = pages.filter(page => isBlogPost(page) && !page.data.draft);
  return sortBy(posts, ({ data: { date } }) => moment(date, 'MM/DD/YYYY').valueOf()).reverse();
}

export function getPostsFromPaths(paths, posts) {
  const allPaths = posts.map(({ path }) => path);
  return paths.map(path => posts[allPaths.indexOf(`/blog/${path}/`)]);
}

export function getNextPosts(currPath, posts, num = 3) {
  const currIndex = posts.map(({ path }) => prefixLink(path)).indexOf(currPath);
  if (posts.length === 1) {
    return null;
  } else if (currIndex < num) {
    return posts.slice(0, currIndex)
     .concat(posts.slice(currIndex + 1, num + 1));
  }
  return posts.slice(currIndex - num - 1, currIndex);
}
