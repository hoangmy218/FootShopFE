import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminService } from 'src/app/services/admin.service';
import { AddProductComponent } from '../add-product/add-product.component';
import { EditProductComponent } from '../edit-product/edit-product.component';
import { Product } from '../../../../../models/product-model';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {


  constructor(private service: AdminService,
    private dialog:MatDialog,
    private snackBar: MatSnackBar,
    private _router: Router
  ) {
      this.service.listen().subscribe((m:any)=>{
        console.log(m);
        this.refreshProductList();
    })
  }

  listData : MatTableDataSource<any>;
  displayedColumns : string[] = [ 'ten', 'mota', 'dongia', 'danhmuc_id', 'thuonghieu_id', 'Options'];
  public brandList: { [id: string]: any; } = {};    
  public cateList: { [id: string]: any; } = {};    
  public priceList: { [id: string]:any;} = {};

  // @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatSort) sort:MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    // $('#product').addClass('active');
    this.refreshProductList();
    this.refreshBrandList();
    this.refreshCateList();
  }

  refreshBrandList(){
    this.service.getBrandList().subscribe(data =>{
      // console.log(data);
      data['data'].forEach(element => {
        // console.log(element["cate_name"]);
        this.brandList[element._id] = element.ten;
        // this.listItems.push(element)
      });
      // console.log(this.brandList)
    });
  }

  refreshCateList(){
    this.service.getCategoryList().subscribe(data =>{
      
      data['data'].forEach(element => {
        // console.log(element["cate_name"]);
        this.cateList[element._id] = element.ten;
        // this.listItems.push(element)
      });
      // console.log(this.cateList);
    });
  }

  refreshProductList() {
    this.service.getProductList().subscribe(res => {
      console.log(res['data'])
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      res['data'].forEach(element=>{
        this.service.getNewPrice(element._id).subscribe(pr=>{
          // console.log('pr',pr)
          // console.log('prL',this.priceList)
          this.priceList[element._id] = pr['data'][0].dongia;
        })
        
      })
      console.log('up price', this.priceList)
      // console.log('prL',this.priceList)
    });
    
  }

  refreshPriceList(id: any){
    this.service.getNewPrice(id).subscribe(pr=>{
      this.priceList[id] = pr['data'][0].dongia;
    })
  }
  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }

  onAdd(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width = "500px";
    this.dialog.open(AddProductComponent, dialogConfig);
  }

  onEdit(product: any){
    this.service.formProduct = product;
    this.service.formProduct.danhmuc_id = product.danhmuc_id._id;
    this.service.formProduct.thuonghieu_id = product.thuonghieu_id._id;
    console.log('product', product)
    console.log('form pro', this.service.formProduct)
    this.service.getNewPrice(product._id).subscribe(pr=>{
      // console.log('pr',pr)
      if (pr['data'][0].dongia == undefined){
        this.service.formProduct.dongia = 0;
      }
      else
        this.service.formProduct.dongia = pr['data'][0].dongia;
    })
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus =true;
    dialogConfig.width="500px";
    this.dialog.open(EditProductComponent,dialogConfig);
  }

  onDelete(id: number){
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteProduct(id).subscribe(res=>{
        this.refreshProductList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }

  onDetails(id: number){
    this._router.navigate(['admin/product/'+id]);
  }
}
