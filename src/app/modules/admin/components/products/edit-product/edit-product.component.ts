import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Brand } from 'src/app/models/brand-model';
import { Category } from 'src/app/models/category-model';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<EditProductComponent>,
    public service: AdminService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }
  public brandList: { [id: string]: any; } = {};    
  public cateList: { [id: string]: any; } = {};  
  token : string = localStorage.getItem('token');
  headers :  {}= { 'Authorization': 'Bearer '+ this.token };
  readonly APIUrl = environment.admin_apiUrl;

  ngOnInit(): void {
    this.refreshCateList();
    this.refreshBrandList();
  }
  onClose(){
    this.dialogbox.close();
    this.service.filter('Register Click');
  }
  refreshPrice(){

  }


  refreshBrandList(){
    this.service.getBrandList().subscribe(data =>{
      // console.log(data);
      data['data'].forEach(element => {
        // console.log(element["cate_name"]);
        this.brandList[element._id] = element.ten;
        // this.listItems.push(element)
      });
      console.log(this.brandList)
    });
  }

  refreshCateList(){
    this.service.getCategoryList().subscribe(data =>{
      
      data['data'].forEach(element => {
        // console.log(element["cate_name"]);
        this.cateList[element._id] = element.ten;
        // this.listItems.push(element)
      });
      console.log(this.cateList);
    });
  }

  onSubmit(form :NgForm){
    console.log(form.value);
    this.service.updateProduct(form.value).subscribe(res=>
      {
        console.log(res)
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        this.http.post(this.APIUrl + "/dongia/" + form.value._id + "/create", form.value, {headers: this.headers} )
        .subscribe(data=>{
          console.log(data)
          if (data['success']){
              this.dialogbox.close();
              // window.location.replace('/admin/product');
            }
        }, error=>{
          console.log(error)
        })
        
      })
  }
  compareCategories(i1: Category, i2: Category) : boolean{
    // debugger;
    return  i1===i2;
  }

  compareBrands(i1: Brand, i2: Brand) : boolean{
    // debugger;
    return  i1===i2;
  }
}