import React from 'react';
import PropTypes from 'prop-types';

import NavBar from '../NavBar';

import './Layout.scss';

export default function Layout(props) {
  return (
    <div className="Layout">
      <NavBar />
      {props.children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};