import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  qty: number = 1;
  constructor(
    private service: CustomerService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) { }

  public cartList: any = [];
  color: any;
  product: any;
  public priceList : any = [];
  subTotal : number = 0;
  total : number = 0;
  discount: number = 0;

  

  ngOnInit(): void {
    this.refreshCartList();
  }

  onChange(item_id: string, pro_id: string, value: number){
    console.log(item_id)
    console.log(pro_id)
    console.log(value)
    let cartItem : CartItem = new CartItem();
    cartItem.ctsp_id = pro_id;
    cartItem.soluongdat = value;
    this.service.updateCart(item_id, cartItem).subscribe(res=>{
      console.log(res)
      this.snackBar.open(res['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })
    }, error=>{
      console.log(error)
    });
    this.refreshCartList();
    
  }

  onCart(){
    this._router.navigate(['/checkout'])
  }

  refreshCartList(){
    this.service.getCartList().subscribe(res=>{
      this.cartList = res['data'];
      console.log(res);
      console.log('data', res['data']);
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
      this.total = this.subTotal - this.discount;
    })
    
  }
  onDelete(item_id: number){
    console.log(item_id);
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteFromCart(item_id).subscribe(res=>{
        console.log(res);
        this.snackBar.open(res['message'].toString(), '',{
              duration: 3000,
              verticalPosition:'bottom'
            });
        this.refreshCartList();
      })
    }
  }
}