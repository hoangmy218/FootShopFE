import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from "@auth0/angular-jwt";
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  public payload: any;

  constructor(
    public _authService: AuthService,
    
    private _router: Router){

    }
    
    canActivate(): boolean{
      this._authService.getPayload().subscribe(res=>{
        this.payload = res["custom:is_admin"];
      }, err=>console.log(err))

      if (this._authService.loggedIn() && this.payload == 'true' && !this._authService.isExpired() ){
        return true;
      } else {
        window.location.replace('/login');
        this._authService.logout();
        return false;
      }
    }
  
}
