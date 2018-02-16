import React from 'react';
import { Link } from 'react-router';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import avatar from '../../images/avatar.jpg';

export default function Bio() {
  return (
    <div className='bio'>
      <img className='avatar' alt='avatar' src={prefixLink(`${avatar}`)} />
      <p className='intro'>
        Written by <Link to='/about/'>Sid Jain</Link> &mdash; an autodidact developer interested in minimal design, advanced JavaScript and everything &lambda;.
      </p>
    </div>
  );
}
