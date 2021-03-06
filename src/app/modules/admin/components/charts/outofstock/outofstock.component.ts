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
  selector: 'app-outofstock',
  templateUrl: './outofstock.component.html',
  styleUrls: ['./outofstock.component.scss']
})
export class OutofstockComponent implements OnInit {

  constructor(
    public service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar

  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);

        this.refreshOutOfStockList();
    })
  }
  listDataOTS : MatTableDataSource<any>;
  
  displayedColumnsOTS : string[] = ['ten', 'mausac','kichco'];

  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {

    this.refreshOutOfStockList();
  }

  refreshOutOfStockList() {
    this.service.getOutOfStock().subscribe(res => {
      this.listDataOTS = new MatTableDataSource(res['data']);
      this.listDataOTS.sort = this.sort;
      this.listDataOTS.paginator = this.paginator;
    });
    
  }

  
  applyFilterOTS(filtervalue: string){
    this.listDataOTS.filter = filtervalue.trim().toLocaleLowerCase();
  }


}
