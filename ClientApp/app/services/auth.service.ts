import { AUTH0_CONFIG } from './../auth0-config/auth0-config';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';


@Injectable()
export class AuthService {

  profile: any;
  private roles: any[] = [];
  lock: any = new Auth0Lock(AUTH0_CONFIG.clientId, AUTH0_CONFIG.domain, AUTH0_CONFIG.options);

  constructor() {
    this.setRolesAndProfileFromLocalStorage();

    this.lock.on('authenticated', (authResult) =>
      this.onUserAthenticated(authResult)
    );
  }

  private onUserAthenticated(authResult: any) {
    console.log(authResult);
    localStorage.setItem('token', authResult.accessToken);
    this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
      if (error) throw error;

      console.log(profile);
      localStorage.setItem('profile', JSON.stringify(profile));
      this.setRolesAndProfileFromLocalStorage();
    });
  }

  private setRolesAndProfileFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      const jwtHelper = new JwtHelper();
      const decodedToken = jwtHelper.decodeToken(token);
      this.roles = decodedToken['https://SaleIt.com/roles'];
    }

    this.profile = JSON.parse(localStorage.getItem('profile')!);
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
    if (!this.roles) this.roles = [];
    return this.roles.indexOf(rollName) !== -1;
  }

  isModeratorOrAdmin() {
    return this.isInRole('admin') || this.isInRole('moderator');
  }

  getLoggedinUserName() {
    let nickName = this.profile && this.profile.name ? this.profile.name.split(' ')[0] : null;
    return nickName || (this.profile ? this.profile.email : null);
  }

  authenticated() {
    return tokenNotExpired('token');
  }
} 