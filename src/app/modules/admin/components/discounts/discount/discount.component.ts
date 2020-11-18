import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshDiscountList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = [ 'chude', 'hinh', 'mota', 'ngaybd', 'ngaykt', 'trangthai', 'Options'];
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
    this.refreshDiscountList();
  }

  refreshDiscountList() {
    this.service.getDiscountList().subscribe(res => {
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
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteDiscount(id).subscribe(res=>{
        this.refreshDiscountList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }

  OnStage(id: number, trangthai){
    console.log(id)
    console.log(trangthai)
    if (trangthai == true ){
      if (confirm('Bạn có chắc chắn muốn vô hiệu hóa khuyến mãi?'))
      {
        this.service.deactiveDiscount(id).subscribe(res=>{
          this.refreshDiscountList();
          this.snackBar.open(res['message'].toString(), '',{
            duration: 3000,
            verticalPosition:'bottom'
          });

        });
      }
    }else if (trangthai == false){
      if (confirm('Bạn có chắc chắn muốn kích hoạt khuyến mãi?'))
      {
        this.service.activeDiscount(id).subscribe(res=>{
          this.refreshDiscountList();
          this.snackBar.open(res['message'].toString(), '',{
            duration: 3000,
            verticalPosition:'bottom'
          });

        });
      }
    }
    
  }
}

