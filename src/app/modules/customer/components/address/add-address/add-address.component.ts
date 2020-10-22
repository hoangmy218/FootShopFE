import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.scss']
})
export class AddAddressComponent implements OnInit {

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private service: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetAddressForm();
  }

  AddressForm : FormGroup;
  check_date: FormGroup;

  account_validation_messages = {
    'name': [
      { type: 'required', message: 'Nhập họ và tên' },
      { type: 'maxlength', message: 'Họ tên phải từ 5-50 ký tự'},
      { type: 'minlength', message: 'Họ tên phải từ 5-50 ký tự'},
    ],
    'phone': [
      { type: 'required', message: 'Nhập số điện thoại' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' }
    ],
    'address': [
      { type: 'required', message: 'Nhập địa chỉ' },
      { type: 'minlength', message: 'Địa chỉ phải từ 10-100 ký tự' },
      { type: 'maxlength', message: 'Địa chỉ phải từ 10-100 ký tự' }
    ]
  }

  onAddress(){
    console.log(this.AddressForm)
    let address : any = {};
    address.ten = this.AddressForm.controls['name'].value;
    address.dienthoai = this.AddressForm.controls['phone'].value;
    address.diachi = this.AddressForm.controls['address'].value;
    this.service.addAddress(address).subscribe(res=>{
      this.snackBar.open(res['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })
      
    })
    this._router.navigate(['/address'])
  }

  resetAddressForm(){
    this.AddressForm = this.fb.group({
      name: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(5)
      ])),
      
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10,12}')
      ])),
      address: new FormControl('', Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(10),
        Validators.required
      ]))
    });
  
  }

 


}
