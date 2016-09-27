import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

export default function Masthead() {
  return (
    <header className='masthead'>
      <h1>
        <Link to={prefixLink('/')}>
          {config.mastHead}
        </Link>
      </h1>
      <nav>
        <ul>
          <li>
            <Link to={prefixLink('/about/')}>
              About
            </Link>
          </li>
          &middot;
          <li>
            <Link to={prefixLink('/blog/')}>
              Blog
            </Link>
          </li>
          &middot;
          <li>
            <Link to={prefixLink('/hire/')}>
              Hire Me
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

Masthead.propTypes = {
  className: PropTypes.string
};
