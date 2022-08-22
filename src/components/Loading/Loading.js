import React from 'react';
import PropTypes from 'prop-types';

import './Loading.scss';

export default function Loading(props) {
  const { center } = props;
  return (
    <div className={`lds-ring ${center && 'center'}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

Loading.propTypes = {
  center: PropTypes.bool,
};

Loading.defaultProps = {
  center: false,
}