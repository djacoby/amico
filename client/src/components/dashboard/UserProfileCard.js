import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';

// Components
import { RefreshCw, Settings } from 'react-feather';
import avi from '../assets/default-avatar.png';
import Spinner from '../layout/Spinner';

const UserProfileCard = ({
  auth: { user, loading },
  getPosts,
  profile: { profile },
}) => {
  return (loading && user === null) || profile === null ? (
    <Spinner />
  ) : (
    <div className='col-lg-4 col-md-12 mb-3'>
      <div className='card profile-card'>
        <div className='card-body'>
          <Link className='feed-link' to={user && `/profile/${user._id}`}>
            <img
              src={profile.avatar ? profile.avatar : avi}
              alt='avatar'
              className='avatar'
            />
            <h5 className='card-title'>
              {user && user.firstname} {user && user.lastname}
            </h5>
          </Link>

          <button
            type='button'
            className='btn btn-logo-color mt-1 mr-1'
            onClick={() => getPosts()}
          >
            <RefreshCw /> Refresh
          </button>

          <Link to='/settings'>
            <button type='button' className='btn btn-secondary mt-1'>
              <Settings /> Settings
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

UserProfileCard.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getPosts })(UserProfileCard);
