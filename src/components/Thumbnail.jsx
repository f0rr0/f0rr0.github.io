import React, { PropTypes } from 'react';
import ProgressiveImage from 'react-progressive-image';
import placeholder from '../../images/albumart.png';

export default function Thumbnail(props) {
  return (
    <ProgressiveImage src={props.src} placeholder={props.placeholder}>
      {
        img =>
          <div
            className='thumb'
            style={{ backgroundImage: `url(${img})` }}
          />
      }
    </ProgressiveImage>
  );
}

Thumbnail.propTypes = {
  src: PropTypes.string,
  placeholder: PropTypes.string
};

Thumbnail.defaultProps = {
  placeholder
};
