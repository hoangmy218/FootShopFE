import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.resetCheckDate();
    this.resetRegisterForm();
    
  }

  RegisterForm : FormGroup;
  check_date: FormGroup;

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Nhập họ và tên' },
      { type: 'pattern', message: 'Họ và tên không hợp lệ' }
    ],
    'phone': [
      { type: 'required', message: 'Nhập số điện thoại' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' }
    ],
    'dob': [
      { type: 'required', message: 'Nhập ngày sinh' }
    ]
    
  }

  onRegister(){
    this._router.navigate(['/'])
  }

  resetRegisterForm(){
    this.RegisterForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[A-Za-z]{5,50}')
      ])),
      
      phone: new FormControl('', Validators.compose([
        
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(10),
        Validators.pattern('[0-9]{10,12}')
      ])),
      // password: new FormControl('', Validators.compose([
      //   Validators.maxLength(16),
      //   Validators.minLength(5),
      //   Validators.required
      // ])),
      check_date: new FormGroup({
        dob: new FormControl('')
      }, {validators: this.dateLessThan('dob')}),
    });
  
  }

  resetCheckDate(){
    this.check_date = new FormGroup({
      dob: new FormControl('')
    }, (formGroup: FormGroup)=>{
      return this.dateLessThan('dob')
    })
  }

  dateLessThan(from: string){
    return (group: FormGroup) : {[key: string]: any}=>{
      let f = group.controls[from];
      let t = new Date();
      if (new Date(f.value) > t){
        console.log('f', f.value)
        console.log('false')
        return {
          isInvalid: true
        };
      }
      console.log('f', f.value)
      console.log('true')
      return null;

    }
  }

}
