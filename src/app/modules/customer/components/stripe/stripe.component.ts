import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Order } from 'src/app/models/order-model';
import { CustomerService } from 'src/app/services/customer.service';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeElementsOptions, StripeCardElementOptions } from '@stripe/stripe-js';
import { PayStripe} from '../../../../models/paystripe-model';
import { CartItem } from 'src/app/models/cart-item-model';

@Component({
  selector: 'app-stripe',
  templateUrl: './stripe.component.html',
  styleUrls: ['./stripe.component.scss']
})
export class StripeComponent implements OnInit {

  @ViewChild(StripeCardComponent) card: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#676b70'
        }
      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en'
  };

  stripeTest: FormGroup;
  paystripe : PayStripe = {
    token: '',
    total: 1,
  }
  order :Order;
  total : number;
  cartItem : CartItem[];
  cart: CartItem[];

  constructor(
    private fb: FormBuilder, 
    private stripeService: StripeService,
    private service: CustomerService,
    private snackbar: MatSnackBar,
    private _router: Router,
    ) {}

  ngOnInit(): void {
    this.getCartList();
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
  }
  data : {[id: string]: any,} = {};
  message: string = '';

  getCartList(){
    this.service.getShortCartList().subscribe(res=>{
      console.log(res)
      this.cart = res['data'];
    }, error=>{
      console.log(error)
    });
  }

  createToken(): void {

    const name = this.stripeTest.get('name').value;
    this.stripeService.createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          // Use the token
          // console.log('token_id',result.token.id);
          this.paystripe.token = result.token.id;
          this.total = parseInt(localStorage.getItem('total'));
          console.log('total', this.total)

          this.paystripe.total = Math.round(this.total/23200);
          // console.log(this.paystripe)
          console.log('paystripe',this.paystripe);
         
          this.service.payWithStripe(this.paystripe).subscribe(res=>{
            this.message = res['message'].toString();
            console.log('res mess', res);
            this.snackbar.open(res['message'].toString(), '', {
              duration: 5000,
              verticalPosition:'bottom'
            });
            this.placeOrder();
            console.log('formorder', this.service.formOrder);
            this.service.addOrder().subscribe(res=>{
              console.log('res add order', res)
              this._router.navigate(['/complete'])
              // this.snackbar.open(res['message'].toString(), '', {
              //   duration: 5000,
              //   verticalPosition:'bottom'
              // });
            }, error=>{
              console.log(error)
            })
            // this.service.FormOrder.pm_id = 2;
            // console.log(this.service.FormOrder);
            // this.service.placeOrder().subscribe(res=>{
            //   console.log(res);
            //   this.service.removeAllProductFromCart();           
            //   alert(this.message);
            //   window.location.replace('');
            });
            
            
          // });
          console.log('mess', this.message);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
      
      // window.location.replace('');
    
  }

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
    }, error=>{
      console.log(error)
    });
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
  

  }
  
}



