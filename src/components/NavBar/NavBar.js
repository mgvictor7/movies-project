import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'

import * as UserActions from '../../redux/user/actions';

import useUserAutheticated from '../../hooks/useUserAutheticated';

import './NavBar.scss';

export default function NavBar() {
  const [isAuthenticated, user] = useUserAutheticated();

  const dispatch = useDispatch();
  const logout = (params) => {
    dispatch(UserActions.logout(params));
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="nav-bar">
      <span className="title">Movies List</span>
      {isAuthenticated ?
        <a href="#" className="logout-button" onClick={handleLogout}>Logout</a>
        :  
        <Link className="login-button" to="/login">Login</Link>
      }
    </div>
  )
}