import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { List, LogIn } from 'react-feather';
import Footer from './Footer';

const Landing = () => {
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

export default Landing;
