import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AdminAuthGuardService extends AuthGuardService {

    constructor(authService: AuthService) {
        super(authService);
    }

    canActivate() {
        var isAuthenticated = super.canActivate();
        return isAuthenticated ? this.authService.isInRole('admin') : false;
    }
}