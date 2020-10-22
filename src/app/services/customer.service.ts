import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand-model';
import { Category } from '../models/category-model';
import { Product } from '../models/product-model';
import {CartItem} from '../models/cart-item-model';
import { Address } from '../models/address-model';
import { PayStripe } from '../models/paystripe-model';
import { OrderForm } from '../models/order-form-model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor( private http: HttpClient) { }

  readonly cus_APIUrl = environment.customer_apiUrl;

  readonly pb_APIUrl = environment.public_apiUrl;

  token : string = localStorage.getItem('token');
  headers: {}={'Authorization': 'Bearer '+this.token};
  public formOrder : OrderForm = new OrderForm();



  //LANDING
  getBrandList(): Observable<Brand[]>{
    return this.http.get<Brand[]>(this.pb_APIUrl+"/brand");
  }

  getCategoryList(): Observable<Category[]>{
    return this.http.get<Category[]>(this.pb_APIUrl + '/category');
  }

  getProductList(): Observable<Product[]>{
    return this.http.get<Product[]>(this.pb_APIUrl+"/product");
  }

  getProductDetails(pro_id: string, clr_id: string): Observable<any>{
    return this.http.get<any>(this.pb_APIUrl +'/'+ pro_id +'/' + clr_id + "/details");
  }

  //CART

  getCartList():Observable<any>{
    return this.http.get<any>(this.cus_APIUrl + "/giohang/list" , {headers :this.headers});
  }

  getShortCartList(): Observable<CartItem[]>{
    return this.http.get<CartItem[]>(this.cus_APIUrl + "/giohang/shortlist" , {headers :this.headers});
  }

  addToCart(cartItem: CartItem){
    return this.http.post(this.cus_APIUrl + "/giohang/create", cartItem , {headers :this.headers});
  }

  getQuantity(pro_id: string): Observable<any>{
    return this.http.get<any>(this.pb_APIUrl + "/quantity/"+ pro_id);
  }

  updateCart(item_id:string, cartItem: CartItem){
    return this.http.post(this.cus_APIUrl + "/giohang/"+ item_id + "/update", cartItem , {headers :this.headers});
  }

  deleteFromCart(item_id: number){
    return this.http.delete(this.cus_APIUrl + "/giohang/"+ item_id + "/delete", {headers :this.headers});
  }

  //ADDRESS

  addAddress(address: Address){
    return this.http.post(this.cus_APIUrl + "/diachi/create", address, {headers :this.headers});
  }

  updateAddress(address: Address){
    return this.http.put(this.cus_APIUrl + "/diachi/update/" + address._id, address, {headers :this.headers});
  }

  getAddress():Observable<Address[]>{
    return this.http.get<Address[]>(this.cus_APIUrl + "/diachi/list", {headers :this.headers});
  }

  getAddressDetails(id: string):Observable<Address>{
    return this.http.get<Address>(this.cus_APIUrl + "/diachi/get/"+id, {headers :this.headers});
  }

  deleteAddress(id: string){
    return this.http.delete(this.cus_APIUrl + "/diachi/del/"+id , {headers :this.headers});
  }

  

  // DELIVERY 
  getDelivery():Observable<any>{
    return this.http.get<any>(this.pb_APIUrl + "/htvc");
  }

  getDeliveryDetails(htvc_id: number):Observable<any>{
    return this.http.get<any>(this.pb_APIUrl + "/htvc/"+htvc_id);
  }

  //PAYMENT
  getPayment():Observable<any[]>{
    return this.http.get<any[]>(this.pb_APIUrl + '/httt');
  }

  payWithStripe(paystripe: PayStripe){
    return this.http.post(this.pb_APIUrl+"/payWithStripe", paystripe);
  }

  addOrder(){
    return this.http.post(this.cus_APIUrl+"/donhang/create", this.formOrder , {headers :this.headers});
  }

  saveOrder(orderForm: OrderForm){
    this.formOrder = orderForm;
  }
}