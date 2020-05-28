import React, { Fragment, useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  updateProfile,
  getCurrentProfile,
  addImage,
  deleteAccount,
} from '../../actions/profile';

// Components
import { Helmet } from 'react-helmet';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';
import DatePicker from 'react-datepicker';
import { XCircle } from 'react-feather';

import 'react-datepicker/dist/react-datepicker.css';

const ProfileSettings = ({
  profile: { profile, loading },
  updateProfile,
  getCurrentProfile,
  deleteAccount,
  history,
  addImage,
}) => {
  const [formData, setFormData] = useState({
    bio: '',
    city: '',
    state: '',
    country: '',
  });

  const [birthDate, setBirthDate] = useState(new Date());

  useEffect(() => {
    getCurrentProfile();
    // Check to see if there is current profile data and if so populate fields with current data
    if (profile !== null) {
      setFormData({
        bio: loading || !profile.bio ? '' : profile.bio,
        city: loading || !profile.city ? '' : profile.city,
        state: loading || !profile.state ? '' : profile.state,
        country: loading || !profile.country ? '' : profile.country,
      });
      setBirthDate(loading || !profile.birthday ? '' : profile.birthday);
    }
  }, [getCurrentProfile]);

  const { bio, city, state, country } = formData;

  //On change method
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeImage = (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('image', files[0]);
    addImage(data);
  };

  //On submit method
  const onSubmit = (e) => {
    e.preventDefault();
    // if (profile === null) {
    const profileObject = {
      bio: bio,
      city: city,
      state: state,
      country: country,
      birthday: birthDate,
    };
    updateProfile(profileObject, history, false);
    // } else {
    //   const profileObject = {
    //     bio: bio,
    //     city: city,
    //     state: state,
    //     country: country,
    //   };
    //   updateProfile(profileObject, history, true);
    // }
  };

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Helmet>
        {profile === null ? (
          <title>Amico · Create Profile</title>
        ) : (
          <title>Amico · Settings</title>
        )}
      </Helmet>
      <div className='main-container'>
        <div className='container'>
          <div className='pt-5'>
            {profile === null ? <h2>Create Profile</h2> : <h2>Settings</h2>}

            <form
              className='needs-validation'
              encType='multipart/formdata'
              noValidate
              onSubmit={(e) => onSubmit(e)}
            >
              <div className='form-group pt-3'>
                <label htmlFor='exampleFormControlTextarea1'>Bio</label>
                <textarea
                  value={bio}
                  name='bio'
                  onChange={(e) => onChange(e)}
                  className='form-control'
                  rows='3'
                ></textarea>
              </div>

              <div className='row '>
                <div className='col-md-4'>
                  <label htmlFor='city'>City</label>
                  <input
                    type='text'
                    className='form-control'
                    value={city}
                    name='city'
                    onChange={(e) => onChange(e)}
                    required
                  />
                  <div className='invalid-feedback'>City is required</div>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='state'>State</label>
                  <select
                    className='custom-select d-block w-100'
                    value={state}
                    name='state'
                    onChange={(e) => onChange(e)}
                    required
                  >
                    <option value=''>Choose...</option>
                    <option value='AL'>AL</option>
                    <option value='AK'>AK</option>
                    <option value='AZ'>AZ</option>
                    <option value='AR'>AR</option>
                    <option value='CA'>CA</option>
                    <option value='CO'>CO</option>
                    <option value='CT'>CT</option>
                    <option value='DC'>DC</option>
                    <option value='DE'>DE</option>
                    <option value='FL'>FL</option>
                    <option value='GA'>GA</option>
                    <option value='HI'>HI</option>
                    <option value='ID'>ID</option>
                    <option value='IL'>IL</option>
                    <option value='IN'>IN</option>
                    <option value='IA'>IA</option>
                    <option value='KS'>KS</option>
                    <option value='KY'>KY</option>
                    <option value='LA'>LA</option>
                    <option value='ME'>ME</option>
                    <option value='MD'>MD</option>
                    <option value='MA'>MA</option>
                    <option value='MI'>MI</option>
                    <option value='MN'>MN</option>
                    <option value='MS'>MS</option>
                    <option value='MO'>MO</option>
                    <option value='MT'>MT</option>
                    <option value='NE'>NE</option>
                    <option value='NV'>NV</option>
                    <option value='NH'>NH</option>
                    <option value='NJ'>NJ</option>
                    <option value='NM'>NM</option>
                    <option value='NY'>NY</option>
                    <option value='NC'>NC</option>
                    <option value='ND'>ND</option>
                    <option value='OH'>OH</option>
                    <option value='OK'>OK</option>
                    <option value='OR'>OR</option>
                    <option value='PA'>PA</option>
                    <option value='RI'>RI</option>
                    <option value='SC'>SC</option>
                    <option value='SD'>SD</option>
                    <option value='TN'>TN</option>
                    <option value='TX'>TX</option>
                    <option value='UT'>UT</option>
                    <option value='VT'>VT</option>
                    <option value='VA'>VA</option>
                    <option value='WA'>WA</option>
                    <option value='WV'>WV</option>
                    <option value='WI'>WI</option>
                    <option value='WY'>WY</option>
                  </select>
                  <div className='invalid-feedback'>
                    Please provide a valid state.
                  </div>
                </div>
                <div className='col-md-4 mb-3'>
                  <label htmlFor='country'>Country</label>
                  <select
                    className='custom-select d-block w-100'
                    id='country'
                    value={country}
                    name='country'
                    onChange={(e) => onChange(e)}
                    required
                  >
                    <option value='US'>United States</option>
                  </select>
                  <div className='invalid-feedback'>
                    Please select a valid country.
                  </div>
                </div>
              </div>

              {profile === null && (
                <Fragment>
                  <div className='row'>
                    <label className='ml-3' htmlFor='state'>
                      Birthday:
                    </label>
                  </div>

                  <div className='row'>
                    <div className='col-md-4 mb-3'>
                      <DatePicker
                        selected={birthDate}
                        onChange={(date) => setBirthDate(date)}
                      />
                    </div>
                  </div>
                  <div className='row'>
                    <label>
                      <p className='text-muted ml-3'>
                        *Please select or type date of birth in format of
                        Month/Day/Year.
                      </p>
                    </label>
                  </div>
                </Fragment>
              )}

              <hr className='mb-4' />
              <div className='form-group'>
                <label htmlFor='img'>Upload Profile Avatar</label>
                <input
                  type='file'
                  className='form-control-file'
                  id='img'
                  name='file'
                  onChange={onChangeImage}
                />
              </div>

              <hr className='mb-4' />

              <button
                className='btn btn-logo-color btn-lg btn-block'
                type='submit'
              >
                Save
              </button>
            </form>
            {profile !== null && (
              <div>
                <hr />
                <h3>Danger Zone</h3>
                <p className='text-muted'>
                  *WARNING! This action cannot be undone!
                </p>
                <button
                  className='btn btn-danger btn-lg mt-2'
                  onClick={() => deleteAccount()}
                >
                  <XCircle /> Delete Account
                </button>
                <hr />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

ProfileSettings.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  addImage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, {
  updateProfile,
  getCurrentProfile,
  addImage,
  deleteAccount,
})(withRouter(ProfileSettings));
