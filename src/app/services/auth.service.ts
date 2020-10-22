import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login } from 'src/app/models/login-model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }
  formData: Login;

  readonly auth_APIUrl = environment.auth_apiUrl;
  
  token : string = localStorage.getItem('token');
  headers: {}={'Authorization': 'Bearer '+this.token};

  login(dt: Login) {
    return this.http.post(this.auth_APIUrl+'/login',dt);

  }
  logout(){
    let token = localStorage.getItem('token');
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this._router.navigate([''])
    return this.http.post(this.auth_APIUrl+'/logoutall', {headers: this.headers});
}

  isAdmin(){
    let token = localStorage.getItem('token');
    if (token == null){
      return false;
    }
    
    if (localStorage.getItem('role')=='admin')
      return true;
    return false;
  }

  isUser(){
    let token = localStorage.getItem('token');
    if (token == null){
      return false;
    }

    if (localStorage.getItem('role') == 'customer'){
      // console.log('user')
      return true;
    }
    return false;
  }
  
  loggedIn(){
    // console.log('dang loggin')
    return !!localStorage.getItem('token')
    
  }

}
