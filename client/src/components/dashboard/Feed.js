import React, { Fragment } from 'react';
import UserProfileCard from './UserProfileCard';
import PostForm from './PostForm';
import Footer from '../layout/Footer';
import PostItem from '../posts/PostItem';

const Feed = () => {
  return (
    <Fragment>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='row'>
            <UserProfileCard />
            <PostForm />
          </div>
          <PostItem />
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Feed;
