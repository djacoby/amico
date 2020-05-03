import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { getCurrentProfile, getProfiles } from '../../actions/profile';
// Components
import { Helmet } from 'react-helmet';
import UserProfileCard from './UserProfileCard';
import PostForm from './PostForm';
import Footer from '../layout/Footer';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const Feed = ({
  getProfiles,
  getCurrentProfile,
  getPosts,
  post: { posts, loading },
}) => {
  //Same as component did mount
  useEffect(() => {
    getCurrentProfile();
    getProfiles();
    getPosts();
  }, [getPosts, getCurrentProfile, getProfiles]);

  return (
    <Fragment>
      <Helmet>
        <title>Amico · Feed</title>
      </Helmet>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='row'>
            <UserProfileCard />
            <PostForm />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            posts.map((post) => <PostItem key={post._id} post={post} />)
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Feed.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
  profiles: state.profile,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  getPosts,
  getProfiles,
})(Feed);
