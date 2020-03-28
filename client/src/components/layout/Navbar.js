import React from 'react';
import { Link } from 'react-router-dom';
// Assets
import { Zap, List, LogIn } from 'react-feather';
import logo from '../assets/amico-logo.png';

const Navbar = () => {
  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <a className='navbar-brand' href='/'>
        <img
          src={logo}
          width='80'
          height='80'
          className='d-inline-block align-top'
          alt=''
        />
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarSupportedContent'
        aria-controls='navbarSupportedContent'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon'></span>
      </button>

      <div className='collapse navbar-collapse' id='navbarSupportedContent'>
        <ul className='navbar-nav ml-auto'>
          <li className='nav-item'>
            <Link className='nav-link' to='/discover'>
              <Zap /> Discover
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/register'>
              <List /> Register
            </Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/login'>
              <LogIn /> Login
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
