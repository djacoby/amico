import React from 'react';
import { Link } from 'react-router-dom';
import { RefreshCw, Settings } from 'react-feather';
import avi from '../assets/default-avatar.png';

const UserProfileCard = () => {
  return (
    <div className='col-lg-4 col-md-12 mb-3'>
      <div className='card profile-card'>
        <div className='card-body'>
          <Link className='feed-link' to='/profile'>
            <img src={avi} alt='avatar' className='avatar' />
            <h5 className='card-title'>John Smith</h5>
          </Link>
          <a href='#'>
            <button type='button' className='btn btn-logo-color mt-1 mr-1'>
              <RefreshCw /> Refresh
            </button>
          </a>
          <a href='#'>
            <button type='button' className='btn btn-secondary mt-1'>
              <Settings /> Settings
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
