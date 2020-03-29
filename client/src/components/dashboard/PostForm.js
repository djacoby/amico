import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');
  return (
    <div className='col-lg-8 col-md-12 mb-3'>
      <div className='card profile-card'>
        <form
          className='mt-4'
          onSubmit={e => {
            e.preventDefault();
            addPost({ text });
            setText('');
          }}
        >
          <div className='form-group'>
            <textarea
              className='form-control'
              name='text'
              rows='5'
              placeholder='What are your thoughts?'
              value={text}
              onChange={e => setText(e.target.value)}
              required
            ></textarea>
            <a className='feed-link text-white' href='#'>
              <button
                type='submit'
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(null, { addPost })(PostForm);
