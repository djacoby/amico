import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../layout/Footer';

const Register = () => {
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
              <form className='needs-validation' novalidate>
                <div className='row'>
                  <div className='col-md-6 mb-3'>
                    <label for='firstName'>First name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='firstName'
                      placeholder='John'
                      value=''
                      required
                    />
                    <div className='invalid-feedback'>
                      Valid first name is required.
                    </div>
                  </div>
                  <div className='col-md-6 mb-3'>
                    <label for='lastName'>Last name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='lastName'
                      placeholder='Smith'
                      value=''
                      required
                    />
                    <div className='invalid-feedback'>
                      Valid last name is required.
                    </div>
                  </div>
                </div>

                <div className='mb-3'>
                  <label for='email'>Email</label>
                  <input
                    type='email'
                    className='form-control'
                    id='email'
                    placeholder='you@example.com'
                    required
                  />
                  <div className='invalid-feedback'>
                    Please enter a valid email address for shipping updates.
                  </div>
                </div>

                <div className='mb-3'>
                  <label for='inputPassword'>Password</label>
                  <input
                    type='password'
                    id='inputPassword'
                    className='form-control'
                    placeholder='Enter Password'
                    required
                  />
                  <div className='invalid-feedback'>
                    Please enter valid password
                  </div>
                </div>

                <div className='mb-3'>
                  <label for='address2'>Confirm Password</label>
                  <input
                    type='password'
                    id='inputPassword'
                    className='form-control'
                    placeholder='Confirm Password'
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

export default Register;
