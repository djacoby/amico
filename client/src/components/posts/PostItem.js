import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { Image } from 'cloudinary-react';

// Actions
import { addLike, removeLike, deletePost } from '../../actions/post';

// Assets
import { ThumbsUp, ThumbsDown, MessageSquare, XCircle } from 'react-feather';
import avi from '../assets/default-avatar.png';
import Spinner from '../layout/Spinner';

const PostItem = ({
  auth,
  post: { _id, text, firstname, lastname, likes, comments, date, user },
  addLike,
  removeLike,
  deletePost,
  feedPost,
  history,
  profile: { loading, profiles },
}) => {
  const [userProfile, setUserProfile] = useState('');

  useEffect(() => {
    if (profiles.length) {
      const profile = profiles.find((profile) => profile.user._id === user);
      setUserProfile(profile);
    }
  }, [userProfile, profiles, user]);

  const handleDelete = (id) => {
    deletePost(id);
    if (!feedPost) {
      history.goBack();
    }
  };
  return loading ? (
    <Fragment></Fragment>
  ) : (
    <div className='card mt-1 post'>
      <div className='card-body'>
        <div className='row'>
          <div className='col-lg-2'>
            <Link className='feed-link' to={`/profile/${user}`}>
              {userProfile.avatar ? (
                <Image
                  cloudName='dntv3gc6l'
                  className='avatar'
                  publicId={userProfile.avatar}
                />
              ) : (
                <img src={avi} alt='avatar' className='avatar' />
              )}
              <h5 className='post-title mt-2'>
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
                onClick={(e) => {
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
                onClick={(e) => removeLike(_id)}
              >
                <ThumbsDown />
              </button>

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
  feedPost: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  deletePost,
})(PostItem);
