import React, { Fragment, useState, useEffect } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';

// Components
import { Helmet } from 'react-helmet';
import Footer from '../layout/Footer';
import Spinner from '../layout/Spinner';

const ProfileSettings = ({
  profile: { profile, loading },
  createProfile,
  getCurrentProfile,
  history
}) => {
  const [formData, setFormData] = useState({
    bio: '',
    city: '',
    state: '',
    country: '',
    month: '',
    day: '',
    year: ''
  });

  const [settingsChanged, updateSettingsChanged] = useState(false);

  useEffect(() => {
    getCurrentProfile();
    // Check to see if there is current profile data and if so populate fields with current data
    if (profile !== null) {
      setFormData({
        bio: loading || !profile.bio ? '' : profile.bio,
        city: loading || !profile.city ? '' : profile.city,
        state: loading || !profile.state ? '' : profile.state,
        country: loading || !profile.country ? '' : profile.country
      });
    }
  }, [getCurrentProfile]);

  const { bio, city, state, country, month, day, year } = formData;

  //On change method
  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  //On submit method
  const onSubmit = e => {
    e.preventDefault();
    if (profile === null) {
      const profileObject = {
        bio: bio,
        city: city,
        state: state,
        country: country,
        birthday: month + '/' + day + '/' + year
      };
      createProfile(profileObject, history, true);
    } else {
      const profileObject = {
        bio: bio,
        city: city,
        state: state,
        country: country
      };
      createProfile(profileObject, history, true);
    }

    // updateSettingsChanged(true);
  };

  // if (settingsChanged) {
  //   return <Redirect to='/feed' />;
  // }

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
              noValidate
              onSubmit={e => onSubmit(e)}
            >
              <div className='form-group pt-3'>
                <label htmlFor='exampleFormControlTextarea1'>Bio</label>
                <textarea
                  value={bio}
                  name='bio'
                  onChange={e => onChange(e)}
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
                    onChange={e => onChange(e)}
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
                    onChange={e => onChange(e)}
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
                    onChange={e => onChange(e)}
                    required
                  >
                    <option value='US'>United States</option>
                  </select>
                  <div className='invalid-feedback'>
                    Please select a valid country.
                  </div>
                </div>
              </div>

              {/* TODO add conditional rendering to not display if birthday is already entered */}
              {profile === null && (
                <Fragment>
                  <div className='row'>
                    <label className='ml-3' htmlFor='state'>
                      Birthday:
                    </label>
                  </div>

                  <div className='row'>
                    <div className='col-md-4 mb-3'>
                      <label htmlFor='month'>Month</label>
                      <select
                        className='custom-select d-block w-100'
                        id='month'
                        value={month}
                        name='month'
                        onChange={e => onChange(e)}
                        required
                      >
                        <option value=''>Choose...</option>
                        <option value='1'>January</option>
                        <option value='2'>February</option>
                        <option value='3'>March</option>
                        <option value='4'>April</option>
                        <option value='5'>May</option>
                        <option value='6'>June</option>
                        <option value='7'>July</option>
                        <option value='8'>August</option>
                        <option value='9'>September</option>
                        <option value='10'>October</option>
                        <option value='11'>November</option>
                        <option value='12'>December</option>
                      </select>
                      <div className='invalid-feedback'>
                        Please provide a valid month.
                      </div>
                    </div>
                    <div className='col-md-4 mb-3'>
                      <label htmlFor='day'>Day</label>
                      <select
                        className='custom-select d-block w-100'
                        id='day'
                        value={day}
                        name='day'
                        onChange={e => onChange(e)}
                        required
                      >
                        <option value=''>Choose...</option>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='8'>8</option>
                        <option value='9'>9</option>
                        <option value='10'>10</option>
                        <option value='11'>11</option>
                        <option value='12'>12</option>
                        <option value='13'>13</option>
                        <option value='14'>14</option>
                        <option value='15'>15</option>
                        <option value='16'>16</option>
                        <option value='17'>17</option>
                        <option value='18'>18</option>
                        <option value='19'>19</option>
                        <option value='20'>20</option>
                        <option value='21'>21</option>
                        <option value='22'>22</option>
                        <option value='23'>23</option>
                        <option value='24'>24</option>
                        <option value='25'>25</option>
                        <option value='26'>26</option>
                        <option value='27'>27</option>
                        <option value='28'>28</option>
                        <option value='29'>29</option>
                        <option value='30'>30</option>
                        <option value='31'>31</option>
                      </select>
                      <div className='invalid-feedback'>
                        Please provide a valid day.
                      </div>
                    </div>
                    <div className='col-md-4 mb-3'>
                      <label htmlFor='year'>Year</label>
                      <select
                        className='custom-select d-block w-100'
                        id='year'
                        value={year}
                        name='year'
                        onChange={e => onChange(e)}
                        required
                      >
                        <option value=''>Choose...</option>
                        <option value='2020'>2020</option>
                        <option value='2019'>2019</option>
                        <option value='2018'>2018</option>
                        <option value='2017'>2017</option>
                        <option value='2016'>2016</option>
                        <option value='2015'>2015</option>
                        <option value='2014'>2014</option>
                        <option value='2013'>2013</option>
                        <option value='2012'>2012</option>
                        <option value='2011'>2011</option>
                        <option value='2010'>2010</option>
                        <option value='2009'>2009</option>
                        <option value='2008'>2008</option>
                        <option value='2007'>2007</option>
                        <option value='2006'>2006</option>
                        <option value='2005'>2005</option>
                        <option value='2004'>2004</option>
                        <option value='2003'>2003</option>
                        <option value='2002'>2002</option>
                        <option value='2001'>2001</option>
                        <option value='2000'>2000</option>
                        <option value='1999'>1999</option>
                        <option value='1998'>1998</option>
                        <option value='1997'>1997</option>
                        <option value='1996'>1996</option>
                        <option value='1995'>1995</option>
                        <option value='1994'>1994</option>
                        <option value='1993'>1993</option>
                        <option value='1992'>1992</option>
                        <option value='1991'>1991</option>
                        <option value='1990'>1990</option>
                        <option value='1989'>1989</option>
                        <option value='1988'>1988</option>
                        <option value='1987'>1987</option>
                        <option value='1986'>1986</option>
                        <option value='1985'>1985</option>
                        <option value='1984'>1984</option>
                        <option value='1983'>1983</option>
                        <option value='1982'>1982</option>
                        <option value='1981'>1981</option>
                        <option value='1980'>1980</option>
                        <option value='1979'>1979</option>
                        <option value='1978'>1978</option>
                        <option value='1977'>1977</option>
                        <option value='1976'>1976</option>
                        <option value='1975'>1975</option>
                        <option value='1974'>1974</option>
                        <option value='1973'>1973</option>
                        <option value='1972'>1972</option>
                        <option value='1971'>1971</option>
                        <option value='1970'>1970</option>
                        <option value='1969'>1969</option>
                        <option value='1968'>1968</option>
                        <option value='1967'>1967</option>
                        <option value='1966'>1966</option>
                        <option value='1965'>1965</option>
                        <option value='1964'>1964</option>
                        <option value='1963'>1963</option>
                        <option value='1962'>1962</option>
                        <option value='1961'>1961</option>
                        <option value='1960'>1960</option>
                        <option value='1959'>1959</option>
                        <option value='1958'>1958</option>
                        <option value='1957'>1957</option>
                        <option value='1956'>1956</option>
                        <option value='1955'>1955</option>
                        <option value='1954'>1954</option>
                        <option value='1953'>1953</option>
                        <option value='1952'>1952</option>
                        <option value='1951'>1951</option>
                        <option value='1950'>1950</option>
                        <option value='1949'>1949</option>
                        <option value='1948'>1948</option>
                        <option value='1947'>1947</option>
                        <option value='1946'>1946</option>
                        <option value='1945'>1945</option>
                        <option value='1944'>1944</option>
                        <option value='1943'>1943</option>
                        <option value='1942'>1942</option>
                        <option value='1941'>1941</option>
                        <option value='1940'>1940</option>
                        <option value='1939'>1939</option>
                        <option value='1938'>1938</option>
                        <option value='1937'>1937</option>
                        <option value='1936'>1936</option>
                        <option value='1935'>1935</option>
                        <option value='1934'>1934</option>
                        <option value='1933'>1933</option>
                        <option value='1932'>1932</option>
                        <option value='1931'>1931</option>
                        <option value='1930'>1930</option>
                        <option value='1929'>1929</option>
                        <option value='1928'>1928</option>
                        <option value='1927'>1927</option>
                        <option value='1926'>1926</option>
                        <option value='1925'>1925</option>
                        <option value='1924'>1924</option>
                        <option value='1923'>1923</option>
                        <option value='1922'>1922</option>
                        <option value='1921'>1921</option>
                        <option value='1920'>1920</option>
                        <option value='1919'>1919</option>
                        <option value='1918'>1918</option>
                        <option value='1917'>1917</option>
                        <option value='1916'>1916</option>
                        <option value='1915'>1915</option>
                        <option value='1914'>1914</option>
                        <option value='1913'>1913</option>
                        <option value='1912'>1912</option>
                        <option value='1911'>1911</option>
                        <option value='1910'>1910</option>
                        <option value='1909'>1909</option>
                        <option value='1908'>1908</option>
                        <option value='1907'>1907</option>
                        <option value='1906'>1906</option>
                        <option value='1905'>1905</option>
                        <option value='1904'>1904</option>
                        <option value='1903'>1903</option>
                        <option value='1902'>1902</option>
                        <option value='1901'>1901</option>
                        <option value='1900'>1900</option>
                      </select>
                      <div className='invalid-feedback'>
                        Please select a valid year.
                      </div>
                    </div>
                  </div>
                </Fragment>
              )}

              <hr className='mb-4' />
              <div className='form-group'>
                <label htmlFor='img'>Upload Profile Avatar</label>
                <input type='file' className='form-control-file' id='img' />
              </div>

              <hr className='mb-4' />

              <button
                className='btn btn-logo-color btn-lg btn-block'
                type='submit'
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

ProfileSettings.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(ProfileSettings)
);
