import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Helmet } from 'react-helmet';
// Assets
import logo from '../assets/amico-logo.png';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  //Pass form data to state
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //Form submission method
  const onSubmit = async e => {
    e.preventDefault();
    login(email, password);
  };

  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/feed' />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>Amico · Login</title>
      </Helmet>
      <div className='text-center login-container mt-3'>
        <form className='form-signin' onSubmit={e => onSubmit(e)}>
          <img className='mb-4' src={logo} alt='' width='150' height='150' />
          <h1 className='h3 mb-3 font-weight-normal'>Login</h1>
          <label htmlFor='inputEmail' className='sr-only'>
            Email address
          </label>
          <input
            type='email'
            id='inputEmail'
            name='email'
            className='form-control'
            placeholder='Email address'
            value={email}
            onChange={e => onChange(e)}
            required
            autoFocus
          />
          <label htmlFor='inputPassword' className='sr-only'>
            Password
          </label>
          <input
            type='password'
            id='inputPassword'
            name='password'
            className='form-control'
            placeholder='Password'
            value={password}
            onChange={e => onChange(e)}
            required
          />
          {/* <div className='checkbox mb-3'>
            <label>
              <input type='checkbox' value='remember-me' /> Remember me
            </label>
          </div> */}
          <button className='btn btn-lg btn-logo-color btn-block' type='submit'>
            Sign in
          </button>
          <p className='lead pt-3'>
            Need an account? <Link to='/register'>Click Here!</Link>
          </p>
          <p className='mt-5 mb-3 text-muted'>&copy; 2020 amico</p>
        </form>
      </div>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
