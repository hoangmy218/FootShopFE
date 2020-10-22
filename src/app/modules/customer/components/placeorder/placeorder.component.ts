import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-placeorder',
  templateUrl: './placeorder.component.html',
  styleUrls: ['./placeorder.component.scss']
})
export class PlaceorderComponent implements OnInit {

  constructor(
    private _router: Router,
    private service: CustomerService,

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

  showCard: boolean = false;

  paymentList : any = [];

  ngOnInit(): void {
    this.refreshPaymentList();
    this.refreshDeliveryList();
    this.refreshCartList();

  }

  onPlaceOrder(){
      this._router.navigate(['/complete'])
  }

  submitForm(form: NgForm){
    console.log('form value',form.value)
    localStorage.setItem('total', this.total.toString())

    // localStorage.setItem('diachi_id', form.value['htvc_id'] );
    // localStorage.setItem('vanchuyen_id', form.value['radio']);
    this._router.navigate(['/placeorder']);
  }

  refreshDeliveryList(){
    this.selectedDelivery = localStorage.getItem('vanchuyen_id');
    console.log(this.selectedDelivery)
    this.service.getDeliveryDetails(this.selectedDelivery).subscribe(res=>{
      console.log('dl',res['data'])
      this.shipcost = res['data'].phi;
      // this.selectedObject = res['data'][0]['_id'];
     
    }, error=>{
      console.log(error)
    })
  };

  refreshPaymentList(){
    this.service.getPayment().subscribe(res=>{
      this.paymentList = res['data'];
      console.log('pm', this.paymentList)
      this.defaultChecked = this.paymentList[0]['_id'];
      localStorage.setItem('thanhtoan_id', this.paymentList[0]['_id']);
      if (this.defaultChecked == '5f71a1962d321e034c9e1444'){
        this.showCard = true;
        
      }
      console.log(this.showCard)

    })
   
  }

  choose(value: string){
    console.log('value', value)
    if (value == "5f71a1962d321e034c9e1444"){
      this.showCard = true;
    }else{
      this.showCard = false;
    }
    console.log(this.showCard)
    localStorage.setItem('thanhtoan_id', value);
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
  }

  refreshAddressList(){
    this.service.getAddress().subscribe(res=>{
      this.addressList = res['data'];
      this.defaultChecked = this.addressList[0]['_id'];
      // console.log(this.addressList)
          
    })
  }
  
  refreshCartList(){
    this.service.getCartList().subscribe(res=>{
      this.cartList = res['data'];
      // console.log(res);
      // console.log('data', res['data']);
      this.priceList = res['result']['dongia'];
      var newArr = [];
      this.priceList.forEach((item, i)=> {
        // console.log(item)
        if (newArr.findIndex(index => index._id === item._id) === -1) 
        {
            // console.log(item)
            newArr.push(item)
        }

    });
    this.priceList = newArr;
      // console.log(this.priceList);
      this.subTotal = 0;
      this.total = 0;
      this.cartList.forEach(item => {
        // console.log('item', item)
        this.priceList.forEach(element => {
          if (element['sanpham_id'] == item['ctsp_id']['mausanpham_id']['sanpham_id']['_id']){
            this.subTotal += (element['dongia']* item['soluongdat']);
            // console.log('subtotal', this.subTotal)
          }
        });
        
      });
      this.total = this.subTotal - this.discount - this.shipcost;
    })
    
  }

}

