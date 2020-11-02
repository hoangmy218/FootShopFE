import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-getstarted',
  templateUrl: './getstarted.component.html',
  styleUrls: ['./getstarted.component.scss']
})
export class GetstartedComponent implements OnInit {

  constructor(
    private __router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetGetStartedForm();
  }

  GetStartedForm: FormGroup;

  
  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Nhập họ và tên' }
    ],
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

  resetGetStartedForm(){
    this.GetStartedForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.maxLength(16),
        Validators.minLength(5),
        Validators.required
      ])),
    })
  }

  onGetStarted(){
    var userid : string ='';
    this._auth.registerApi(this.GetStartedForm.controls['email'].value, this.GetStartedForm.controls['email'].value).subscribe(res=>{
      // console.log(res);
      if (res['success']==true){
        userid = res['data']._id;
        var email = this.GetStartedForm.controls['email'].value;
        var password = this.GetStartedForm.controls['password'].value;
        var name = this.GetStartedForm.controls['name'].value;
        this._auth.registerCognito(userid, email, password, name).subscribe(res=>{
          // console.log('resC', res)
          this.__router.navigate(['/verify'])
        })
      }else{
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition: 'bottom'
        })
      }
     
    })
    // this.__router.navigate(['/verify'])
  }

}
