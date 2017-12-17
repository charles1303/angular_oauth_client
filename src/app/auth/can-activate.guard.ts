import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class CanActivateGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthenticationService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.authService.isLoggedIn()) {
        return true;
    }

    // not logged in so redirect to home page with the return url and return false
    this.router.navigate(['home']);
    return false;
  }
}
