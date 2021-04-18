import { Injectable } from '@angular/core';
import {
  CanLoad,
  Route,
  UrlSegment, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate
} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad, CanActivateChild, CanActivate {

  constructor() { }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    return true; // TODO
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true; // TODO
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return true; // TODO
  }

}
