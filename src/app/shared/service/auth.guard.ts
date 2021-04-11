import { Injectable } from '@angular/core';
import {
  Router,
  CanLoad,
  Route,
  UrlSegment, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate
} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivateChild, CanActivate {

  constructor(private authService: AuthService,
              private router: Router) { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return this.checkAuthentication();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication();
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.checkAuthentication();
  }

  checkAuthentication(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
  }

}
