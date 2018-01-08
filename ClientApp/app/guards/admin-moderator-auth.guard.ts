import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminModeratorAuthGuard implements CanActivate  {

    constructor(
        private authService: AuthService, 
        private router: Router) {}

    canActivate() {
        if (this.authService.isInRole('admin') || this.authService.isInRole('moderator'))
            return true;
        this.router.navigateByUrl('/'); 
        return false;
    }
}