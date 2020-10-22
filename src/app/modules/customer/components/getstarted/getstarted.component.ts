import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private _auth: AuthService
  ) { }

  ngOnInit(): void {
    this.resetGetStartedForm();
  }

  GetStartedForm: FormGroup;

  
  account_validation_messages = {
    'phone': [
      { type: 'required', message: 'Nhập số điện thoại' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' }
    ]
  }

  resetGetStartedForm(){
    this.GetStartedForm = this.fb.group({
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(12),
        Validators.minLength(10),
        Validators.pattern('[0-9]{10,12}')
      ]))
    })
  }

  onGetStarted(){
    this.__router.navigate(['/verify'])
  }

}
