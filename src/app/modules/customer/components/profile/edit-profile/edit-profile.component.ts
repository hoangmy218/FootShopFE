import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { CustomerService } from 'src/app/services/customer.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  constructor(
    private __router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private snackBar: MatSnackBar,
    private service: CustomerService,
    private datePipe: DatePipe
  ) { }
  profile : any = {
    'ten': '',
    'gioitinh': false,
    'dienthoai': '',
    'ngaysinh': new Date()

  }
  GetStartedForm: FormGroup;

  ngOnInit(): void {
    this.resetGetStartedForm();
    this.refreshProfile();
    
    $(window).scrollTop(0);
    $(function(){
      $('[type="date"]').prop('max', function(){
          return new Date().toJSON().split('T')[0];
      });
  });
  }



  
  account_validation_messages = {
    'ten': [
      { type: 'required', message: 'Nhập họ và tên' }
    ],
    'gioitinh': [
      { type: 'required', message: 'Chọn giới tính' }
    ]
  }

  resetGetStartedForm(){
    console.log('pf', this.profile)
    this.GetStartedForm = this.fb.group({
      ten: new FormControl(this.profile.ten, Validators.compose([
        Validators.required
      ])),
      dienthoai: new FormControl(this.profile.dienthoai),
      gioitinh: new FormControl(this.profile.gioitinh,Validators.compose([
        Validators.required
      ]) ),
      ngaysinh: new FormControl (this.profile.ngaysinh )
    })
  }
  refreshProfile(){
    this.service.getProfile().subscribe(res=>{
      console.log(res);
      this.profile.ten = res['data']['ten'];
      this.profile.dienthoai = res['data']['dienthoai'];
      this.profile.gioitinh = res['data']['gioitinh'];
      this.profile.ngaysinh = this.datePipe.transform(res['data']['ngaysinh'], 'yyyy-MM-dd');;
      this.resetGetStartedForm();
    })
  }

  choose(value: string){
    console.log('value', value)
  }

  onGetStarted(){
    let data : any = {};
    data.ten = this.GetStartedForm.controls['ten'].value;
    data.dienthoai = this.GetStartedForm.controls['dienthoai'].value;
    data.ngaysinh = this.GetStartedForm.controls['ngaysinh'].value;
    data.gioitinh = this.GetStartedForm.controls['gioitinh'].value;
    this.service.updateProfile(data).subscribe(res=>{
      console.log(res);
      if (res['success']==true){
        
       
      
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition: 'bottom'
        })
        // this.__router.navigate(['/profile'])
      
     
      }
    
    })
  }

}

