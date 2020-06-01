import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import axios from 'axios';

// Actions
import { deleteComment } from '../../actions/post';
import { getProfileById } from '../../actions/profile';
// Components
import { Image, Transformation } from 'cloudinary-react';
import { XCircle } from 'react-feather';
import avi from '../assets/default-avatar.png';

const Comment = ({
  postId,
  comment: { _id, text, firstname, lastname, user, date },
  auth,
  deleteComment,
  profile: { loading, profile },
}) => {
  const [userProfile, setUserProfile] = useState('');

  useEffect(async () => {
    const res = await axios.get(`/api/profile/user/${user}`);
    setUserProfile(res.data);
    console.log(userProfile);
  }, []);

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
                  width='200'
                  crop='scale'
                >
                  <Transformation
                    width='250'
                    height='250'
                    gravity='faces'
                    crop='fill'
                  />
                </Image>
              ) : (
                <img src={avi} alt='avatar' className='avatar' />
              )}
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
              {!auth.loading && user === auth.user._id && (
                <button
                  type='button'
                  className='btn btn-outline-danger'
                  onClick={(e) => deleteComment(postId, _id)}
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

Comment.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(Comment);
