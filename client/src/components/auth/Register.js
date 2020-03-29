import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import Footer from '../layout/Footer';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password2: ''
  });

  const { firstname, lastname, email, password, password2 } = formData;

  //Pass form data to state
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //Form submission method
  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({ firstname, lastname, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/feed' />;
  }
  return (
    <Fragment>
      <div className='main-container'>
        <div className='container'>
          <div className='pt-5'>
            <h2>Register</h2>
            <p className='lead'>
              Already have an account? <Link to='/login'>Click Here!</Link>
            </p>
          </div>

          <div className='row'>
            <div className='col-md-12 order-md-1'>
              <form
                className='needs-validation'
                onSubmit={e => onSubmit(e)}
                noValidate
              >
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='firstname'>First name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='John'
                      name='firstname'
                      value={firstname}
                      onChange={e => onChange(e)}
                      required
                    />
                    <div className='invalid-feedback'>
                      Valid first name is required.
                    </div>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label htmlFor='lastname'>Last name</label>
                    <input
                      type='text'
                      className='form-control'
                      placeholder='Smith'
                      name='lastname'
                      value={lastname}
                      onChange={e => onChange(e)}
                      required
                    />
                    <div className='invalid-feedback'>
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    placeholder='you@example.com'
                    name='email'
                    value={email}
                    onChange={e => onChange(e)}
                    required
                  />
                  <div className='invalid-feedback'>
                    Please enter a valid email address.
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor='inputPassword'>Password</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Enter Password'
                    name='password'
                    minLength='8'
                    value={password}
                    onChange={e => onChange(e)}
                    required
                  />
                  <div className='invalid-feedback'>
                    Please enter valid password
                  </div>
                </div>

                <div className='mb-3'>
                  <label htmlFor='address2'>Confirm Password</label>
                  <input
                    type='password'
                    className='form-control'
                    placeholder='Confirm Password'
                    name='password2'
                    minLength='8'
                    value={password2}
                    onChange={e => onChange(e)}
                    required
                  />
                  <div className='invalid-feedback'>Passwords do not match</div>
                </div>

                <hr className='mb-4' />

                <button
                  className='btn btn-logo-color btn-lg btn-block'
                  type='submit'
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
