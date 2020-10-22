import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/models/order-model';
import { Product } from 'src/app/models/product-model';
import { AdminService } from 'src/app/services/admin.service';
import {OrderItem} from '../../../../../models/order-items-model';
import { Address } from '../../../../../models/address-model';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private actRoute: ActivatedRoute,
    private service: AdminService,
    private router: Router
  ) {

   }
  orderItems: OrderItem[] ;
  order : Order = new Order();
  OrderID : number = 0;
  product: Product = new Product();
  address: Address = new Address();
  productList : Product[];

  stateList : {[id:string]:any,} = {};
  
  // cartItems : CartItem[];
  public stageList: { [id: number]:any;} = {
    [1]: 'Chờ xác nhận',
    [2]: 'Đã xác nhận',
    [3]: 'Đã giao',
    [4]: 'Đã hoàn tất',
    [5]: 'Đã hủy'    };
  //pagination
  page = 1;
  pageSize = 4;
  collectionSize :number = 1;
  public imageList: { [id: string]:any;} = {};

  ngOnInit(): void {
    this.orderItems = [];
    this.productList =[];

    this.OrderID = this.actRoute.snapshot.params['order_id'];
    console.log(this.OrderID);

    this.loadOrder(this.OrderID);

  }

  loadOrder(OrderID){
    this.orderItems = [];
    this.productList =[];
    // this.cartItems = [];
    console.log('id',this.OrderID);

    this.service.getOrderDetails(OrderID).subscribe(res=>{
      console.log(res)
      this.order = res['data'];
      this.address = res['data'].diachi_id;
      console.log('dc', this.address)
      console.log(res['data'])
      res['details'].forEach(element => {
        
        this.orderItems.push(element);
        console.log('elm', element)
        console.log('hinh', element['ctsp_id']['mausanpham_id']['hinh'][0])
        this.service.getImage(element['ctsp_id']['mausanpham_id']['hinh'][0]).subscribe(result=>{
          console.log(result['data'].hinh)
          this.imageList[element['ctsp_id']._id] = result['data'].hinh;
        })
        // this._productService.getDetailsPro(element['pro_id']).subscribe(data=>{
        //   this.productList.push(data);
        //   this.cartItems.push({
        //     pro_id: data['pro_id'],
        //     pro_name: data['pro_name'],
        //     pro_price: data['pro_price'],
        //     pro_image : data['pro_image'],
        //     pro_stock: data['pro_stock'],
        //     cart_qty: element['qty']
        //   });
        // })
      });
      
    }, error =>{
      console.log(error)
    });
   
  }

 


}
