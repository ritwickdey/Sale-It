import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  profile: any;
  private roles: any[] = [];
  lock = new Auth0Lock('OzaV1UwlCTaFjSZg9HtgWtanOWHj3ocD', 'ritwickdey.auth0.com', {
    auth: {
      redirectUrl: `${window.location.origin}/vehicles`,
      responseType: 'token',
      params: {
        audience: 'https://saleIt.com',
        scope: 'openid email profile'
      }
    },
    theme: {
      primaryColor: '#3899D8',
      logo: '/img/icon.png'
    },
    additionalSignUpFields: [
      {
        name: 'name',
        placeholder: 'Full Name',
        icon: '/img/details-icon.svg',
        validator: function (name) {
          return {
            valid: new RegExp(/^[a-z,.'-]+\s[a-z, .'-]+$/i).test(name),
            hint: "Enter a valid Full Name"
          };
        }
      }
    ],
    autoclose: true,
    autofocus: true,
    languageDictionary: {
      title: 'Log me in'
    }
  });

  constructor() {
    this.profile = JSON.parse(localStorage.getItem('profile')!);

    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelper();
      const decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://SaleIt.com/roles'];
    }

    this.lock.on('authenticated', (authResult) => {
      console.log(authResult);
      localStorage.setItem('token', authResult.accessToken);

      const jwtHelper = new JwtHelper();
      const decodedToken = jwtHelper.decodeToken(authResult.accessToken);
      this.roles = decodedToken['https://SaleIt.com/roles'];

      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) throw error;

        console.log(profile);
        localStorage.setItem('profile', JSON.stringify(profile));
        this.profile = profile;
      });
    });
  }

  login() {
    this.lock.show();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('profile');
    this.roles = [];
    this.profile = null;
  }

  isInRole(rollName) {
    if(!this.roles) this.roles = [];
    return this.roles.indexOf(rollName) !== -1;
  }

  authenticated() {
    return tokenNotExpired('token');
  }
} 