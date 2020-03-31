import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';

// Components
import PostItem from './PostItem';
import PostCommentForm from './PostCommentForm';
import Comment from './Comment';

// Assets
import { ArrowLeft, ThumbsUp, ThumbsDown, XCircle } from 'react-feather';

const Post = ({ getPost, post: { post, loading }, match }) => {
  useEffect(() => {
    // get id from url in params for getPost function
    getPost(match.params.id);
  }, [getPost]);
  return loading || post === null ? (
    <Spinner />
  ) : (
    <div className='main-container mt-3'>
      <div className='container'>
        <div className='row'>
          {/* TODO ADD BROWSER HISTORY FUNCTIONALITY TO ALLOW USER TO GO BACK TO PROFILE OR FEED */}
          <Link className='mb-1' to='/feed'>
            <button className='btn btn-logo-color'>
              <ArrowLeft />
            </button>
          </Link>
          <PostItem key={post._id} post={post} />
          <PostCommentForm />
        </div>
        <Comment />
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(mapStateToProps, { getPost })(Post);
