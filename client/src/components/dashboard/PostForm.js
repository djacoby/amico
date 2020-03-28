import React from 'react';

const PostForm = () => {
  return (
    <div className='col-lg-8 col-md-12 mb-3'>
      <div className='card profile-card'>
        <form className='mt-4' action=''>
          <div className='form-group'>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='5'
              placeholder='What are your thoughts?'
            ></textarea>
            <a className='feed-link text-white' href='#'>
              <button
                type='button'
                className='btn btn-logo-color mt-3 post-form-button'
              >
                Post
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostForm;
