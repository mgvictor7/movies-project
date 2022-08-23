import React from 'react';
import PropTypes from 'prop-types';

import './ErrorMessage.scss';

export default function ErrorMessage(props) {
  const { retryGetMovies } = props;
  return (
    <div className="errorMessage">
      <span>An error has occurred</span>
      {retryGetMovies &&
        <a
          className='errorMessageBtn'
          onClick={retryGetMovies}
        >
          Retry
        </a>
      }
    </div>
  );
}

ErrorMessage.propTypes = {
  retryGetMovies: PropTypes.func
};

ErrorMessage.defaultProps = {
  retryGetMovies: null,
}