import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from 'src/app/models/category-model';
import { AdminService } from 'src/app/services/admin.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {


  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshCategoryList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['_id', 'ten', 'Options'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshCategoryList();
  }

  refreshCategoryList() {
    this.service.getCategoryList().subscribe(res => {
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
    this.dialog.open(AddCategoryComponent, dialogConfig);
  }

  onEdit(cate: Category){
    this.service.formCate = cate;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =true;
    dialogConfig.width="30%";
    this.dialog.open(EditCategoryComponent,dialogConfig);
  }

  onDelete(id: number){
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteCategory(id).subscribe(res=>{
        this.refreshCategoryList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }
}
