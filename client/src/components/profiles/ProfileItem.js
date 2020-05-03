import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import { User } from 'react-feather';
import { Image } from 'cloudinary-react';
import avi from '../assets/default-avatar.png';

const ProfileItem = ({
  profile: {
    user: { _id, firstname, lastname },
    birthday,
    city,
    state,
    avatar,
  },
}) => {
  return (
    <div className='col-lg-4 mb-3'>
      <div className='card mt-1 mb-3 post text-center'>
        <div className='card-body'>
          <Link className='feed-link' to={`/profile/${_id}`}>
            {avatar ? (
              <Image
                cloudName='dntv3gc6l'
                className='profile-avatar'
                publicId={avatar}
              />
            ) : (
              <img src={avi} alt='avatar' className='profile-avatar' />
            )}
            <h5 className='card-title mt-2'>
              {firstname} {lastname}
            </h5>
          </Link>

          <p className='card-text'>
            <Moment fromNow ago>
              {birthday}
            </Moment>{' '}
            old
          </p>
          <p className='card-text'>
            {city}, {state}
          </p>
          <div>
            <Link to={`/profile/${_id}`}>
              <button type='button' className='btn btn-logo-color mt-1 mr-1'>
                <User /> View Profile
              </button>
            </Link>
            {/* <a href='#'>
              <button type='button' className='btn btn-secondary mt-1'>
                <UserPlus /> Add Friend
              </button>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
