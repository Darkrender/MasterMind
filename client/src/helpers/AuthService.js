import { EventEmitter } from 'events';
import Auth0Lock from 'auth0-lock';
import { browserHistory } from 'react-router';

export default class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain)

    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this))
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken)


    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      } else {
        var headers = new Headers({'Content-Type': 'application/json'});

        var {name, email} = profile;
        var data = {name, email}

        fetch("/api/user", {
          method: "POST",
          headers: headers,
          body: JSON.stringify(data)
        })
          .then(user=> {
            console.log('user posted', user);
          })
        this.setProfile(profile)
      }
    })

  }

  setProfile(profile) {
    localStorage.setItem('profile', JSON.stringify(profile))
    browserHistory.replace('/profile')
    this.emit('profile_updated', profile)
  }

  getProfile() {
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : null;
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    return !!this.getToken()
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    browserHistory.replace('/');
  }
}
