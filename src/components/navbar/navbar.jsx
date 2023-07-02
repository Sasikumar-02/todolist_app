import { Outlet, Link } from 'react-router-dom';
import './navbar.css';
import React from 'react';
export const Navbar = () => {
  return (
    <React.Fragment>
      <nav className='navbar'>
        <ul>
          <li>
            <Link to="/">All</Link>
          </li>
          <li>
            <Link to="/inprogress">Inprogress</Link>
          </li>
          <li>
            <Link to="/completed">Completed</Link>
          </li>
          <li>
            <Link to="/trash">Trash</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </React.Fragment>
  );
};