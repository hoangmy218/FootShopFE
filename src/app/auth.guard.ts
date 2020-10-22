import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public _authService: AuthService,
    
    private _router: Router){

    }
    canActivate(): boolean{
      if (this._authService.loggedIn() && this._authService.isAdmin() ){
        return true;
      } else if (this._authService.loggedIn() && !this._authService.isAdmin()  ){
        this._router.navigate([''])
        return true;
      } else {
        this._router.navigate([''])
        return false;
      }
    }
  
}