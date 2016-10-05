import { config } from 'config'; // eslint-disable-line
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Archive from '../src/components/Archive';

export default function BlogIndex({ route }) {
  return (
    <section className='content'>
      <Helmet title='Blog' />
      <header>
        <h2>Archive</h2>
      </header>
      <Archive route={route} />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};
