import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate } from 'react-router-dom';

import useUserAutheticated from '../../hooks/useUserAutheticated';

/**
 * Redirect to Login if user is not Authenticated
 */
export default function RequireAuth(props) {
  const { children } = props;

  const [isAuthenticated] = useUserAutheticated();
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

RequireAuth.propTypes = {
  children: PropTypes.element.isRequired,
};
