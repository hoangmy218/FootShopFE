import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address-model';
import { CartItem } from 'src/app/models/cart-item-model';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import * as $ from 'jquery';
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
  public imageList: { [id: string]:any;} = {};
  today : Date = new Date();

  ngOnInit(): void {
    $(window).scrollTop(0);
    this.refreshPaymentList();
    this.refreshDeliveryList();
    this.refreshCartList();
    localStorage.setItem('total', this.total.toString())

  }

  onPlaceOrder(){
      this._router.navigate(['/complete'])
  }

  isExpirationExpired(discount) {
    // your date logic here, recommendnpm install moment --save;
    return ( moment(discount['ngaybd']).isBefore(moment(this.today)) 
            && moment(this.today).isBefore(moment(discount['ngaykt']))
            && discount['trangthai']==true) ;
  }

  submitForm(form: NgForm){
    console.log('form value',form.value)
   
    this.placeOrder();
    console.log('formorder', this.service.formOrder);
    this.service.addOrder().subscribe(res=>{
      console.log('res add order', res)
      localStorage.removeItem('vanchuyen_id')
      localStorage.removeItem('diachi_id')
      localStorage.removeItem('thanhtoan_id')
      this._router.navigate(['/complete'])
      // this.snackbar.open(res['message'].toString(), '', {
      //   duration: 5000,
      //   verticalPosition:'bottom'
      // });
    }, error=>{
      console.log(error)
    })
    // localStorage.setItem('diachi_id', form.value['htvc_id'] );
    // localStorage.setItem('vanchuyen_id', form.value['radio']);
    // this._router.navigate(['/complete']);
  }

  cartItem : CartItem[];
  cart: CartItem[];

  placeOrder(){
    let order: any={};
    order.thanhtoan_id = localStorage.getItem('thanhtoan_id');
    order.vanchuyen_id = localStorage.getItem('vanchuyen_id');
    order.diachi_id = localStorage.getItem('diachi_id');
    order.ghichu = '';
    this.cartItem = [];
    this.service.getShortCartList().subscribe(res=>{
      console.log(res)
      this.cart = res['data'];
      this.cart.forEach(data=>{
        this.cartItem.push({
          _id: data._id,
          ctsp_id : data.ctsp_id,
          soluongdat: data.soluongdat
        })
      })
      console.log('cartItems', this.cartItem)
      console.log('cart',this.cart)
      order.sanpham = this.cartItem;
      console.log('order', order)
      this.service.saveOrder(order);
    }, error=>{
      console.log(error)
    });

  

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
      this.total = this.subTotal - this.discount + this.shipcost;
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
      res['data'].forEach(element => {
        console.log('hinh', element['ctsp_id']['mausanpham_id']['hinh'][0])
        this.service.getImage(element['ctsp_id']['mausanpham_id']['hinh'][0]).subscribe(result=>{
          console.log(result['data'].hinh)
          this.imageList[element['ctsp_id']._id] = result['data'].hinh;
        })
      });
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
            //SUB TOTAL & DISCOUNT
            if ((item['ctsp_id']['mausanpham_id']['sanpham_id']['khuyenmai_id'] != null)  
            && (this.isExpirationExpired(item['ctsp_id']['mausanpham_id']['sanpham_id']['khuyenmai_id']))){
              // this.subTotal += (element['dongia']* item['soluongdat']*(100-item['ctsp_id']['mausanpham_id']['sanpham_id']['khuyenmai_id']['giamgia'])/100);
              this.discount += (element['dongia']* item['soluongdat']*(item['ctsp_id']['mausanpham_id']['sanpham_id']['khuyenmai_id']['giamgia'])/100);
              
              this.subTotal += (element['dongia']* item['soluongdat']);
              console.log('subtotal', this.subTotal)
            }else{
              this.discount += 0;
              this.subTotal += (element['dongia']* item['soluongdat']);
              console.log('subtotal', this.subTotal)
            }
            //END 
          }
        });
        
      });
      this.total = this.subTotal - this.discount + this.shipcost;
      localStorage.setItem('total', this.total.toString())
    })
    
  }

}

