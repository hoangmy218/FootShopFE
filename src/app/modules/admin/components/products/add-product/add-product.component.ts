import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddProductComponent>,
    public service: AdminService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }
  public brandList: { [id: string]: any; } = {};    
  public cateList: { [id: string]: any; } = {};  

  ngOnInit(): void {
    this.resetForm();
    this.refreshCateList();
    this.refreshBrandList();
  }
  readonly APIUrl = environment.admin_apiUrl;
  product_id:  string = '';
  str_gia : string = '';
  price: number = 0;
  token : string = localStorage.getItem('token');
  headers = new HttpHeaders().set('Authorization', this.token);

  onSubmit(form :NgForm){
    console.log(form.value);
    this.service.addProduct(form.value).subscribe(res=>
      {
        
        console.log(res)
        if (res['error']){
          this.snackBar.open(res['error']['errors'][0]['msg'].toString(), '', {
            duration: 3000,
            verticalPosition:'bottom'
          })
        }else{

        
        this.product_id = res['data']._id;
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        // if (res['success']){
        //   this.dialogbox.close();
        //   window.location.replace('/admin/product');
        // }
        // var myFormPrice = new FormData();
        console.log(form.value['dongia'])
          // myFormPrice.append('dongia', form.value['dongia']);
          // console.log(myFormPrice)
          this.http.post(this.APIUrl + "/dongia/" + this.product_id + "/create", form.value, {headers: this.headers} )
          .subscribe(data=>{
            console.log(data)
            this.resetForm(form);
            if (data['success']){
                this.dialogbox.close();
                window.location.replace('/admin/product');
              }
          }, error=>{
            console.log(error)
          })
        }
          
      })
    
  }
  setPrice(gia: any){
    this.price = Number(gia);
    this.str_gia = gia;
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register Click');
  }

  resetForm( form ?: NgForm){
    if (form!= null)
    {
      form.resetForm();
    }
    this.service.formProduct={
      _id : '',
      ten : '',
      mota: '',
      danhmuc_id: '',
      thuonghieu_id: '',
      dongia: 1000,
    }
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
}
