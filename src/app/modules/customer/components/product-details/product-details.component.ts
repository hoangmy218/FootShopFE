import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import 'hammerjs';
import * as moment from 'moment';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartItem } from 'src/app/models/cart-item-model';
import {ProductColor} from '../../../../models/product-color-model';
import { Product } from 'src/app/models/product-model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as $ from 'jquery';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductImageComponent } from './product-image/product-image.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productImages = [];
  // proImage : any = { url: ""};
  selectedImage: string;
  imageSize = 430;
  imageHeight = 600;
  qty : number = 1;  
 
  CommentForm : FormGroup;
  CartForm : FormGroup;
  // ProductID: string = '';
  // ColorID: string = '';
  product : Product = new Product();
  imageList : any;
  colorList: any;
  sizeList: any;
  productcolor: any ={};
  ratingAvg : number = 0;
  // productcolor:  ProductColor = new ProductColor();
  dongia: any = {
    dongia: 0,
    _id: "",
    sanpham_id: "",
    ngay: ""
  }
  commentList : any = {};

  productDetailsID: string = '';
  proID: string ='';
  proColorID :string = '';
  today : Date = new Date();


  constructor(
    private __router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    private service: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar,
    public _authService: AuthService,
    private dialog:MatDialog,
  ) {
    // this.refreshProductDetail();
   }

  ngOnInit(): void {
    this.resetCartForm();
    
    const ProductID = this.actRoute.snapshot.params['pro_id'];
    const ColorID = this.actRoute.snapshot.params['clr_id'];
    console.log(ProductID);
    this.proID = ProductID;
    console.log(ColorID);
    
    //RELOAD COMPONENT WHEN PARAM CHANGE
    this.actRoute.params.subscribe(routeParams=>{
      this.refreshCommentList();
      this.resetCommentForm();
      console.log('params', routeParams)
      this.refreshProductDetail(routeParams.pro_id, routeParams.clr_id);
      
    });

    setInterval(()=>{
      $('.details__top-color-img').each(function(){
        var id = $(this).attr('id');
        // console.log('id', id)
        if (window.location.pathname.includes(id)){
          // console.log('add')
          $(this).addClass('active');
        }else{
          $(this).removeClass('active');
          // console.log('remove')
        }

      })
    }, 200)

    this.refreshProductDetail(ProductID, ColorID);
    // this.loadUserDetail(routeParams.id);
 
  }
  arrayOne(n: number): any[] {
    return Array(n);
  }

  arrayStar(n: number): any[] {
    return Array(Math.floor(n));
  }

  isMiddle(n: number): boolean{
    if (typeof n !='number')
      return false;

    return (n >= 0.0) && (Math.floor(n) === n) && n !== Infinity;
  }


  refreshProductDetail(product_id: string, color_id: string){
    this.service.getProductDetails(product_id, color_id).subscribe(res=>{
      console.log('resdetials',res)
      // debugger;
      this.product = res['data'];
      this.imageList = res['hinh'];
      this.productImages = [];
      // this.threeSixtyImages  = [];
      console.log('img', this.imageList);
      this.imageList.forEach(element => {
        let proImage : any = {};
        proImage.url =  element['hinh'];
        this.productImages.push(proImage);
      });
      this.colorList = res['list_procolor'];
      this.sizeList = res['list_size'];
      this.qty = res['list_size'][0].soluong;
      this.productcolor = res['procolor'];
      this.proColorID = res['procolor']['_id'];
      this.CartForm.controls['sku'].setValue(this.sizeList[0]['_id']);
      console.log('id', this.sizeList[0]['_id'] )
      this.productDetailsID = this.sizeList[0]['_id'];
      console.log('sku', this.CartForm.controls['sku'].value);
      this.dongia = res['dongia'][0];
    })
  }
  rating_value : number = 0;
  x: number = 1;
  y: number = 50;

  account_validation_messages = {
    'comment': [
      { type: 'required', message: 'Nhập bình luận' },
      { type: 'minlength', message: 'Nội dung bình luận từ 10 - 100 ký tự' },
      { type: 'maxlength', message: 'Nội dung bình luận từ 10 - 100 ký tự'}
    ]
  }

  cart_validation_messages = {
    'quantity': [
      {type: 'required', message: 'Nhập số lượng'},
      {type: 'min', message: 'Số lượng ít nhất là 1'},
      {type: 'max', message: 'Số lượng không hợp lệ'},
      {type: 'pattern', message: 'Số lượng không hợp lệ'}
    ]
  }
  changeimage(image: string){
    this.selectedImage = image;
  }

  resetCommentForm(){
    this.CommentForm = this.fb.group({
      comment: new FormControl('', Validators.compose([
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(10)
      ]))
    })
  }

  resetCartForm(){
    this.CartForm = this.fb.group({
      quantity: new FormControl('', Validators.compose([
        Validators.required,
        Validators.min(this.x),
        (control: AbstractControl) => Validators.max(this.qty)(control)
        // Validators.max(this.qty)
      ])),
      sku: new FormControl('')
    })
  }

  isExpirationExpired(discount) {
    // your date logic here, recommendnpm install moment --save;
    return ( moment(discount['ngaybd']).isBefore(moment(this.today)) 
            && moment(this.today).isBefore(moment(discount['ngaykt']))
            && discount['trangthai']==true) ;
  }

  onComment(){
    console.log('submit')
    console.log(this.rating_value)
    console.log(this.CommentForm.controls['comment'].value)
    console.log(this.CommentForm.valid)
    console.log(typeof(this.rating_value))
    let comment : any = {};
    comment.noidung = this.CommentForm.controls['comment'].value;
    comment.danhgia = this.rating_value;
    comment.ngaybl = new Date();
    this.service.addComment(this.proID, comment).subscribe(res=>{
      console.log('res', res)
      this.snackBar.open(res['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })
      if (res['success']){
        this.resetCommentForm();
        // this.rating_value = 0;
        this.onRating(0);
      }
    })
  }
  refreshCommentList(){
    this.service.getComment(this.proID).subscribe(res=>{
      console.log('cmt', res);
      this.commentList = res['data'];
      res['avg'].forEach(element => {
        if (this.proID == element['_id']){
          this.ratingAvg = element['danhgiaAvg'];
        }
      });
    })
  }


  onRating($event){
    this.rating_value = $event;
    console.log($event)

  }

  onChange(){
    // console.log('qty fc',this.CartForm.controls['quantity'].value)
    // console.log('qty max', this.qty)
    if (this.CartForm.controls['quantity'].value > this.qty){
      //  this.qty = 50;
      //  console.log('qty', this.qty)
    }

  }
  onAddToCart(){
    let cartItem: CartItem = new CartItem();
    console.log('sku', this.CartForm.controls['sku'].value);
    cartItem.ctsp_id = this.CartForm.controls['sku'].value;
    cartItem.soluongdat = this.CartForm.controls['quantity'].value;
    console.log(cartItem)
    this.service.addToCart(cartItem).subscribe(res=>{
      console.log(res)
      this.snackBar.open(res['message'].toString(), '', {
        duration: 3000,
        verticalPosition:'bottom'
      })
    })
  }
  selected : string = 'Chọn kích cỡ';

  selectOption(id: string) {
    //getted from event
    console.log('id', id);
    this.productDetailsID = id;
    console.log('sku', this.CartForm.controls['sku'].value);
    //getted from binding
    // console.log('selected', this.selected)
    this.service.getQuantity(id).subscribe(res=>{
      // console.log(res['data'])
      this.qty =  res['data'].soluong;
      // console.log('so qty', this.qty)
    })
  }
  
  onImage(){
    console.log(this.proColorID)
    this.service.proColorID = this.proColorID;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus=true;
    dialogConfig.width = "50%";
    this.dialog.open(ProductImageComponent, dialogConfig);
  
  }

}
