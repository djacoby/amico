import React from 'react';
import { User, UserPlus } from 'react-feather';
import avi from '../assets/default-avatar.png';

const ProfileItem = () => {
  return (
    <div className='col-lg-4 mb-3'>
      <div className='card mt-1 mb-3 post text-center'>
        <div className='card-body'>
          <a className='feed-link' href='profile.html'>
            <img src={avi} alt='avatar' className='profile-avatar' />
            <h5 className='card-title mt-2'>John Smith</h5>
          </a>

          <p className='card-text'>Developer at Microsoft</p>
          <p className='card-text'>Age: 30</p>
          <p className='card-text'>New York, NY</p>
          <div>
            <a href='#'>
              <button type='button' className='btn btn-logo-color mt-1 mr-1'>
                <User /> View Profile
              </button>
            </a>
            <a href='#'>
              <button type='button' className='btn btn-secondary mt-1'>
                <UserPlus /> Add Friend
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileItem;
