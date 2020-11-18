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
import { ProductColor } from 'src/app/models/product-color-model';

@Component({
  selector: 'app-edit-product-details',
  templateUrl: './edit-product-details.component.html',
  styleUrls: ['./edit-product-details.component.scss']
})
export class EditProductDetailsComponent implements OnInit {

  // sizeList: Size[] = [];
  // colorList: Color[] = [];

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
   proColorID: string ="";
   productColor: ProductColor = new ProductColor();
   productSizeList: Size[] = [];
   imageListTemp : any[] = [];


  ngOnInit(): void {
    this.resetForm();
    this.productID = this.actRoute.snapshot.params['id'];
    this.proColorID = this.actRoute.snapshot.params['procolor'];
    console.log(this.proColorID)
        // this.resetForm();
    this.refreshProductColor();
    this.refreshProductDetail();

    
    this.refreshSizeList();
    this.refreshColorList();
    console.log(this.service.formProductDetail)
    this.addForm.get("items_value").setValue("yes");
    this.addForm.addControl('rows', this.rows);
    this.addForm.get("supplier").valueChanges.subscribe(val => {
      console.log(val)
      this.supplierID = val;
    })
  }

  refreshProductColor(){
    this.service.getProductColorDetails(this.proColorID).subscribe(res=>{
      console.log('pro color', res)
      this.productColor = res['data'];
      // this.productSizeList = res['data']['hinh'];
      this.productSizeList = JSON.parse(localStorage.getItem('size_arr'));
      this.imageListTemp = this.imageList = JSON.parse(localStorage.getItem('image_arr'));
      
      console.log('productColor', this.productColor)
      console.log('proSizeList', this.productSizeList)
      this.service.formProductDetail={
        _id : this.productColor._id,
        mausac_id: res['data'].mausac_id._id,
        kichco_id: this.productSizeList
      }
      if (this.imageList.length > 0){
        this.imageList.forEach(img=>{
          console.log('img', img)
          this.loadImage(img)
        })
      }
      // console.log('form',this.service.formProductDetail)
    })
  }

  compareColors(i1: Color, i2: Color) : boolean{
    // debugger;
    console.log('i1',i1, 'i2', i2)
    return  i1===i2;
  }

  compareSizes(i1: Size, i2: Size) : boolean{
    // debugger;
    console.log('i1',i1, 'i2', i2._id)
    return  i1===i2;
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

  loadForm(){
    this.service.formProductDetail={
      _id : this.productColor._id,
      mausac_id: this.productColor.mausac_id,
      kichco_id: this.productSizeList
    }
  }

  //START-- Dynamic add row

  resetForm( form ?: NgForm){
    if (form!= null)
    {
      form.resetForm();
    }
    this.service.formProductDetail={
      _id : this.productColor.mausac_id,
      mausac_id: this.productColor.mausac_id,
      kichco_id: this.productSizeList
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
    // console.log(this.filedata)
    console.log('file', this.filedata)
    this.http.post(this.APIUrl + "/hinhanh/upload", myFormData, {headers: headers})
    .subscribe(data => {
      console.log(data);
      this.imageList.push(data['hinhanh']);

      this.service.formColor.hinh= data['hinhanh'].hinh.toString();            
    });
  }

  loadImage(img_id: number){
    this.service.getImage(img_id).subscribe(res=>{
      const li: HTMLLIElement = this.renderer.createElement('li');

      const img: HTMLImageElement = this.renderer.createElement('img');
      console.log('res data hinh', res['data']['hinh'])
      img.src = res['data']['hinh'];
      this.renderer.addClass(img, 'product-image');

      const a: HTMLAnchorElement = this.renderer.createElement('a');
      a.innerText = 'Xóa';
      this.renderer.addClass(a, 'delete-btn');
      a.addEventListener('click', this.deleteProductImage.bind(this, res['data']['_id'], a));

      this.renderer.appendChild(this.image.nativeElement, li);
      this.renderer.appendChild(li, img);
      this.renderer.appendChild(li, a);
    })
    
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
      var stt = this.imageListTemp.length;
      formData.append('stt', stt.toString())
      
      this.http.post(this.APIUrl + "/hinhanh/upload", formData, {headers: headers}).subscribe(
        res => {
          console.log('img', productImage)
          if (res['success']== true) {
            this.imageListTemp.push(res['hinhanh']['_id']);
            // this.imageList.push(res['hinhanh']['_id']);
            console.log('imglidt temp', this.imageListTemp)
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
    
    // this.service.deleteImage(image_id).subscribe(
    //   res => {
        a.parentElement.remove();
        // const index: number = this.imageList.indexOf(image_id);
        const index: number = this.imageListTemp.indexOf(image_id);
        if (index !== -1) {
            this.imageListTemp.splice(index, 1);
        } 
        // console.log('imgList af del', this.imageList)
        console.log('imgList tmp af del', this.imageListTemp)

    //   },
    //   err => this.error = err
    // );
  }


  onSubmit(form :NgForm){
    console.log(form.value);
    console.log(this.imageList);
    let productColor : any = {};
    productColor.sanpham_id = this.productID;
    productColor.mausanpham_id = this.proColorID; //them
    productColor.mausac_id = form.value.mausac_id;
    productColor.hinh = this.imageListTemp;
    this.service.updateProductColor(productColor).subscribe(res=>{
      console.log(res)
      const mausanpham_id = res['data']['_id'];
      let sizeList : any = {};
      sizeList.kichco = form.value.kichco_id;
      console.log(mausanpham_id)
      this.service.updateProductListSize(mausanpham_id, sizeList).subscribe(res=>{
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
  }

  //END -- upload image
  public sizeList: { [id: string]: any; } = {};    
  public colorList: { [id: string]: any; } = {};  


  refreshSizeList(){
    this.service.getSizeList().subscribe(res=>{
      res['data'].forEach(element => {
        this.sizeList[element._id] = element.ten;
      });
      console.log(this.sizeList)
      // this.sizeList = res['data'];
    })
  }

  refreshColorList(){
    this.service.getColorEditProduct(this.proColorID).subscribe(res=>{
      // this.colorList = res['data'];
      // console.log(this.colorList)
      res['data'].forEach(element => {
        this.colorList[element._id] = element.ten;
        
      });
      console.log(this.colorList)
    })
  }
}