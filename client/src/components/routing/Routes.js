import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from '../routing/PrivateRoute';
import Alert from '../layout/Alert';
// Auth components
import Login from '../auth/Login';
import Register from '../auth/Register';

// Dashboard components
import ProfileSettings from '../dashboard/ProfileSettings';
import Feed from '../dashboard/Feed';

// Profile components
import Discover from '../profiles/Discover';
import Profile from '../profiles/Profile';

// Post components
import Post from '../posts/Post';
const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/discover' component={Discover} />
        <Route exact path='/profile/:id' component={Profile} />
        {/* Private Routes */}
        <PrivateRoute exact path='/post/:id' component={Post} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/settings' component={ProfileSettings} />
        <PrivateRoute exact path='/feed' component={Feed} />
      </Switch>
    </section>
  );
};

export default Routes;
