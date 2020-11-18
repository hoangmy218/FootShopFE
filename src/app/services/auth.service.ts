import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { observable,  Observable } from 'rxjs';
import { Login } from 'src/app/models/login-model';
import { environment } from '../../environments/environment';
import { JwtHelperService } from "@auth0/angular-jwt";
import {AuthenticationDetails,CognitoUser,CognitoUserPool,CognitoUserAttribute} from 'amazon-cognito-identity-js';

const poolData={
  UserPoolId:'us-east-1_sMYPBjOhu',
  ClientId:'70qhouk11mkqt869ptmk5mdm0v'
}
const userPool=new CognitoUserPool(poolData);

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private http: HttpClient,
    private _router: Router
  ) { }

  formData: Login;

  //cognito
  public user: any;
  
  cognitoUser:any;
  userSession:any;
  accessToken:any;
  helper = new JwtHelperService();
  token : string = localStorage.getItem('token');
  // headers: {}={'Authorization': 'Bearer '+this.token};
  headers = new HttpHeaders().set('Authorization', this.token);

  readonly auth_APIUrl = environment.auth_apiUrl;
  
  // token : string = localStorage.getItem('token');
  // headers: {}={'Authorization': 'Bearer '+this.token};

  registerCognito(username,email,password,name){
    const attributeList=[];
    let dataEmail={
      Name:'email',
      Value:email
    };
    let is_admin={
      Name:'custom:is_admin',
      Value:'false'
    };
    let dataname={
      Name:'name',
      Value:name
    }
    const attributeEmail=new CognitoUserAttribute(dataEmail);
    const attributeIsAdmin=new CognitoUserAttribute(is_admin);
    const attributeName=new CognitoUserAttribute(dataname);
    attributeList.push(attributeIsAdmin);
    attributeList.push(attributeEmail);
    attributeList.push(attributeName);
    console.log(attributeList)
    return Observable.create(observer=>{
      userPool.signUp(username,password,attributeList,null,(err,result)=>{
        if(err){
          observer.error(err);
          return;
        }
        this.cognitoUser=result.user;
        console.log('cogU', this.cognitoUser)
        observer.next(result);
        observer.complete();
      });
    });

  }

  registerApi(email, name){
    return this.http.post(this.auth_APIUrl+'/register',{email:email, ten: name});
  }


  //---------------------------Verify Code------------------------//
  verifyCode(code){
    const user={
      Username:this.cognitoUser.username,
      Pool:userPool
    };
    console.log(user)
    return Observable.create(observer=>{
      const cognitoUser=new CognitoUser(user);
      cognitoUser.confirmRegistration(code,true,(err,result)=>{
        if(err){
          observer.error(err);
          return;
        }
        observer.next(result);
        observer.complete();
      })
    })
  }
  //------------------------------------RESEND------------------------------//
  resend(){
    const user={
      Username:this.cognitoUser.username,
      Pool:userPool
    }
    return Observable.create(observer=>{
      const cognitouser=new CognitoUser(user);
      cognitouser.resendConfirmationCode(function(err,result){
        if(err){
          observer.error(err);
          return;
        }
        observer.next(result);
        observer.complete();
      })
    })
  };
  //------------------------------------Login-------------------------------------//
  login(email,password){
    const authenticationData={
      Username:email,
      Password:password
    };
    const authenticationDetails=new AuthenticationDetails(authenticationData);
    const userData={
      Username:email,
      Pool:userPool
    };
    const cognitoUser=new CognitoUser(userData);
    return Observable.create(observer=>{
      cognitoUser.authenticateUser(authenticationDetails,{
        onSuccess:function(result){
          var idToken=result.getIdToken().getJwtToken();
          var name=result.getIdToken().payload.name;
          localStorage.setItem('idToken',idToken);
          localStorage.setItem('name',name);
          observer.next(result);
          observer.complete();
        },
        onFailure:function(err){
          observer.error(err);
        }
      })
    })
  }
  //-----------------------------Forgot Password-----------------------------//
  forgot(email){
    const user={
      Username:email,
      Pool:userPool
    };
    return Observable.create(observer=>{
      const cognitouser=new CognitoUser(user);
      cognitouser.forgotPassword({
        onSuccess:function(data){
          observer.next(data);
          observer.complete();
        },
        onFailure:function(err){
          observer.error(err);
        }
      })
    })
  }
  //------------------------------------CONFIRM PASSWORD-------------------------//
  confirmPassword(code,password,email){
    const user={
      Username:email,
      Pool:userPool
    };
    return Observable.create(observer=>{
      const cognitouser=new CognitoUser(user);
      cognitouser.confirmPassword(code,password,{
        onSuccess(){
          observer.next();
          observer.complete();
        },
        onFailure(err){
          observer.error(err);
        }
      })
    })
  }
  //-------------------------------- Get user ----------------------------//
  getAuthenticateUser(){
    return userPool.getCurrentUser();
  }

  //-------------------------------------IS LOGGED IN-----------------------------//
  loggedIn(){
    return userPool.getCurrentUser()!=null;
  }
  //------------------------------------------LOG OUT -----------------------------//
  logout(){
    this.getAuthenticateUser().signOut();
    localStorage.removeItem('idToken');
    localStorage.removeItem('name');
    localStorage.clear();
  }
  //------------------------------------------GET TOKEN-----------------------------//
  gettoken(){
    return Observable.create(observer=>{
      this.getAuthenticateUser().getSession((err,session)=>{
        if(err){
          observer.error(err);
        }
        observer.next(session.getIdToken().getJwtToken());
        observer.complete();
      })
    })
  }
  //-----------------------------------------GET PAYLOAD---------------------------//
  getPayload(){
    return Observable.create(observer=>{
      this.getAuthenticateUser().getSession((err,session)=>{
        if(err){
          observer.error(err);
        }
        observer.next(session.getIdToken().payload);
        observer.complete();
      })
    })
  }



  //NORMAL

//   login(dt: Login) {
//     return this.http.post(this.auth_APIUrl+'/login',dt);

//   }
//   logout(){
//     let token = localStorage.getItem('token');
//     localStorage.removeItem('token');
//     localStorage.removeItem('name');
//     localStorage.removeItem('role');
//     this._router.navigate([''])
//     return this.http.post(this.auth_APIUrl+'/logoutall', {headers: this.headers});
// }
  public payload: any;

  isAdmin(){
    this.getPayload().subscribe(res=>{
      this.payload = res["custom:is_admin"];
      if (res["custom:is_admin"] == 'true'){
        return true;
      }
      return false;
    }, err=>console.log(err))
    // let token = localStorage.getItem('token');
    // if (token == null){
    //   return false;
    // }
    
    // if (localStorage.getItem('role')=='admin')
    //   return true;
    return false;
  }

  getRole(){
    this.getPayload().subscribe(res=>{
      this.payload = res["custom:is_admin"];
        
    }, err=>console.log(err))
  }

  isUser(){
    this.getPayload().subscribe(res=>{
      this.payload = res["custom:is_admin"];
      if (res["custom:is_admin"] == 'true'){
        return false;
      }
      return true;
    }, err=>console.log('isUser',err))
    // let token = localStorage.getItem('token');
    // if (token == null){
    //   return false;
    // }
    
    // if (localStorage.getItem('role')=='admin')
    //   return true;
    // return false;
  }

  isExpired(){
    let token = localStorage.getItem('token');
    console.log(this.helper.isTokenExpired(token));
    this.setProfile();
    return this.helper.isTokenExpired(token);
  }
  
  // loggedIn(){
  //   // console.log('dang loggin')
  //   return !!localStorage.getItem('token')
    
  // }
    //PROFILE
    getProfile(){
      return this.http.get(this.auth_APIUrl+"/profile/me" , {headers :this.headers});
    }

    setProfile(){
      if (this.loggedIn()){
        this.getProfile().subscribe(res=>{
          localStorage.setItem('user_name', res['data']['ten']);
          this.user = res['data'];
        })
      }
    }





}
