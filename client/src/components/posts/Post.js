import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// Components
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostCommentForm from './PostCommentForm';
import Comment from './Comment';

// Assets
import { ArrowLeft } from 'react-feather';

const Post = ({ post: { posts, loading }, match, history }) => {
  return loading ? (
    <Spinner />
  ) : (
    <div className='main-container mt-3'>
      <div className='container'>
        <div className='row'>
          {/* TODO ADD BROWSER HISTORY FUNCTIONALITY TO ALLOW USER TO GO BACK TO PROFILE OR FEED */}

          <button
            className='btn btn-logo-color'
            onClick={() => history.goBack()}
          >
            <ArrowLeft />
          </button>

          <PostItem
            post={posts.find(post => post._id === match.params.id)}
            history={history}
            feedPost={false}
          />
          <PostCommentForm />
        </div>
        <Comment />
      </div>
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, {})(Post);
