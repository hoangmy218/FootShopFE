import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetails } from 'src/app/models/product-details-model';
import { Product } from 'src/app/models/product-model';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  constructor(
    private service: AdminService,
    private actRoute: ActivatedRoute,
    private _router: Router,
    private snackBar: MatSnackBar
  ) {
    this.service.listen().subscribe((m:any)=>{
      console.log(m);
      this.refreshProductDetailList();
   })
  }
   listData : MatTableDataSource<any>;
   displayedColumns : string[] = [ 'chitietsanpham_id', 'mausac_id', 'kichco_id', 'soluong', 'Options'];
   public brandList: { [id: string]: any; } = {};    
   public cateList: { [id: string]: any; } = {};    
   public priceList: { [id: string]:any;} = {};
   productDetailsList: ProductDetails[] = [];
   productColorList : any = [];

    // @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatSort) sort:MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
  product : Product = new Product();

  productID: string="";

  ngOnInit(): void {
    this.productID = this.actRoute.snapshot.params['id'];
    this.refreshProductDetail();
    // this.refreshProductDetailList();
    this.refreshProductColorList();
  }

  refreshProductColorList(){
    this.service.getProductColorList(this.productID).subscribe(res=>{
      console.log('msp',res)
      this.productColorList = res['details']
    })
  }
  
  refreshProductDetail(){
    this.service.getProductDetail(this.productID).subscribe(res=>{
      console.log(res['data'])
      this.product = res['data']
      this.service.getNewPrice(this.productID).subscribe(result=>{
        this.product.dongia = result['data'][0].dongia
      })
    })
  }

  refreshProductDetailList(){
    this.service.getProductDetailsList().subscribe(res=>{
      this.productDetailsList = res['data']
      console.log(this.productDetailsList)
      this.listData = new MatTableDataSource(res['data']);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
    })
  }

  

  onDelete(id: string){
    console.log('id', id)
    if (confirm('Bạn có chắc chắn muốn xóa?'))
    {
      this.service.deleteProductColor(id).subscribe(res=>{
        this.refreshProductColorList();
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });

      });
    }
  }
  
  onAdd(){
    // window.location.replace('/admin/product/add');
    this._router.navigate(['/admin/product/'+this.productID+'/add']);
  }
  onEdit(id: string, sizes: any[]){
    console.log('id', id)
    console.log('sizes', sizes)
    
    var size_arr = [];
    if (sizes){
      sizes.forEach(element => {
        size_arr.push(element['kichco_id']['_id'])
      });
    }
    console.log('size_arr', size_arr)
    localStorage.setItem('size_arr', JSON.stringify(size_arr))
    this.service.getProductColorDetails(id).subscribe(res=>{
      console.log('pro color', res)
      var hinh_arr = [];
      if (res['data']['hinh']){
        res['data']['hinh'].forEach(element => {
          hinh_arr.push(element['_id']);
        });
      }
      console.log('hinh arr', hinh_arr)
      localStorage.setItem('image_arr', JSON.stringify(hinh_arr))
      this.service.formProductDetail={
        _id : res['data']._id,
        mausac_id: res['data'].mausac_id._id,
        kichco_id: size_arr
      }
      console.log(this.service.formProductDetail)
      this._router.navigate(['/admin/product/'+this.productID+"/"+id]);
    })
    
  }

  onDetails(id: number){
    
  }

  applyFilter(filtervalue: string){
    this.listData.filter = filtervalue.trim().toLocaleLowerCase();
  }



  

}
