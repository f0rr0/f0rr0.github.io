import React, { PropTypes } from 'react';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line

const Icon = ({ icon }) =>
  <span className='footer-icon' style={{ backgroundImage: `url(${prefixLink(`/icons/${icon}.svg`)})` }} />;

Icon.propTypes = {
  icon: PropTypes.string
};

export default function Footer() {
  return (
    <footer>
      <section>
        <p>
          <a href='mailto:sid_26@outlook.com' >
            <Icon icon='send' /> sid_26@outlook.com
          </a>
        </p>
        <ul>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//yuppi.es/atom'>
              <Icon icon='rss' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//facebook.com/f0rr0'>
              <Icon icon='facebook' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//twitter.com/f0rr0'>
              <Icon icon='twitter' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//github.com/f0rr0'>
              <Icon icon='github' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//linkedin.com/in/f0rr0'>
              <Icon icon='linkedin' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//medium.com/@f0rr0'>
              <Icon icon='medium' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//open.spotify.com/user/sidjain95'>
              <Icon icon='spotify' />
            </a>
          </li>
          <li>
            <a rel='noopener noreferrer' target='__blank' href='//www.last.fm/user/sidjain26'>
              <Icon icon='lastfm' />
            </a>
          </li>
          {/* Crazy goodreads icon */}
          <li style={{ paddingLeft: 0 }}>
            <a rel='noopener noreferrer' target='__blank' href='//goodreads.com/f0rr0'>
              <Icon icon='goodreads' />
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
