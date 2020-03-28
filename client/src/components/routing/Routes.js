import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Auth components
import Login from '../auth/Login';
import Register from '../auth/Register';

// Dashboard components
import Settings from '../dashboard/Settings';
import Feed from '../dashboard/Feed';

// Profile components
import Discover from '../profiles/Discover';
import Profile from '../profiles/Profile';

// Post components
import Post from '../posts/Post';
const Routes = () => {
  return (
    <section className='container'>
      {/* TODO: Add Alert Component Here */}
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/discover' component={Discover} />
        <Route exact path='/post' component={Post} />
        <Route exact path='/profile' component={Profile} />
        {/* Add to private */}
        <Route exact path='/settings' component={Settings} />
        <Route exact path='/feed' component={Feed} />
      </Switch>
    </section>
  );
};

export default Routes;
