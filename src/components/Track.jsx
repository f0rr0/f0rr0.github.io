import React, { Component, PropTypes } from 'react';
import Ago from 'react-timeago';
import Thumbnail from './Thumbnail';

const Equalizer = () =>
  <div className='equaliser-container'>
    <ol className='equaliser-column'>
      <li className='colour-bar' />
    </ol>
    <ol className='equaliser-column'>
      <li className='colour-bar' />
    </ol>
    <ol className='equaliser-column'>
      <li className='colour-bar' />
    </ol>
    <ol className='equaliser-column'>
      <li className='colour-bar' />
    </ol>
    <ol className='equaliser-column'>
      <li className='colour-bar' />
    </ol>
  </div>;

const Timestamp = (props) => {
  if (props.timestamp.nowplaying) {
    return (
      <Equalizer />
    );
  }
  return (
    <Ago date={props.timestamp.uts * 1000} />
  );
};

Timestamp.propTypes = {
  timestamp: PropTypes.object
};

export default class Track extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, artist, timestamp, link, thumbs } = this.props;
    const thumb = thumbs.alt ? thumbs.alt : thumbs.yt;
    return (
      <a rel='noopener noreferrer' target='__blank' href={link}>
        <li style={{ opacity: 0 }} className='track' key={`${title}${artist}`}>
          <Thumbnail src={thumb} />
          <div className='info'>
            <div title={title} className='title ellipsis'>{title}</div>
            <div title={artist} className='artist ellipsis'>{artist}</div>
            <Timestamp className='timestamp ellipsis' timestamp={timestamp} />
          </div>
        </li>
      </a>
    );
  }
}

Track.propTypes = {
  link: PropTypes.string,
  thumbs: PropTypes.object,
  title: PropTypes.string,
  artist: PropTypes.string,
  timestamp: PropTypes.object
};
