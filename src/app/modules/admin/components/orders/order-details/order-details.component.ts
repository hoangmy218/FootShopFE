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
   public cartList: any = [];
   color: any;
   product: any;
   public priceList : any = [];
   subTotal : number = 0;
   total : number = 0;
   discount: number = 0;
   OrderID: string = '';
   order: any = {};
   productList: any = [];
   public imageList: { [id: string]:any;} = {};
 
   public stageList: { [id: number]:any;} = {
     [1]: 'Chờ xác nhận',
     [2]: 'Đã xác nhận',
     [3]: 'Đang giao',
     [4]: 'Đã hoàn tất',
     [5]: 'Đã hủy'    
   };
 

  ngOnInit(): void {


    this.OrderID = this.actRoute.snapshot.params['order_id'];
    console.log(this.OrderID);

    // this.loadOrder(this.OrderID);
    this.refreshOrderDetails(this.OrderID);

  }


  refreshOrderDetails(OrderID){
    this.service.getOrderDetails(OrderID).subscribe(res=>{
      console.log('res',res)
      this.order = res['data'];
      this.productList = res['details'];
      res['details'].forEach(element => {
        this.discount += element['khuyenmai'];
        console.log('hinh', element['ctsp_id']['mausanpham_id']['hinh'][0])
        this.service.getImage(element['ctsp_id']['mausanpham_id']['hinh'][0]).subscribe(result=>{
          console.log(result['data'].hinh)
          this.imageList[element['ctsp_id']._id] = result['data'].hinh;
        })
      });
    })
  }

 


}
