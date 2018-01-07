import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { AuthGuardService } from './auth-guard.service';

@Injectable()
export class AdminAuthGuardService implements CanActivate  {

    constructor(
        private authService: AuthService, 
        private router: Router) {}

    canActivate() {
        if (this.authService.isInRole('admin'))
            return true;
        this.router.navigateByUrl('/'); 
        return false;
    }
}