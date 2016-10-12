import React, { PropTypes } from 'react';
import ProgressiveImage from 'react-progressive-image';

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

const placeholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSI+CjxyZWN0IHdpZHRoPSIxNSIgaGVpZ2h0PSIxNSIgZmlsbD0iIzIxMjMyZCI+CiAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0iZmlsbCIgdmFsdWVzPSIjMjEyMzJkOyMzZTQyNTY7IzIxMjMyZCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4KPC9yZWN0Pgo8L3N2Zz4=';

Thumbnail.propTypes = {
  src: PropTypes.string,
  placeholder: PropTypes.string
};

Thumbnail.defaultProps = {
  placeholder
};
