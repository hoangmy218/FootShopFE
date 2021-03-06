import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { AddColorComponent } from '../add-color/add-color.component';
import {Color} from '../../../../../models/color-model';
import { EditColorComponent } from '../edit-color/edit-color.component';


@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  isHandle : boolean = true;

  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshColorList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = [ 'ten', 'hinh', 'Options'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshColorList();
  }

  refreshColorList() {
    this.service.getColorList().subscribe(res => {
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.isHandle = false;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width = "500px";
    this.dialog.open(AddColorComponent, dialogConfig);
  }

  onEdit(brand: Color){
    this.service.formColor = brand;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =true;
    dialogConfig.width="500px";
    this.dialog.open(EditColorComponent,dialogConfig);
  }

  onDelete(id: number){
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.isHandle = true;
      this.service.deleteColor(id).subscribe(res=>{
        this.refreshColorList();
        this.isHandle = false;
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }
}
