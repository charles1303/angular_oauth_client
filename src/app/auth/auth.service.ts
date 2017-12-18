import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth-config';
import { Router } from '@angular/router';
import { LocalForageService } from 'ngx-localforage';

@Injectable()
export class AuthService {

  // Create Auth0 web auth instance
  auth0 = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    responseType: 'token id_token',
    redirectUri: AUTH_CONFIG.REDIRECT,
    audience: AUTH_CONFIG.AUDIENCE,
    scope: AUTH_CONFIG.SCOPE
  });
  userProfile: any;

  // Create a stream of logged in status to communicate throughout app
  loggedIn: boolean;
  loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);

  constructor(private router: Router, private localForage: LocalForageService) { 
    // If authenticated, set local profile property and update login status subject
    // If token is expired, log out to clear any data from localForage
    if (this.authenticated) {
      localForage.getItem('profile').subscribe(function(value) {
        this.userProfile = value;
    });
      this.setLoggedIn(true);
    } else {
      this.logout();
    }
  }

  get authenticated(): boolean {
    // Check if current date is greater than expiration
    let isExpires: boolean;
    this.localForage.getItem('expires_at').subscribe(function(value) {
      isExpires = Date.now() < value;

  });
    return isExpires;
  }

  setLoggedIn(value: boolean) {
    // Update login status subject
    this.loggedIn$.next(value);
    this.loggedIn = value;
  }

  logout() {
    // Remove tokens and profile and update login status subject
    this.localForage.removeItem('token');
    this.localForage.removeItem('id_token');
    this.localForage.removeItem('profile');
    this.localForage.removeItem('expires_at');
    this.userProfile = undefined;
    this.setLoggedIn(false);
  }

  login() {
    // Auth0 authorize request
    this.auth0.authorize();
  }

  handleAuth() {
    // When Auth0 hash parsed, get profile
    this.auth0.parseHash(window.location.hash, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        window.location.hash = '';
        this._getProfile(authResult);
      } else if (err) {
        console.error(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  private _getProfile(authResult) {
    // Use access token to retrieve user's profile and set session
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile) {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    this.localForage.setItem('token', authResult.accessToken);
    this.localForage.setItem('id_token', authResult.idToken);
    this.localForage.setItem('profile', JSON.stringify(profile));
    this.localForage.setItem('expires_at', JSON.stringify(expTime));
    this.userProfile = profile;
    this.setLoggedIn(true);
  }

}
