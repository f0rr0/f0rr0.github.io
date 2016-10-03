import { config } from 'config'; // eslint-disable-line
import React, { PropTypes } from 'react';
import DocumentTitle from 'react-document-title';
import Archive from '../src/components/Archive';

export default function BlogIndex({ route }) {
  return (
    <DocumentTitle title='Blog'>
      <section className='content'>
        <header>
          <h2>Archive</h2>
        </header>
        <Archive route={route} />
      </section>
    </DocumentTitle>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};
