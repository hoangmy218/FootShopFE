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
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit {


  selectedFile : File = null;
  minDate: Date;
  maxDate: Date;
  constructor(
    private http: HttpClient,
    public service: AdminService,
    private snackBar: MatSnackBar,
    private actRoute: ActivatedRoute,
    private _router: Router
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
  discountID : string = "";
  discount : any = {
    _id : '',
    chude: '',
    hinh: '',
    mota: '',
    giamgia: 1,
    ngaybd: '',
    ngaykt: '',
    sanpham_id: ''

  };
  productList2: Product[] = [];


  ngOnInit(): void {
    

    // this.maxDate = moment([currentYear + 1, 11, 31]);
    
    this.discountID = this.actRoute.snapshot.params['id'];
    this.refreshDiscount();
    this.refreshProductList();
    this.resetForm();
  }
  startDate : Date = new Date();
  endDate: Date = new Date();
  datebd: boolean = true;
  datekt: boolean = true;

  events: string[] = [];
  public proListFull: { [id: string]: any; } = {}; 

  //catch date
  addEventBD(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    console.log(this.startDate, this.endDate)
    // console.log(event.value.toLocaleString())
    const d = new Date(event.value);
    // console.log(d.toLocaleString())
    this.startDate = d;
    if (this.startDate > this.endDate){
      this.datebd = false;
    }else{
      this.datebd = true;
      this.datekt = true;
    }
  }

  addEventKT(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
    // console.log(event.value.toLocaleString())
    const d = new Date(event.value);
    // console.log(d.toLocaleString())
    this.endDate = d;
    console.log(this.startDate, this.endDate)
    if (this.startDate > this.endDate){
      
      this.datekt = false;
    }else{
      this.datekt = true;
      this.datebd =true;
    }
  }

  refreshDiscount(){
    this.service.getDiscountDetail(this.discountID).subscribe(res=>{
      this.discount = res['data'];
      this.service.formDiscount = res['data'];
      this.startDate = new Date(res['data']['ngaybd']);
      this.endDate = new Date(res['data']['ngaykt']);
      console.log('discount', this.discount)
      this.productList2 = res['data']['sanpham_id'];
      console.log('selected',this.productList2)
    })
  }

  compareProducts(i1: any, i2: any) : boolean{
    // debugger;
    console.log('i1',i1, 'i2', i2)
    console.log('i1',i1, 'i2', i2._id)
    return  i1===i2._id;
  }




  
  refreshProductList(){
    this.service.getProductList().subscribe(res=>{
      this.productList = res['data'].sort((a, b) => (a?.ten ?? "").localeCompare(b?.ten ?? ""));
      console.log(this.productList)
      this.productList.forEach(element=>{
        this.proListFull[element._id] = element.ten;
      })
      console.log('profull', this.proListFull)
      // console.log
      // this.productList2 = res['data']['sanpham_id'];
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
      _id : this.discount._id,
      chude: this.discount.chude,
      hinh: this.discount.hinh,
      mota: this.discount.mota,
      giamgia: this.discount.giamgia,
      ngaybd: this.discount.ngaybd,
      ngaykt: this.discount.ngaykt,
      sanpham_id: this.productList2
    }
  }
  onSubmit(form :NgForm){
    console.log(form.value)
    var myDiscountForm : any = {};
    myDiscountForm._id =  this.discountID;
    myDiscountForm.chude = form.value.chude;
    myDiscountForm.mota = form.value.mota;
    myDiscountForm.hinh = this.service.formDiscount.hinh;
    myDiscountForm.giamgia = form.value.giamgia;
    myDiscountForm.ngaybd = form.value.ngaybd;
    myDiscountForm.ngaykt = form.value.ngaykt;
    myDiscountForm.sanpham_id = form.value.sanpham_id;
    console.log(myDiscountForm)
    this.service.updateDiscount(myDiscountForm).subscribe(res=>{
      console.log(res)
      this.snackBar.open(res['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })

       
        if (res['success']){
          this._router.navigate(['/admin/discount']);
        }
    })
  }

  

}
