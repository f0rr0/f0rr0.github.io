import React, { PropTypes } from 'react';
import Masthead from '../src/components/Masthead';
import Footer from '../src/components/Footer';
import '../src/css/yuppies.css';

export default function Template(props) {
  const { children } = props;
  return (
    <main>
      <Masthead />
      {children}
      <Footer />
    </main>
  );
}

Template.propTypes = {
  children: PropTypes.any
};
