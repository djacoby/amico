import React, { useState, useEffect, Fragment } from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUserPosts } from '../../actions/post';
import Moment from 'react-moment';
import axios from 'axios';

import avi from '../assets/default-avatar.png';

// Components
import { Helmet } from 'react-helmet';
import { Image, Transformation } from 'cloudinary-react';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';
import { ArrowLeft } from 'react-feather';

const Profile = ({
  getUserPosts,
  profile: { profile, loading },
  post: { posts },
  match,
  history,
}) => {
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    async function fetchData() {
      const res = await axios.get(`/api/profile/user/${match.params.id}`);
      setUserProfile(res.data);
    }
    fetchData();
    getUserPosts(match.params.id);
  }, [setUserProfile, match.params.id]);

  if (profile === null && !loading) {
    return <Redirect to='/settings' />;
  }

  return userProfile === '' ? (
    <Spinner />
  ) : (
    <Fragment>
      <Helmet>
        {userProfile.user.firstname === undefined ? (
          <title>Amico</title>
        ) : (
          <title>
            {`Amico · ${userProfile.user.firstname} ${userProfile.user.lastname}`}
          </title>
        )}
      </Helmet>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12 mb-3 text-white'>
              <button
                className='btn btn-logo-color'
                onClick={() => history.goBack()}
              >
                <ArrowLeft />
              </button>
              <div className='card profile-card bg-logo-color mt-1'>
                <div className='card-body'>
                  {userProfile.avatar ? (
                    <Image
                      cloudName='dntv3gc6l'
                      className='profile-avatar'
                      publicId={userProfile.avatar}
                    >
                      <Transformation
                        width='250'
                        height='250'
                        gravity='faces'
                        crop='fill'
                      />
                    </Image>
                  ) : (
                    <img src={avi} alt='avatar' className='profile-avatar' />
                  )}

                  {/* END NEW */}
                  <h2 className='display-4 text-white mb-2 profile-name'>
                    {userProfile.user.firstname} {userProfile.user.lastname}
                  </h2>
                  <div className='profile-headings'>
                    <h3 className='mb-3'>
                      <i data-feather='map-pin'></i>
                      {userProfile.city}, {userProfile.state}
                    </h3>
                    <h4>
                      <Moment fromNow ago>
                        {userProfile.birthday}
                      </Moment>{' '}
                      old
                    </h4>
                  </div>
                  <p className='profile-bio'>{userProfile.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* User Posts go here */}
        <div className='mt-5 container'>
          {posts !== null &&
            posts.map((post) => <PostItem key={post._id} post={post} />)}
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  getUserPosts: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getUserPosts })(Profile);
