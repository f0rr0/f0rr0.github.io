import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

const generateNextPostsList = posts =>
  posts.map(({ data: { title, description, readTime }, path }) =>
    <li key={title}>
      <Link to={prefixLink(path)}>
        {title}
      </Link> &middot; <small>{readTime}</small>
      <p><small>{description}</small></p>
    </li>
  );

export default function ReadNext({ posts }) {
  if (posts) {
    return (
      <article>
        <header>
          <h4>Read Next</h4>
        </header>
        <ul>
          {generateNextPostsList(posts)}
        </ul>
      </article>
    );
  }
  return null;
}

ReadNext.propTypes = {
  posts: PropTypes.array
};
