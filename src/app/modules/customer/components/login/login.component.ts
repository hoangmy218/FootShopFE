import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private service: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetLoginForm();
  }

  LoginForm: FormGroup;

  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Nhập email' },
      { type: 'pattern', message: 'Email không hợp lệ' }
    ],
    'password': [
      { type: 'required', message: 'Nhập mật khẩu' },
      { type: 'minlength', message: 'Mật khẩu phải từ 8-16 ký tự' },
      { type: 'maxlength', message: 'Mật khẩu phải từ 8-16 ký tự' }
    ]
  }

  resetForm(form ?: NgForm){
    if (form != null){
      form.resetForm();
    }
    this.service.formData={
      email: '',
      password: ''
    }
    
  }

  resetLoginForm(){
    this.LoginForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(16),
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  onLogin(){
    let login: any={};
    login.email = this.LoginForm.controls['email'].value;
    login.matkhau = this.LoginForm.controls['password'].value;
    console.log(login)
    this.service.login(login).subscribe(res=>{
      this.resetLoginForm();
      localStorage.setItem('token', res['token'])
      localStorage.setItem('role', res['user'].role)
      localStorage.setItem('name', res['user'].ten)
      console.log(res['token'])
      let token = localStorage.getItem('token');  

      // var decoded = jwt_decode(token); 
      // console.log(decoded); 
      // localStorage.setItem('user_name',decoded['user_name']);

      this.snackBar.open('Login successfully', '',{
        duration: 3000,
        verticalPosition: 'bottom',
      });
      if (this.service.isAdmin()){
        window.location.replace('/admin');
      }
      if (this.service.isUser()){
        window.location.replace('/');
      }
      // window.location.replace('');

      // this.service.getProfile().subscribe(res=>{
      //   localStorage.setItem('active', res['active']);
      //   console.log(res);
      //   if (this.service.isAdmin()){
      //     window.location.replace('/admin/dashboard');
      //   }
      //   else 
      //   {
      //     if (!this.service.isActiveUser()){
      //       console.log('verify')
      //       window.location.replace('/verify-email');
      //     }
      //     else
      //       window.location.replace('');
      //   }     
      // })
      

      
    },
    error =>{
      this.snackBar.open('Something was wrong', '',{
        duration: 3000,
        verticalPosition: 'bottom'
      });
      console.log('err',error);
     
    })
  
   

  }



}
