import React, { useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import * as UserActions from '../../redux/user/actions';

import useUserAutheticated from '../../hooks/useUserAutheticated';
import useWindowSize from '../../hooks/useWindowSize';
import useOutsideClick from '../../hooks/useOutsideClick';

import './NavBar.scss';

export default function NavBar() {
  const dropdownRef = useRef();

  const [isAuthenticated] = useUserAutheticated();
  const { width } = useWindowSize();
  
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOpenDropdown = () => {
    setShowDropdown(prev => !prev);
  }

  useOutsideClick(dropdownRef, showDropdown, handleOpenDropdown);

  useEffect(() => {
    if (width > 600) {
      setShowDropdown(false);
    }
  }, [width]);

  const dispatch = useDispatch();
  const logout = (params) => {
    dispatch(UserActions.logout(params));
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="nav-bar">
      <Link className="title-wrapper" to="/">
        <span className="title">Movies List</span>
      </Link>
      {isAuthenticated ?
        <>
          <div className='nav-bar-link-wrapper'>
            <Link className="nav-bar-link" to="/favorites">Favorites</Link>
            <a href="" className="nav-bar-link" onClick={handleLogout}>Logout</a>
          </div>
          <div className='nav-bar-icon'>
            <FontAwesomeIcon
              className='hola'
              icon={faBars}
              size={'2x'}
              color="#FFFFFF"
              onClick={() => { handleOpenDropdown(); }}
            />
          </div>
          <div
            ref={dropdownRef}
            className='nav-bar-link-dropdown'
            style={showDropdown ? { display: 'flex' } : { display: 'none' }}
          >
            <Link className="nav-bar-link" to="/favorites">Favorites</Link>
            <a href="" className="nav-bar-link" onClick={handleLogout}>Logout</a>
          </div>
        </>
        :  
        <Link className="login-button" to="/login">Login</Link>
      }
    </div>
  )
}