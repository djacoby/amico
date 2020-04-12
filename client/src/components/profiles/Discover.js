import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles, getCurrentProfile } from '../../actions/profile';

// Components
import Spinner from '../layout/Spinner';
import { Helmet } from 'react-helmet';
import { ArrowLeft } from 'react-feather';
import ProfileItem from './ProfileItem';
import Footer from '../layout/Footer';

const Discover = ({
  getProfiles,
  getCurrentProfile,
  profile: { profiles, loading }
}) => {
  useEffect(() => {
    getProfiles();
    getCurrentProfile();
  }, [getProfiles]);

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <Helmet>
        <title>Amico · Discover</title>
      </Helmet>
      <div className='main-container mt-3'>
        <div className='container'>
          <div className='discover-header'>
            <Link className='mb-1' to='/feed'>
              <button className='btn btn-logo-color'>
                <ArrowLeft />
              </button>
            </Link>
          </div>
          <h3 className='display-4 font-logo-color text-center'>Discover</h3>
          <div className='row'>
            {profiles.length > 0 ? (
              profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4 className='text-center'>No profiles found... </h4>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

Discover.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  Discover
);
