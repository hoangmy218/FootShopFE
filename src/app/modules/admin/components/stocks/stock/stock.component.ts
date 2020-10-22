import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import {Stock} from '../../../../../models/stock-model';
import { EditStockComponent } from '../edit-stock/edit-stock.component';
import { AddStockComponent } from '../add-stock/add-stock.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshStockList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['_id', 'ngay','nhacungcap_id', 'tongnhap', 'tongtien','trangthai', 'Options'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshStockList();
  }

  refreshStockList() {
    this.service.getStockList().subscribe(res => {
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd(){
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus=true;
    // dialogConfig.width = "30%";
    // this.dialog.open(AddStockComponent, dialogConfig);
    this._router.navigate(['/admin/stock/add'])
  }

  onSave(id: string){
    console.log('id', id)
    this.service.saveStock(id).subscribe(res=>{
      console.log('saved', res)
      this.refreshStockList();
    }, error=>[
      console.log(error)
    ])
  }

  onEdit(brand: Stock){
    this.service.formStock = brand;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =true;
    dialogConfig.width="30%";
    this.dialog.open(EditStockComponent,dialogConfig);
  }

  onDelete(id: number){
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteStock(id).subscribe(res=>{
        this.refreshStockList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }
}
