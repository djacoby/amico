import React from 'react';
import PostCommentForm from './PostCommentForm';
import Comment from './Comment';
import { ArrowLeft, ThumbsUp, ThumbsDown, XCircle } from 'react-feather';
import avi from '../assets/default-avatar.png';

const Post = () => {
  return (
    <div className='main-container mt-3'>
      <div className='container'>
        <div className='row'>
          <a className='mb-1' href='feed.html'>
            <button className='btn btn-logo-color'>
              <ArrowLeft />
            </button>
          </a>
          <div className='card mt-1 post'>
            <div className='card-body'>
              <div className='row'>
                <div className='col-lg-2'>
                  <a className='feed-link' href='profile.html'>
                    <img src={avi} alt='avatar' className='avatar' />
                    <h5 className='card-title mt-2'>John Smith</h5>
                  </a>
                </div>
                <div className='col-lg-10'>
                  <p className='card-text'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Hic, qui nulla harum dicta vero blanditiis esse! Repellat
                    dolorem dolores, laudantium ex dolore voluptatibus amet quas
                    optio non quod illo officiis!
                  </p>
                  <p className='text-muted post-date'>1:30 PM · 3/23/2020</p>
                  <div className='post-buttons'>
                    <button
                      type='button'
                      className='btn btn-outline-primary mr-1'
                    >
                      <ThumbsUp />
                      <span className='badge badge-light'>4</span>
                    </button>
                    <button
                      type='button'
                      className='btn btn-outline-danger mr-1'
                    >
                      <ThumbsDown />
                    </button>
                    <button
                      type='button'
                      className='btn btn-outline-danger mr-1'
                    >
                      <XCircle />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comment form and comments go here */}
          <PostCommentForm />
        </div>
        <Comment />
      </div>
    </div>
  );
};
export default Post;
