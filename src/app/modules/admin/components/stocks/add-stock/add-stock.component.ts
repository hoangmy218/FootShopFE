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
import { EditStockComponent } from '../edit-stock/edit-stock.component';

import {StockItem} from '../../../../../models/stock-item.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-stock',
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

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

  constructor(
    private fb: FormBuilder,
    private service: AdminService,
    private snackBar: MatSnackBar,
    private _router: Router
    ) {

    this.addForm = this.fb.group({
      supplier: ['', Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);


  }


  ngOnInit() {
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

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
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
      this.service.addStock(this.stock).subscribe(res=>{
        console.log('added result', res)
        this.stockID = res['data']['_id'];
        this.sid = res['data']['id'];
        // this.addProduct();
         this.addProductList().then(()=>{
           this.saveStockList().then(()=>{
            this._router.navigate(['/admin/stock']);
           })
         })
        // this.saveStockList();
        
      })
      

  }

  addProductList(){
    console.log(this.stockID)

    console.log(this.rows.value)
    this.products = this.rows.value;
    let prolist : any={};
    prolist.sanpham = this.rows.value;
    console.log(prolist);
    this.service.addProductStockList(this.stockID, prolist).subscribe(res=>{
      // this.snackBar.open(res['message'].toString(), '', {
      //   duration: 3000,
      //   verticalPosition:'bottom'
      // })
      console.log(res)
     
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
