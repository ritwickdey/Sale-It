import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  
  lock = new Auth0Lock('OzaV1UwlCTaFjSZg9HtgWtanOWHj3ocD', 'ritwickdey.auth0.com', {
    auth: {
      redirectUrl: `http://localhost:5000/vehicles`,
      responseType: 'token'
    },
    theme: {
      primaryColor: '#3899D8',
      logo: '/img/icon.png'
    },  
    autoclose: true,
    autofocus: true,
    params: {
      scope: 'openid'
    },
    languageDictionary: {
      title: 'Log me in'
    }
  });

  constructor() {
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
      localStorage.setItem('token', authResult.idToken);
    });
  }

  public login() {
    this.lock.show();
  }

  public logout() {
    localStorage.removeItem('token');
  }

  authenticated() {
    return tokenNotExpired('token');
  }
} 