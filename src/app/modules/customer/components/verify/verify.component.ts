import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

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
    'code': [
      { type: 'required', message: 'Nhập mã xác thực' },
      { type: 'pattern', message: 'Mã xác thực không hợp lệ' }
    ]
  }

  resetVerifyForm(){
    this.VerifyForm = this.fb.group({
      code: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(6),
        Validators.minLength(6),
        Validators.pattern('[A-Za-z0-9]{6,6}')
      ]))
    })
  }

  onVerify(){
    this.__router.navigate(['/register'])
  }

}
