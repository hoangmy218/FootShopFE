import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { AdminService } from '../../../../services/admin.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshBrandList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = ['ngaybl', 'sanpham_id', 'nguoidung_id', 'noidung', 'Options'];

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.refreshBrandList();
  }

  refreshBrandList() {
    this.service.getCommentList().subscribe(res => {
      console.log(res['data'])
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    });
    
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }


}
