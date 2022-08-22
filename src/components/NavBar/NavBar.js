import React from 'react';

import { Link } from "react-router-dom";

import './NavBar.scss';

export default function NavBar() {
  return (
    <div className="NavBar">
      <span className="Title">Movies List</span>
      <Link className="LoginButton" to="/">Login</Link>
    </div>
  )
}