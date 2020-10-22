import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { AddSizeComponent } from '../add-size/add-size.component';
import { EditSizeComponent } from '../edit-size/edit-size.component';
import { Size } from '../../../../../models/size-model';


@Component({
  selector: 'app-size',
  templateUrl: './size.component.html',
  styleUrls: ['./size.component.scss']
})
export class SizeComponent implements OnInit {

  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshSizeList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['_id', 'ten', 'Options'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshSizeList();
  }

  refreshSizeList() {
    this.service.getSizeList().subscribe(res => {
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width = "30%";
    this.dialog.open(AddSizeComponent, dialogConfig);
  }

  onEdit(brand: Size){
    this.service.formSize = brand;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =true;
    dialogConfig.width="30%";
    this.dialog.open(EditSizeComponent,dialogConfig);
  }

  onDelete(id: number){
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteSize(id).subscribe(res=>{
        this.refreshSizeList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }
}
