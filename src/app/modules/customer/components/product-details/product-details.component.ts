import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import 'hammerjs';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartItem } from 'src/app/models/cart-item-model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  productImages = [ {url: '../../../../../assets/img/5_collectionb1.jpg'},
                    {url: '../../../../../assets/img/2_collection11.jpg'},
                    {url: "../../../../../assets/img/5_collection1.jpg"}]

  selectedImage: string;
  imageSize = 430;
  qty : number = 1;  
 
  CommentForm : FormGroup;
  CartForm : FormGroup;
  ProductID: string = '';
  ColorID: string = '';
  product : any;
  imageList : any;
  colorList: any;
  sizeList: any;
  productcolor: any;
  dongia: any;

  constructor(
    private __router: Router,
    private fb: FormBuilder,
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    private service: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetCartForm();
    this.resetCommentForm();
    this.ProductID = this.actRoute.snapshot.params['pro_id'];
    this.ColorID = this.actRoute.snapshot.params['clr_id'];
    console.log(this.ProductID);
    this.refreshProductDetail();
 
  }

  refreshProductDetail(){
    this.service.getProductDetails(this.ProductID, this.ColorID).subscribe(res=>{
      console.log(res)
      this.product = res['data'];
      this.imageList = res['hinh'];
      this.colorList = res['list_procolor'];
      this.sizeList = res['list_size'];
      this.productcolor = res['procolor'];
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

  onComment(){
    console.log('submit')
    console.log(this.rating_value)
    console.log(this.CommentForm.valid)
    console.log(typeof(this.rating_value))
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
    // console.log('id', id);
    //getted from binding
    // console.log('selected', this.selected)
    this.service.getQuantity(id).subscribe(res=>{
      // console.log(res['data'])
      this.qty =  res['data'].soluong;
      // console.log('so qty', this.qty)
    })
  }

}
