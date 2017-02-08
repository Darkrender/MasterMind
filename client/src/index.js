import React from 'react';
import { render } from 'react-dom';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import AuthService from './helpers/AuthService';
import GameScramble from './components/GameScramble';
import App from './components/App';
import SignUp from './components/SignUp';
import Homepage from './components/Homepage';
import GameMemory from './components/GameMemory';
import { Leaderboard } from './components/Leaderboard';
import { Profile } from './components/Profile';

const app = document.getElementById('app');
const auth = new AuthService('xkMUjA7Bggf2NQ4W0uZlU4wv1pqd6aDD', 'buzzme.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    console.log('Nope!')
    replace({ pathname: '/' })
  }
}

const profile = auth.getProfile();
console.log('profile in index', profile)

render(
    <Router history={hashHistory}>
      <Route path="/" component = { App } auth={ auth } profile={ profile }>
        <IndexRoute component={ Homepage }></IndexRoute>
        <Route path="memorygame" component={ GameMemory }/>
        <Route path="leaderboard" component={ Leaderboard }/>
        <Route path="profile" component={ Profile }/>
        <Route path="scramblegame" component={ GameScramble }/>
        <Route path="signup" component={ SignUp }/>
      </Route>
    </Router>
  , app
);
