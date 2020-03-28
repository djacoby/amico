import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'react-feather';
import Footer from '../layout/Footer';

import ProfileItem from './ProfileItem';

const Discover = () => {
  return (
    <Fragment>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='discover-header'>
            <Link className='mb-1' to='/feed'>
              <button className='btn btn-logo-color'>
                <ArrowLeft />
              </button>
            </Link>
          </div>
          <h3 className='display-4 font-logo-color text-center'>Discover</h3>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Discover;
