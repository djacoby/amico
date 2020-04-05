import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';

// Assets
import { ThumbsUp, ThumbsDown, MessageSquare, XCircle } from 'react-feather';
import avi from '../assets/default-avatar.png';

const PostItem = ({
  auth,
  post: { _id, text, firstname, lastname, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  feedPost,
  history
}) => {
  const handleDelete = id => {
    deletePost(id);
    if (!feedPost) {
      history.goBack();
    }
  };
  return (
    <div className='card mt-1 post'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-lg-2'>
            <Link className='feed-link' to={`/profile/${user}`}>
              <img src={avi} alt='avatar' className='avatar' />
              <h5 className='card-title mt-2'>
                {firstname} {lastname}
              </h5>
            </Link>
          </div>
          <div className='col-lg-10'>
            <p className='card-text'>{text}</p>
            <p className='text-muted post-date'>
              <Moment format='LLL'>{date}</Moment>
            </p>

            <div className='post-buttons'>
              <button
                type='button'
                className='btn btn-outline-primary mr-1'
                onClick={e => {
                  addLike(_id);
                }}
              >
                <ThumbsUp />
                <span className='badge badge-light'>
                  {likes.length > 0 && <span>{likes.length}</span>}
                </span>
              </button>
              <button
                type='button'
                className='btn btn-outline-danger mr-1'
                onClick={e => removeLike(_id)}
              >
                <ThumbsDown />
              </button>
              {/* TODO ADD CONDITIONAL RENDERING TO REMOVE WHEN POST IS OPEN */}
              {feedPost && (
                <Fragment>
                  <Link to={`/post/${_id}`}>
                    <button type='button' className='btn btn-outline-info mr-1'>
                      <MessageSquare />
                      <span className='badge badge-light'>
                        {comments.length > 0 && (
                          <span className='comment-count'>
                            {comments.length}
                          </span>
                        )}
                      </span>
                    </button>
                  </Link>
                </Fragment>
              )}

              {!auth.loading && user === auth.user._id && (
                <button
                  type='button'
                  className='btn btn-outline-danger mr-1'
                  onClick={() => handleDelete(_id)}
                >
                  <XCircle />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  feedPost: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
