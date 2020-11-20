import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

 
  constructor(
    private __router: Router,
    private fb: FormBuilder,
    private _auth: AuthService

  ) { }

  ngOnInit(): void {
    this.resetVerifyForm();
  }

  VerifyForm: FormGroup;
  
  account_validation_messages = {
    'email': [
      { type: 'required', message: 'Nhập email' },
      { type: 'pattern', message: 'Email không hợp lệ' }
    ]
  }

  resetVerifyForm(){
    this.VerifyForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$')
      ]))
    })
  }

  onVerify(){
    console.log(this._auth.cognitoUser)
    this._auth.forgot(this.VerifyForm.controls['email'].value).subscribe(res=>{
      console.log('res', res)
      this.__router.navigate(['/verify'])
    })
    
  }

}
