import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired } from 'angular2-jwt';


@Injectable()
export class AuthService {
  constructor() { 
    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
      localStorage.setItem('token', authResult.idToken);
    });
  }

  lock = new Auth0Lock('OzaV1UwlCTaFjSZg9HtgWtanOWHj3ocD', 'ritwickdey.auth0.com', {});

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('token');
  }

  authenticated() {
    return tokenNotExpired('token');
  }
} 