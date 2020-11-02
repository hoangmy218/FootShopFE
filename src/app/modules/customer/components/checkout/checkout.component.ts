import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {


  qty: number = 1;
  constructor(
    private service: CustomerService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private fb: FormBuilder
  ) { }

  public cartList: any = [];
  color: any;
  product: any;
  public priceList : any = [];
  subTotal : number = 0;
  total : number = 0;
  discount: number = 0;
  public addressList : Address[] = [];
  public deliveryList: any;
  shipcost : number = 0;
  selectedDelivery: any;
  checkoutForm: FormGroup;
  selectedObject: any;
  defaultChecked : any;
  public imageList: { [id: string]:any;} = {};

  ngOnInit(): void {
    this.refreshDeliveryList();
    this.refreshAddressList();
    this.refreshCartList();
    this.resetCheckoutForm();
  }

  onCheckout(){
    let checkout:any={};
    
    // this._router.navigate(['/placeorder'])
  }

  submitForm(form: NgForm){
    console.log('form value',form.value)
    localStorage.setItem('diachi_id', form.value['radio'] );
    localStorage.setItem('vanchuyen_id', form.value['htvc_id']);
    this._router.navigate(['/placeorder']);
  }

  refreshDeliveryList(){
    this.service.getDelivery().subscribe(res=>{
      console.log(res['data'])
      this.deliveryList = res['data'];
      // this.selectedObject = res['data'][0]['_id'];
      console.log('dl', this.deliveryList)
    this.selectedObject = this.deliveryList[0]['_id'];
    console.log('so', this.selectedObject)
      this.shipcost =  res['data'][0].phi;
      // console.log('0', res['data'][0].phi)  
    })
  };
  
  resetCheckoutForm(){
    
    // this.checkoutForm = this.fb.group({
      
    //   deliveryControl: [this.deliveryList[0]]
    // });
  }

  choose(value: string){
    console.log('value', value)
  }
  

  selectOption(id: number) {
    //getted from event
    console.log('id', id);
    this.service.getDeliveryDetails(id).subscribe(res=>{
      console.log(res['data'])
      this.shipcost = res['data'].phi;
      this.total = this.subTotal - this.discount - this.shipcost;
    }, error=>{
      console.log(error)
    })
    //getted from binding
    // console.log('selected', this.selected)
    // this.service.getQuantity(id).subscribe(res=>{
    //   // console.log(res['data'])
    //   this.qty =  res['data'].soluong;
    //   // console.log('so qty', this.qty)
    // })
  }

  refreshAddressList(){
    this.service.getAddress().subscribe(res=>{
      this.addressList = res['data'];
      this.defaultChecked = this.addressList[0]['_id'];
      console.log(this.addressList)
          
    })
  }
  
  refreshCartList(){
    this.service.getCartList().subscribe(res=>{
      this.cartList = res['data'];
      console.log(res);
      console.log('data', res['data']);
      res['data'].forEach(element => {
        console.log('hinh', element['ctsp_id']['mausanpham_id']['hinh'][0])
        this.service.getImage(element['ctsp_id']['mausanpham_id']['hinh'][0]).subscribe(result=>{
          console.log(result['data'].hinh)
          this.imageList[element['ctsp_id']._id] = result['data'].hinh;
        })
      });
      this.priceList = res['result']['dongia'];
      var newArr = [];
      this.priceList.forEach((item, i)=> {
        console.log(item)
        if (newArr.findIndex(index => index._id === item._id) === -1) 
        {
            console.log(item)
            newArr.push(item)
        }

    });
    this.priceList = newArr;
      console.log(this.priceList);
      this.subTotal = 0;
      this.total = 0;
      this.cartList.forEach(item => {
        console.log('item', item)
        this.priceList.forEach(element => {
          if (element['sanpham_id'] == item['ctsp_id']['mausanpham_id']['sanpham_id']['_id']){
            this.subTotal += (element['dongia']* item['soluongdat']);
            console.log('subtotal', this.subTotal)
          }
        });
        
      });
      this.total = this.subTotal - this.discount - this.shipcost;
    })
    
  }

}
