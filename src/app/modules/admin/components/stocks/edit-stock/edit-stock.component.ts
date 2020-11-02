import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Color } from 'src/app/models/color-model';
import { Product } from 'src/app/models/product-model';
import { Size } from 'src/app/models/size-model';
import { Supplier } from 'src/app/models/supplier-model';
import { AdminService } from 'src/app/services/admin.service';
import {Stock} from '../../../../../models/stock-model';

import {StockItem} from '../../../../../models/stock-item.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-stock',
  templateUrl: './edit-stock.component.html',
  styleUrls: ['./edit-stock.component.scss']
})
export class EditStockComponent implements OnInit {

  addForm: FormGroup;

  rows: FormArray;
  itemForm: FormGroup;
  productList: Product[] = [];
  sizeList: Size[] = [];
  colorList: Color[] = [];
  supplierList: Supplier[] = [];
  supplierID: string = '';
  stock: Stock = new Stock();
  stockID: string ='';
  products: [] = [];
  stockItem: StockItem = new StockItem();
  list: any;
  sid: number = 0;
  totalproduct: number = 0;
  total: number = 0 ;

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private snackBar: MatSnackBar,
    private _router: Router,
    private actRoute: ActivatedRoute
    ) {

    this.addForm = this.fb.group({
      supplier: ['', Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);


    
  }
  stockDetail: any ;
  stockDetailList = [];
  


  ngOnInit() {
    this.stockID = this.actRoute.snapshot.params['id'];
    console.log(this.stockID)
    this.refreshStockDetails();
    
    this.refreshSupplierList();
    this.refreshProductList();
    this.refreshColorList();
    this.refreshSizeList();
    // this.addForm.get("items").valueChanges.subscribe(val => {
    //   console.log('val', val)
    //   if (val === true) {
        this.addForm.get("items_value").setValue("yes");

        this.addForm.addControl('rows', this.rows);
    //   }
    //   if (val === false) {
    //     this.addForm.get("items_value").setValue("no");
    //     this.addForm.removeControl('rows');
    //   }
    // });
    this.addForm.get("supplier").valueChanges.subscribe(val => {
      console.log(val)
      this.supplierID = val;
    })
  }

  refreshStockDetails(){
    this.service.getStockDetails(this.stockID).subscribe(res=>{
      console.log('stock details', res['data'])
      this.stockDetail = res['data'];
      this.addForm.get("supplier").setValue(this.stockDetail['nhacungcap_id']['_id']);
    })
    this.service.getStockDetailsList(this.stockID).subscribe(res=>{
      console.log(res)
      if (res['data'].length> 0){
        res['data'].forEach(element => {
          console.log('element', element)
          let form : any = {};
          form.sanpham_id = element['chitietsanpham_id']['mausanpham_id']['sanpham_id']['_id'];
          form.mausac_id = element['chitietsanpham_id']['mausanpham_id']['mausac_id']['_id'];
          form.kichco_id = element['chitietsanpham_id']['kichco_id']['_id'];
          form.soluongnhap = element['soluongnhap'];
          form.dongianhap = element['dongianhap'];
          // this.rows.push(form);
          console.log('form', form);
          this.rows.push(this.createItemFormGroupValue(form));
          this.calTotal();
          // this.rows.push(this.createItemFormGroup());

          console.log('rows', this.rows)
        });
      }

    })
  }

  compareSuppliers(i1: Supplier, i2: Supplier){
    console.log('i1',i1, 'i2', i2)
    return i1==i2;
  }
  
  calTotal(){
    this.totalproduct = 0;
    this.total = 0;
    // this.totalproduct = this.rows.value.length;
    this.rows.value.forEach(element => {
      this.total += element['dongianhap']*element['soluongnhap'];
      this.totalproduct += element['soluongnhap'];
    });
  }
  

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
    this.calTotal();
  }

  refreshProductList(){
    this.service.getProductList().subscribe(res=>{
      this.productList = res['data'];
      // console.log(this.productList)
    })
  }

  refreshSizeList(){
    this.service.getSizeList().subscribe(res=>{
      this.sizeList = res['data'];
      // console.log(this.sizeList)
    })
  }

  refreshColorList(){
    this.service.getColorList().subscribe(res=>{
      this.colorList = res['data'];
      // console.log(this.colorList)
    })
  }

  refreshSupplierList(){
    this.service.getSupplierList().subscribe(res=>{
      this.supplierList = res['data'];

    })
  }





  onRemoveRow(rowIndex:number){
    this.rows.removeAt(rowIndex);
    this.calTotal();
  }

  createItemFormGroupValue(prodetails: any): FormGroup {
    return this.fb.group({
      sanpham_id: prodetails.sanpham_id,
      mausac_id: prodetails.mausac_id,
      kichco_id: prodetails.kichco_id,
      soluongnhap: prodetails.soluongnhap,
      dongianhap: prodetails.dongianhap
    });
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      sanpham_id: null,
      mausac_id: null,
      kichco_id: null,
      soluongnhap: 1,
      dongianhap: 1000
    });
  }

  onAddStock(){
      console.log('add sID',this.supplierID)
      this.stock.nhacungcap_id = this.supplierID;
      let stock: Stock = new Stock();
      stock._id = this.stockID;
      stock.nhacungcap_id = this.supplierID;
      stock.tongnhap = this.totalproduct;
      stock.tongtien = this.total;
      stock.ngay = new Date().toString();
      this.service.updateStock(stock).subscribe(res=>{
        console.log('updated result', res)
        this.sid = res['data']['id'];
        // this.addProduct();
         this.updateProductList().then(()=>{
          //  this.saveStockList().then(()=>{
            
          // s
         })
        // this.saveStockList();
        
      })
      

  }

  updateProductList(){
    console.log(this.stockID)

    console.log(this.rows.value)
    this.products = this.rows.value;
    let prolist : any={};
    prolist.sanpham = this.rows.value;
    console.log(prolist);
    this.service.updateProductStockList(this.stockID, prolist).subscribe(res=>{
      this.snackBar.open(res['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })
      console.log(res)
      this._router.navigate(['/admin/stock']);
     
    })
    return new Promise((resolve)=>{
      resolve();
    });
  }

  saveStockList(){
    console.log('sid', this.stockID);
    
    this.service.saveStock(this.stockID).subscribe(result=>{
      console.log('save', result)
      this.snackBar.open(result['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })
    }, error=>{
      console.log(error)
    })
    return new Promise((resolve)=>{
      resolve();
    });
  }


  
   addProduct(){
    console.log(this.stockID)

    console.log(this.rows.value)
    this.products = this.rows.value;
    
    for(var i = 0; i<this.products.length; i++){
      this.stockItem.sanpham_id = this.products[i]['name'],
          this.stockItem.mausac_id = this.products[i]['color'],
          this.stockItem.kichco_id = this.products[i]['size'],
          this.stockItem.soluongnhap = this.products[i]['qty'],
          this.stockItem.dongianhap = this.products[i]['price'],
          console.log('stock Item', this.stockItem)
          console.log('sid', this.sid)
          this.service.addProductStock(this.stockID, this.stockItem).subscribe(res=>{
            console.log('add SI result', res)
          })
    }
    
    console.log('products', this.products)
        // this.products.forEach(product=>{
        //   console.log('pro', product)
        //   this.stockItem.sanpham_id = product['name'],
        //   this.stockItem.mausac_id = product['color'],
        //   this.stockItem.kichco_id = product['size'],
        //   this.stockItem.soluongnhap = product['qty'],
        //   this.stockItem.dongianhap = product['price'],
        //   console.log('stock Item', this.stockItem)
        //   console.log('sid', this.stockID)
        //   this.service.addProductStock(this.stockID, this.stockItem).subscribe(res=>{
        //     console.log('add SI result', res)
        //   })

        // })
  }

  addStockItem(product: never){
    console.log('pro', product)
          this.stockItem.sanpham_id = product['name'],
          this.stockItem.mausac_id = product['color'],
          this.stockItem.kichco_id = product['size'],
          this.stockItem.soluongnhap = product['qty'],
          this.stockItem.dongianhap = product['price'],
          console.log('stock Item', this.stockItem)
          console.log('sid', this.stockID)
          this.service.addProductStock(this.stockID, this.stockItem).subscribe(res=>{
            console.log('add SI result', res)
          })
  }

}
