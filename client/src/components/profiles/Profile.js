import React from 'react';
import PostItem from '../posts/PostItem';
import avi from '../assets/default-avatar.png';

const Profile = () => {
  return (
    <div className='main-container mt-3'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-12 mb-3 text-white'>
            <div className='card profile-card bg-logo-color'>
              <div className='card-body'>
                <img src={avi} alt='avatar' className='profile-avatar' />
                <h2 className='card-title display-4 text-white mb-2 profile-name'>
                  John Smith
                </h2>
                <div className='profile-headings'>
                  <h3 className='mb-3'>
                    <i data-feather='map-pin'></i> New York, NY
                  </h3>
                  <h4>30 years old</h4>
                </div>
                <p className='profile-bio'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
                  ratione numquam reiciendis rerum at amet quo, perferendis
                  vitae distinctio non, reprehenderit facilis dolores repellat
                  sunt fuga, natus labore saepe aperiam!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Posts go here */}
        <PostItem />
      </div>
    </div>
  );
};

export default Profile;
