import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { RefreshCw, Settings } from 'react-feather';
import avi from '../assets/default-avatar.png';
import Spinner from '../layout/Spinner';

const UserProfileCard = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className='col-lg-4 col-md-12 mb-3'>
      <div className='card profile-card'>
        <div className='card-body'>
          <Link className='feed-link' to='/profile'>
            <img src={avi} alt='avatar' className='avatar' />
            <h5 className='card-title'>
              {user && user.firstname} {user && user.lastname}
            </h5>
          </Link>

          <button
            type='button'
            className='btn btn-logo-color mt-1 mr-1'
            onClick={e => window.location.reload(true)}
          >
            <RefreshCw /> Refresh
          </button>

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

UserProfileCard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(UserProfileCard);