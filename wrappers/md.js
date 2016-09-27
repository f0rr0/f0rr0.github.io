import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import { config } from 'config'; // eslint-disable-line
import { TweetThis, FacebookShare } from '../src/components/Social';
import ReadNext from '../src/components/ReadNext';
import Bio from '../src/components/Bio';
import { isBlogPost, getBlogPosts, getNextPosts, getPostsFromPaths } from '../src/utils/blog-helpers';

import '../src/css/tomorrow-night.css';

export default class MarkdownWrapper extends Component {
  render() {
    const { route } = this.props;
    const { page: { data: post } } = route;
    const path = post.path = route.path;
    const posts = getBlogPosts(route);

    let docTitle = `${post.title}`;
    let blog = false;
    let nextPosts;

    if (isBlogPost(post)) {
      docTitle = `${post.title} - ${config.blogTitle}`;
      blog = true;
      nextPosts = post.readNext ? getPostsFromPaths(post.readNext, posts) :
       getNextPosts(path, posts);
    }

    return (
      <DocumentTitle title={docTitle}>
        {
          blog ?
            <section className='content'>
              <article className='post-body'>
                <header className='post-header'>
                  <h2>{post.title}</h2>
                  <div>
                    <time>{moment(post.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}</time> &middot; {post.words} words &middot; {post.readTime}
                  </div>
                </header>
                <div className='post-content' dangerouslySetInnerHTML={{ __html: post.body }} />
              </article>
              <aside className='post-footer'>
                <ul>
                  <li><TweetThis {...post} /></li>
                  <li><FacebookShare {...post} /></li>
                </ul>
                <ReadNext posts={nextPosts} />
                <hr />
                <Bio />
              </aside>
            </section>
          :
            <section className='content'>
              <p dangerouslySetInnerHTML={{ __html: post.body }} />
            </section>
        }
      </DocumentTitle>
    );
  }
}

MarkdownWrapper.propTypes = {
  route: PropTypes.object
};
