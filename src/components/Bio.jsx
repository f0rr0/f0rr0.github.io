import React from 'react';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import avatar from '../../avatar.jpeg';

export default function Bio() {
  return (
    <div className='bio'>
      <img className='avatar' alt='avatar' src={prefixLink(`${avatar}`)} />
      <p className='intro' dangerouslySetInnerHTML={{ __html: config.bio }} />
    </div>
  );
}
