import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

function generateNextPostsList(posts) {
  return posts.map(({ data: { title, excerpt, readTime }, path }) =>
    <li key={title}>
      <Link to={prefixLink(path)}>
        {title}
      </Link> &middot; <small>{readTime}</small>
      <p><small>{excerpt}</small></p>
    </li>
  );
}

export default function ReadNext({ posts }) {
  const list = generateNextPostsList(posts);
  if (posts) {
    return (
      <article>
        <header>
          <h4>Read Next</h4>
        </header>
        <ul>
          {list}
        </ul>
      </article>
    );
  }
  return null;
}

ReadNext.propTypes = {
  posts: PropTypes.array
};
