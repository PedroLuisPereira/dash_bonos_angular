import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

   //si esta autenticado y no se recarga la pagina
    if (this.authService.getAuth() == true) {
      return true;
    }

    if (this.authService.getAuth() == false && localStorage.getItem("access_token") != null) {
      return true;
    }

    if (localStorage.getItem("access_token") == null) {
      this.router.navigate(['']);
    }

    return true;

  }

}
