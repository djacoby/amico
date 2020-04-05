import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';

const PostCommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');
  return (
    <div className='col-md-12 mt-3'>
      <div className='card profile-card'>
        <form
          className='mt-4'
          onSubmit={e => {
            e.preventDefault();
            addComment(postId, { text });
            setText('');
          }}
        >
          <div className='form-group'>
            <textarea
              className='form-control'
              rows='5'
              placeholder='Leave a Comment!'
              value={text}
              onChange={e => setText(e.target.value)}
            ></textarea>
            <input
              type='submit'
              value='Comment'
              className='btn btn-logo-color mt-3 post-form-button'
            />
          </div>
        </form>
      </div>
    </div>
  );
};

PostCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(PostCommentForm);
