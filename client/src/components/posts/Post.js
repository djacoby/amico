import React, { useEffect, useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPost } from '../../actions/post';
// Components
import { Helmet } from 'react-helmet';
import Spinner from '../layout/Spinner';
import PostItem from './PostItem';
import PostCommentForm from './PostCommentForm';
import Comment from './Comment';

// Assets
import { ArrowLeft } from 'react-feather';

const Post = ({ getPost, post: { post, posts, loading }, match, history }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  const userPost = posts.filter(post => post._id === match.params.id);

  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Helmet>
        <title>Amico</title>
      </Helmet>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='row'>
            <button
              className='btn btn-logo-color'
              onClick={() => history.goBack()}
            >
              <ArrowLeft />
            </button>

            <PostItem post={userPost[0]} history={history} feedPost={false} />
            <PostCommentForm postId={post._id} />
          </div>
          {post.comments.map(comment => (
            <Comment key={comment._id} postId={post._id} comment={comment} />
          ))}
        </div>
      </div>
    </Fragment>
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
