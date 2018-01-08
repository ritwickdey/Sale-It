import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(protected authService: AuthService) { }

    canActivate() {
        if (this.authService.authenticated())
            return true;

        this.authService.login();
        return false;
    }
}