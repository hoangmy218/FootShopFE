import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, Renderer2, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Color } from 'src/app/models/color-model';
import { Size } from 'src/app/models/size-model';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product-model';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-add-product-details',
  templateUrl: './add-product-details.component.html',
  styleUrls: ['./add-product-details.component.scss']
})
export class AddProductDetailsComponent implements OnInit {
  
  sizeList: Size[] = [];
  colorList: Color[] = [];

  addForm: FormGroup;

  rows: FormArray;
  itemForm: FormGroup;
  supplierID: string = '';

  selectedFile : File = null;

  // upload 2 
  productForm:FormGroup;
  error: string;
  uploadError: string;
  @ViewChild('image') private image: ElementRef;
  @Output() close = new EventEmitter();

  //Checkbox
  // task: Task = {
  //   name: 'Tất cả',
  //   completed: false,
  //   color: 'primary',
  //   subtasks: [
  //     {name: 'Primary', completed: false, color: 'primary'},
  //     {name: 'Accent', completed: false, color: 'accent'},
  //     {name: 'Warn', completed: false, color: 'warn'}
  //   ]
  // };

  // allComplete: boolean = false;

  constructor(
    public service: AdminService,
    private http: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private renderer: Renderer2,
    private actRoute: ActivatedRoute
  ) {
    this.addForm = this.fb.group({
      supplier: ['', Validators.required],
      items_value: ['no', Validators.required]
    });

    this.rows = this.fb.array([]);
   }

   imageList: any[] = [];
   product : Product = new Product();
   productID: string="";

  ngOnInit(): void {
    this.productID = this.actRoute.snapshot.params['id'];
    this.refreshProductDetail();
    this.resetForm();
    this.refreshSizeList();
    this.refreshColorList();
    this.addForm.get("items_value").setValue("yes");
    this.addForm.addControl('rows', this.rows);
    this.addForm.get("supplier").valueChanges.subscribe(val => {
      console.log(val)
      this.supplierID = val;
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

  //START-- Dynamic add row

  resetForm( form ?: NgForm){
    if (form!= null)
    {
      form.resetForm();
    }
    this.service.formProductDetail={
      _id : '',
      mausac_id: '',
      kichco_id: ''
    }
  }

  onAddRow() {
    this.rows.push(this.createItemFormGroup());
  }

  createItemFormGroup(): FormGroup {
    return this.fb.group({
      photo: null,
      link: null
    });
  }

  //END-- Dynamic add row


  //START -- upload image
  readonly APIUrl = environment.public_apiUrl;
  token = localStorage.getItem('token');

  filedata:any;
  fileEvent(e){
      this.filedata = e.target.files[0];
  }
  
  processFile(photo: any){
    this.filedata = <File>photo.files[0];
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('file', this.filedata);
    console.log(this.filedata)
    this.http.post(this.APIUrl + "/hinhanh/upload", myFormData, {headers: headers})
    .subscribe(data => {
      console.log(data);
      this.imageList.push(data['hinhanh']);

      this.service.formColor.hinh= data['hinhanh'].hinh.toString();            
    });
  }

  
  //upload images 2
  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      const productImage = event.target.files[0];

      const formData = new FormData();
      formData.append('file', productImage);
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      this.http.post(this.APIUrl + "/hinhanh/upload", formData, {headers: headers}).subscribe(
        res => {
          if (res['success']== true) {
            this.imageList.push(res['hinhanh']['_id']);
            console.log('imglidt', this.imageList)
            this.uploadError = '';

            const li: HTMLLIElement = this.renderer.createElement('li');

            const img: HTMLImageElement = this.renderer.createElement('img');
            img.src = res['hinhanh']['hinh'];
            this.renderer.addClass(img, 'product-image');

            const a: HTMLAnchorElement = this.renderer.createElement('a');
            a.innerText = 'Xóa';
            this.renderer.addClass(a, 'delete-btn');
            a.addEventListener('click', this.deleteProductImage.bind(this, res['hinhanh']['_id'], a));

            this.renderer.appendChild(this.image.nativeElement, li);
            this.renderer.appendChild(li, img);
            this.renderer.appendChild(li, a);
          } else {
            this.uploadError = res['message'];
          }
        },
        err => this.error = err
      );
    }
  }

  deleteProductImage(image_id, a) {
    
    this.service.deleteImage(image_id).subscribe(
      res => {
        a.parentElement.remove();
        const index: number = this.imageList.indexOf(image_id);
        if (index !== -1) {
            this.imageList.splice(index, 1);
        } 
        console.log('imgList af del', this.imageList)
      },
      err => this.error = err
    );
  }


  onSubmit(form :NgForm){
    console.log(form.value);
    console.log(this.imageList);
    let productColor : any = {};
    productColor.sanpham_id = this.productID;
    productColor.mausac_id = form.value.mausac_id;
    productColor.hinh = this.imageList;
    this.service.addProductColor(productColor).subscribe(res=>{
      console.log(res)
      const mausanpham_id = res['data']['_id'];
      let sizeList : any = {};
      sizeList.kichco = form.value.kichco_id;
      console.log(mausanpham_id)
      this.service.addProductListSize(mausanpham_id, sizeList).subscribe(res=>{
        console.log('res pls',res)
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        if (res['success']){
          window.location.replace('/admin/product/'+this.productID);
        }
      }, error=>{
        console.log(error)
      })
    })
    
    // console.log(this.service.formColor);
    // form.value['hinh'] = this.service.formColor.hinh;
    // // this.service.formColor.ten = form.value['ten'];
    // this.service.addColor(form.value).subscribe(res=>
    //   {
    //     this.resetForm(form);
    //     console.log(res)
    //     this.snackBar.open(res['message'].toString(), '', {
    //       duration: 3000,
    //       verticalPosition:'bottom'
    //     })
    //     if (res['success']){
    //       window.location.replace('/admin/product');
    //     }
    //   })
  }

  //END -- upload image


  refreshSizeList(){
    this.service.getSizeList().subscribe(res=>{
      this.sizeList = res['data'];
      console.log(this.sizeList)
    })
  }

  refreshColorList(){
    this.service.getColorEProduct(this.productID).subscribe(res=>{
      this.colorList = res['data'];
      // console.log(this.colorList)
    })
  }

  //SIZE CHECKBOX
  // updateAllComplete() {
  //   this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
  // }

  // someComplete(): boolean {
  //   if (this.task.subtasks == null) {
  //     return false;
  //   }
  //   return this.task.subtasks.filter(t => t.completed).length > 0 && !this.allComplete;
  // }

  // setAll(completed: boolean) {
  //   this.allComplete = completed;
  //   if (this.task.subtasks == null) {
  //     return;
  //   }
  //   this.task.subtasks.forEach(t => t.completed = completed);
  // }


}


