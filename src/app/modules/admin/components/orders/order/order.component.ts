import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import {ThemePalette} from '@angular/material/core';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshOrderList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['_id', 'nguoidung_id','diachi_id', 'ngaydat','vanchuyen_id', 'trangthai','tongtien', 'Options'];
  public stageList: { [id: number]:any;} = {
    [1]: 'Chờ xác nhận',
    [2]: 'Đã xác nhận',
    [3]: 'Đang giao',
    [4]: 'Đã hoàn tất',
    [5]: 'Đã hủy'    };
  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshOrderList();
  }

  refreshOrderList() {
    this.service.getOrderList().subscribe(res => {
      console.log(res)
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }




  onDelete(id: number){
    if (confirm('Bạn có chắc chắn muốn hủy?'))
    {
      this.service.cancelOrder(id).subscribe(res=>{
        this.refreshOrderList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }

  OnStage(id: number, trangthai: number){
    console.log(id)
    console.log(trangthai)
    if (trangthai == 1){
      if (confirm('Bạn có chắc chắn muốn duyệt đơn hàng?'))
      {
        this.service.confirmOrder(id).subscribe(res=>{
          this.refreshOrderList();
          this.snackBar.open(res['message'].toString(), '',{
            duration: 3000,
            verticalPosition:'bottom'
          });

        });
      }
    }else if (trangthai == 2){
      if (confirm('Bạn có chắc chắn muốn giao đơn hàng?'))
      {
        this.service.shipOrder(id).subscribe(res=>{
          this.refreshOrderList();
          this.snackBar.open(res['message'].toString(), '',{
            duration: 3000,
            verticalPosition:'bottom'
          });

        });
      }
    }else if (trangthai == 3){
    if (confirm('Bạn có chắc chắn muốn hoàn tất đơn hàng?'))
    {
      this.service.completeOrder(id).subscribe(res=>{
        this.refreshOrderList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }
  }

  OnCancel(id: number){
    console.log(id)
    
      if (confirm('Bạn có chắc chắn muốn hủy đơn hàng?'))
      {
        this.service.cancelOrder(id).subscribe(res=>{
          this.refreshOrderList();
          this.snackBar.open(res['message'].toString(), '',{
            duration: 3000,
            verticalPosition:'bottom'
          });

        });
      }
  }
    
}

