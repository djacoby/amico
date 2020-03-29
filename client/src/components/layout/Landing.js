import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List, LogIn } from 'react-feather';
import Footer from './Footer';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/feed' />;
  }
  return (
    <Fragment>
      <div className='jumbotron jumbotron-fluid'>
        <div className='container'>
          <h1 className='display-4'>Reach New Heights</h1>
          <p className='lead'>
            Find and connect with friends all around the world...
          </p>
          <div className='button-container'>
            <Link to='/register'>
              <button type='button' className='btn btn-logo-color'>
                <List /> Register
              </button>
            </Link>
            <Link to='/login'>
              <button type='button' className='btn btn-secondary ml-1'>
                <LogIn /> Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);
