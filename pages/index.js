import { config } from 'config'; // eslint-disable-line
import React from 'react';
import DocumentTitle from 'react-document-title';
import QuantfiedSelf from '../src/components/QuantifiedSelf';
import '../src/css/lists.css';

export default function BlogIndex() {
  return (
    <DocumentTitle title={`${config.blogTitle} - ${config.authorName}`}>
      <section className='content'>
        <p>
          I track my time on <a href='//rescuetime.com'>Rescuetime</a> and music on <a href='//last.fm/user/sidjain26'>Lastfm</a>. Here are the latest stats
        </p>
        <QuantfiedSelf />
      </section>
    </DocumentTitle>
  );
}
