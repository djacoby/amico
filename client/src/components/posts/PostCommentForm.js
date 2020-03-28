import React from 'react';

const PostCommentForm = () => {
  return (
    <div className='col-md-12 mt-3'>
      <div className='card profile-card'>
        <form className='mt-4' action=''>
          <div className='form-group'>
            <textarea
              className='form-control'
              id='exampleFormControlTextarea1'
              rows='5'
              placeholder='Leave a Comment!'
            ></textarea>
            <a href='#'>
              <button
                type='button'
                className='btn btn-logo-color mt-3 post-form-button'
              >
                Comment
              </button>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostCommentForm;
