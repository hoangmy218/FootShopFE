import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {

  qty: number = 1;
  constructor(
    private service: CustomerService,
    private _router: Router,
    private snackBar: MatSnackBar,
    private actRoute: ActivatedRoute
  ) { }

  public cartList: any = [];
  color: any;
  product: any;
  public priceList : any = [];
  subTotal : number = 0;
  total : number = 0;
  discount: number = 0;
  orderID: string = '';
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

    this.orderID = this.actRoute.snapshot.params['id'];
    this.refreshOrderDetails();
  }





  refreshOrderDetails(){
    this.service.getOrderDetails(this.orderID).subscribe(res=>{
      console.log('res',res)
      this.order = res['data'];
      this.total = res['data']['tongtien'];
      this.productList = res['details'];
      res['details'].forEach(element => {
        this.discount += element['khuyenmai'];
        this.subTotal += element['dongia'];
        console.log('hinh', element['ctsp_id']['mausanpham_id']['hinh'][0])
        this.service.getImage(element['ctsp_id']['mausanpham_id']['hinh'][0]).subscribe(result=>{
          console.log(result['data'].hinh)
          this.imageList[element['ctsp_id']._id] = result['data'].hinh;
        })
      });
    })
  }
}
