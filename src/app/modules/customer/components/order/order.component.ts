import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  constructor(
    private service: CustomerService,
    private _router: Router,
    private snackBar: MatSnackBar
  ) { }
  orderList : any = [];
  public stageList: { [id: number]:any;} = {
    [1]: 'Chờ xác nhận',
    [2]: 'Đã xác nhận',
    [3]: 'Đang giao',
    [4]: 'Đã hoàn tất',
    [5]: 'Đã hủy'    };
  ngOnInit(): void {
    this.refreshOrderList();
  }

  refreshOrderList(){
    this.service.getOrderList().subscribe(res=>{
      console.log('res', res);
      this.orderList = res['data'];
    })
  }

}
