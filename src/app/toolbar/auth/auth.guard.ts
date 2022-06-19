import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode, { JwtPayload } from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const token = localStorage.getItem(`AccessToken`);
    if (!token) {
      this.router.navigate(['/']);
      return false;
    }

    const decoded: JwtPayload = jwt_decode(token);

    const tokenExpiration = decoded.exp;

    const now = Math.round(Date.now() / 1000);

    if (tokenExpiration! > now) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }



  }


}
