import React, { PropTypes } from 'react';
import { ShareButtons, generateShareIcon } from 'react-share';

const { FacebookShareButton, TwitterShareButton } = ShareButtons;
const FacebookIcon = generateShareIcon('facebook');
const TwitterIcon = generateShareIcon('twitter');

const TweetThis = props =>
  <TwitterShareButton url={`https://yuppi.es${props.path}`} title={props.title} via={'f0rr0'} className={'share-icons'}>
    <TwitterIcon round size={32} />
  </TwitterShareButton>;

const FacebookShare = props =>
  <FacebookShareButton url={`https://yuppi.es${props.path}`} title={props.title} className={'share-icons'}>
    <FacebookIcon round size={32} />
  </FacebookShareButton>;

FacebookShare.propTypes = TweetThis.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string
};

export { TweetThis, FacebookShare };
