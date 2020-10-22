import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address-model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.scss']
})
export class EditAddressComponent implements OnInit {

  constructor(
    private _router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    private service: CustomerService
  ) { }
  AddressID: string = '';

  ngOnInit(): void {
    
    this.AddressID = this.actRoute.snapshot.params['add_id'];
    console.log(this.AddressID)
    this.refreshAddress();
    // this.resetAddressForm();
  }

  AddressForm : FormGroup;
  check_date: FormGroup;
  address: Address = new Address();

  account_validation_messages = {
    'ten': [
      { type: 'required', message: 'Nhập họ và tên' },
      { type: 'maxlength', message: 'Họ tên phải từ 5-50 ký tự'},
      { type: 'minlength', message: 'Họ tên phải từ 5-50 ký tự'}
    ],
    'dienthoai': [
      { type: 'required', message: 'Nhập số điện thoại' },
      { type: 'pattern', message: 'Số điện thoại không hợp lệ' }
    ],
    'diachi': [
      { type: 'required', message: 'Nhập địa chỉ' },
      { type: 'minlength', message: 'Địa chỉ phải từ 10-100 ký tự' },
      { type: 'maxlength', message: 'Địa chỉ phải từ 10-100 ký tự' }
    ]
  }

  onAddress(){
    this._router.navigate(['/address'])
  }

  refreshAddress(){
    this.service.getAddressDetails(this.AddressID).subscribe(res=>{
      this.address = res['data']
      console.log(this.address);
      this.resetAddressForm();
    })
    
  }

  resetAddressForm(){
    
    console.log(this.address)
    this.AddressForm = this.fb.group({
      ten: new FormControl(this.address.ten, Validators.compose([
        Validators.maxLength(50),
        Validators.minLength(5),
        Validators.required
      ])),
      dienthoai: new FormControl(this.address.dienthoai, Validators.compose([
        Validators.required,
        Validators.pattern('[0-9]{10,12}')
      ])),
      diachi: new FormControl(this.address.diachi, Validators.compose([
        Validators.maxLength(100),
        Validators.minLength(10),
        Validators.required
      ]))
    });
    // this.AddressForm.controls['ten'].setValue(this.address.ten)
  
  }
} 