import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPosts } from '../../actions/post';
import { getCurrentProfile } from '../../actions/profile';
// Components
import UserProfileCard from './UserProfileCard';
import PostForm from './PostForm';
import Footer from '../layout/Footer';
import PostItem from '../posts/PostItem';
import Spinner from '../layout/Spinner';

const Feed = ({ getCurrentProfile, getPosts, post: { posts, loading } }) => {
  //Same as component did mount
  useEffect(() => {
    getPosts();
    getCurrentProfile();
  }, [getPosts, getCurrentProfile]);
  return (
    <Fragment>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='row'>
            <UserProfileCard />
            <PostForm />
          </div>
          {loading ? (
            <Spinner />
          ) : (
            posts.map(post => <PostItem key={post._id} post={post} />)
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Feed.propTypes = {
  getPosts: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPosts, getCurrentProfile })(Feed);
