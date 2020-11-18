import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/models/product-model';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatSnackBar } from '@angular/material/snack-bar';

const moment = _moment;
@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {

  selectedFile : File = null;
  minDate: Date;
  maxDate: Date;
  constructor(
    private http: HttpClient,
    public service: AdminService,
    private snackBar: MatSnackBar
  ) {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDay();
    this.minDate = new Date(currentYear , currentMonth, currentDay+1);
    // this.maxDate = new Date(currentYear + 1, 11, 31);
   }
  @Input('cdkAutosizeMinRows')
    minRows: number

  productList : Product[] =[];



  ngOnInit(): void {

    // this.maxDate = moment([currentYear + 1, 11, 31]);
    this.resetForm();
    
    this.refreshProductList();
  }
  startDate : Date = new Date();
  endDate: Date = new Date();
  datebd: boolean = true;
  datekt: boolean = false;

  events: string[] = [];

  //catch date
  addEventBD(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value.toLocaleString())
    const d = new Date(event.value);
    // console.log(d.toLocaleString())
    this.startDate = d;
    if (this.startDate > this.endDate){
      this.datebd = false;
    }else{
      this.datebd = true;
    }
  }

  addEventKT(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value.toLocaleString())
    const d = new Date(event.value);
    // console.log(d.toLocaleString())
    this.endDate = d;
    if (this.startDate > this.endDate){
      this.datekt = false;
    }else{
      this.datekt = true;
      this.datebd =true;
    }
  }


  
  refreshProductList(){
    this.service.getProductList().subscribe(res=>{
      this.productList = res['data'].sort((a, b) => (a?.ten ?? "").localeCompare(b?.ten ?? ""));
      console.log(this.productList)
    })
  }

  readonly APIUrl = environment.public_apiUrl;
  token = localStorage.getItem('token');

  filedata:any;
  fileEvent(e){
      this.filedata = e.target.files[0];
  }
  
  processFile(photo: any){
    this.filedata = <File>photo.files[0];
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('file', this.filedata);
    console.log(this.filedata)
    this.http.post(this.APIUrl + "/hinhanh/upload", myFormData, {headers: headers})
    .subscribe(data => {
      console.log(data);
      this.service.formDiscount.hinh= data['hinhanh'].hinh.toString();            
    });

  }
 

  resetForm( form ?: NgForm){
    if (form!= null)
    {
      form.resetForm();
    }
    this.service.formDiscount={
      _id : '',
      chude: '',
      hinh: '',
      mota: '',
      giamgia: 1,
      ngaybd: '',
      ngaykt: '',
      sanpham_id: ''
    }
  }
  onSubmit(form :NgForm){
    console.log(form.value)
    this.service.addDiscount(form.value).subscribe(res=>{
      console.log(res)

       
        if (res['success']){
          this.snackBar.open(res['message'].toString(), '', {
            duration: 3000,
            verticalPosition:'bottom'
          })
        }
    })
  }

}
