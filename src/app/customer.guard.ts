import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  constructor(public _authService: AuthService,
    
    private _router: Router){

    }
    public payload: any;
    canActivate(): boolean{

      this._authService.getPayload().subscribe(res=>{
        this.payload = res["custom:is_admin"];
      }, err=>console.log(err))

      if (this._authService.loggedIn() && this.payload == 'false' && !this._authService.isExpired() ){
        return true;
      } else {
        window.location.replace('/login');
        this._authService.logout();
        return false;
      }

      // if (this._authService.loggedIn() && this._authService.isUser() ){
      //   return true;
      // } else if (this._authService.loggedIn() && !this._authService.isUser()  ){
      //   this._router.navigate([''])
      //   return true;
      // } else {
      //   this._router.navigate([''])
      //   return false;
      // }
    }
  
}