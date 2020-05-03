import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
// Assets
import { Zap, List, LogIn, User, Settings, LogOut } from 'react-feather';
import logo from '../assets/amico-logo.png';

const Navbar = ({ auth: { user, isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <div className='collapse navbar-collapse' id='navbarSupportedContent'>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link
            className='nav-link'
            to='/discover'
            tabIndex='-1'
            aria-disabled='true'
          >
            <Zap /> Discover
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            className='nav-link'
            to={user !== null && `/profile/${user._id}`}
          >
            <User /> Profile
          </Link>
        </li>
        <li className='nav-item'>
          <Link className='nav-link' to='/settings'>
            <Settings /> Settings
          </Link>
        </li>
        <li className='nav-item'>
          <a className='nav-link' href='#!' onClick={logout}>
            <LogOut /> Logout
          </a>
        </li>
      </ul>
    </div>
  );

  const guestLinks = (
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
  );

  return (
    <div className='navbar navbar-expand-lg navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        <img
          src={logo}
          width='80'
          height='80'
          className='d-inline-block align-top'
          alt=''
        />
      </Link>
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

      {/* Conditional goes here */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </div>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
