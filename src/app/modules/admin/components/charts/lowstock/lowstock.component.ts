import { Component, OnInit, ViewChild } from '@angular/core';
import { NgModule } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ChartsModule, Color } from 'ng2-charts';
import { AdminService } from 'src/app/services/admin.service';
import {draw, generate} from 'patternomaly';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-lowstock',
  templateUrl: './lowstock.component.html',
  styleUrls: ['./lowstock.component.scss']
})
export class LowstockComponent implements OnInit {

  constructor(
    public service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar

  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshLowStockList();
    })
  }
  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['mausanpham_id.sanpham_id.ten', 'mausac','kichco'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshLowStockList();
  }

  refreshLowStockList() {
    this.service.getLowStock().subscribe(res => {
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

}
