import React, { Fragment } from 'react';

export const Footer = () => {
  return (
    <Fragment>
      <footer className='text-muted'>
        <div className='container'>
          <p className='float-right'>
            <a href='#'>Back to top</a>
          </p>
          <p className='mb-2'>&copy; 2020 amico</p>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
