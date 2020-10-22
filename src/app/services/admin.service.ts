import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand } from '../models/brand-model';
import { Category } from '../models/category-model';
import { Color } from '../models/color-model';
import { Product } from '../models/product-model';
import { Size } from '../models/size-model';
import { Order } from '../models/order-model';
import {Stock} from '../models/stock-model';
import { ProductDetails} from '../models/product-details-model';
import {Supplier } from '../models/supplier-model';
import { StockItem } from '../models/stock-item.model';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor( private http: HttpClient) { }
  formData : Brand;
  formCate: Category;
  formSize: Size;
  formColor: Color;
  formProductDetail: any;
  
  readonly APIUrl = environment.admin_apiUrl;

  token : string = localStorage.getItem('token');
  headers :  {}= { 'Authorization': 'Bearer '+ this.token };

  //BRAND
  getBrandList(): Observable<Brand[]>{
    return this.http.get<Brand[]>(this.APIUrl + "/thuonghieu/list", {headers :this.headers});
  }

  addBrand(brand: Brand){
    return this.http.post(this.APIUrl + "/thuonghieu/create", brand, {headers :this.headers});
  }

  deleteBrand(brand_id: number){
    return this.http.delete(this.APIUrl+"/thuonghieu/del/"+brand_id, {headers :this.headers});
  }

  updateBrand(brand: Brand){
    return this.http.put(this.APIUrl + "/thuonghieu/update/" + brand._id, brand,  {headers :this.headers});
  }

  private _listeners = new Subject<any>();
  listen(): Observable<any>{
    return this._listeners.asObservable();
  }
  filter(filterBy: string){
    this._listeners.next(filterBy);
  }

  //CATEGORY
  getCategoryList(): Observable<Category[]>{
    return this.http.get<Category[]>(this.APIUrl + "/danhmuc/list", {headers :this.headers});
  }

  addCategory(category: Category){
    return this.http.post(this.APIUrl + "/danhmuc/create", category, {headers :this.headers});
  }

  deleteCategory(category_id: number){
    return this.http.delete(this.APIUrl+"/danhmuc/del/"+category_id, {headers :this.headers});
  }

  updateCategory(category: Category){
    return this.http.put(this.APIUrl + "/danhmuc/update/" + category._id, category,  {headers :this.headers});
  }

  //SIZE
  getSizeList(): Observable<Size[]>{
    return this.http.get<Size[]>(this.APIUrl + "/kichco/list", {headers :this.headers});
  }

  addSize(size: Size){
    return this.http.post(this.APIUrl + "/kichco/create", size, {headers :this.headers});
  }

  deleteSize(size_id: number){
    return this.http.delete(this.APIUrl+"/kichco/del/"+ size_id, {headers :this.headers});
  }

  updateSize(size: Size){
    return this.http.put(this.APIUrl + "/kichco/update/" + size._id, size,  {headers :this.headers});
  }

  //COLOR
  getColorList(): Observable<Color[]>{
    return this.http.get<Color[]>(this.APIUrl + "/mausac/list", {headers :this.headers});
  }

  addColor(color: Color){
    return this.http.post(this.APIUrl + "/mausac/create", color, {headers :this.headers});
  }

  deleteColor(color_id: number){
    return this.http.delete(this.APIUrl+"/mausac/del/"+ color_id, {headers :this.headers});
  }

  updateColor(color: Color){
    return this.http.put(this.APIUrl + "/mausac/update/" + color._id, color,  {headers :this.headers});
  }

  //PRODUCT
  formProduct: Product;
  getProductList(): Observable<Product[]>{
    return this.http.get<Product[]>(this.APIUrl + "/sanpham/list", {headers :this.headers});
  }

  addProduct(product: Product){
    return this.http.post(this.APIUrl + "/sanpham/create", product, {headers :this.headers});
  }

  deleteProduct(product_id: number){
    return this.http.delete(this.APIUrl+"/sanpham/del/"+ product_id, {headers :this.headers});
  }

  updateProduct(product: Product){
    return this.http.put(this.APIUrl + "/sanpham/update/" + product._id, product,  {headers :this.headers});
  }

  getProductDetail(product_id: string){
    return this.http.get(this.APIUrl + "/sanpham/get/"+product_id,  {headers :this.headers});
  }


  //PRODUCT COLOR
  addProductColor(productcolor: any){
    return this.http.post(this.APIUrl + "/mausanpham/create", productcolor, {headers: this.headers});
  }

  

  //PRICE
  getNewPrice(product_id: string): Observable<any>{
    return this.http.get(this.APIUrl + "/dongia/"+ product_id+"/new", {headers :this.headers});
  }
  readonly p_APIUrl = environment.public_apiUrl;
  //IMAGE
  getImage(image_id: number): Observable<any>{
    return this.http.get(this.p_APIUrl + "/hinhanh/get/"+image_id);
  }

  deleteImage(image_id: number){
    return this.http.delete(this.p_APIUrl + "/hinhanh/del/"+image_id);
  }

  //ORDER
  getOrderList(): Observable<Order[]>{
    return this.http.get<Order[]>(this.APIUrl + "/donhang/list", {headers :this.headers});
  }

  cancelOrder(order_id: number){
    return this.http.put(this.APIUrl + "/donhang/" + order_id + "/cancel", null,  {headers :this.headers});
  }

  confirmOrder(order_id: number){
    return this.http.put(this.APIUrl + "/donhang/" + order_id + "/confirm",null,  {headers :this.headers});
  }

  shipOrder(order_id: number){
    return this.http.put(this.APIUrl + "/donhang/" + order_id + "/ship", null,  {headers :this.headers});
  }

  completeOrder(order_id: number){
    return this.http.put(this.APIUrl + "/donhang/" + order_id + "/complete",null,  {headers :this.headers});
  }
  

  getOrderDetails(order_id: string): Observable<any>{
    return this.http.get<Order[]>(this.APIUrl + "/donhang/details/"+order_id, {headers :this.headers});
  }


  //STOCK
  formStock: Stock;
  getStockList(): Observable<Stock[]>{
    return this.http.get<Stock[]>(this.APIUrl + "/phieunhap/list", {headers :this.headers});
  }

  addStock(stock: Stock){
    return this.http.post(this.APIUrl + "/phieunhap/create", stock, {headers :this.headers});
  }

  deleteStock(stock_id: number){
    return this.http.delete(this.APIUrl+"/phieunhap/del/"+ stock_id, {headers :this.headers});
  }

  updateStock(stock: Stock){
    return this.http.put(this.APIUrl + "/phieunhap/update/" + stock._id, stock,  {headers :this.headers});
  }

  addProductStock(stock_id: string, stockItem: StockItem){
    return this.http.post(this.APIUrl + "/phieunhap/"+ stock_id +"/add", stockItem,  {headers :this.headers});
  }

  addProductStockList(stock_id: string, list: any){
    return this.http.post(this.APIUrl + "/phieunhap/"+ stock_id +"/add-list-pro", list,  {headers :this.headers});
  }

  saveStock(stock_id: string){
    // return this.http.put(this.APIUrl+"/phieunhap/"+ stock_id + "/save", {headers :this.headers});
    return this.http.put(this.APIUrl + "/phieunhap/" + stock_id + "/save", null,  {headers :this.headers});
  }

   //PRODUCT DETAILS
   formProductDetails: ProductDetails;
   getProductDetailsList(): Observable<ProductDetails[]>{
     return this.http.get<ProductDetails[]>(this.APIUrl + "/chitietsanpham/list", {headers :this.headers});
   }
 
   addProductDetails(prodetail: ProductDetails){
     return this.http.post(this.APIUrl + "/chitietsanpham/create", prodetail, {headers :this.headers});
   }
 
   deleteProductDetails(prodetail_id: number){
     return this.http.delete(this.APIUrl+"/chitietsanpham/del/"+ prodetail_id, {headers :this.headers});
   }
 
   updateProductDetails(prodetail: ProductDetails){
     return this.http.put(this.APIUrl + "/chitietsanpham/update/" + prodetail._id, prodetail,  {headers :this.headers});
   }

   getColorEProduct(product_id: string): Observable<Color[]>{
     return this.http.get<Color[]>(this.APIUrl+"/mausac/"+product_id+"/list", {headers: this.headers});
   }

   addProductListSize(product_id: string, list:any){
     return this.http.post(this.APIUrl + "/chitietsanpham/"+product_id+"/add-list-size", list, {headers: this.headers});
   }


   //SUPPLIER
  formSupplier: Supplier;
  getSupplierList(): Observable<Supplier[]>{
    return this.http.get<Supplier[]>(this.APIUrl + "/nhacungcap/list", {headers :this.headers});
  }

  addSupplier(stock: Supplier){
    return this.http.post(this.APIUrl + "/nhacungcap/create", Supplier, {headers :this.headers});
  }

  deleteSupplier(Supplier_id: number){
    return this.http.delete(this.APIUrl+"/nhacungcap/del/"+ Supplier_id, {headers :this.headers});
  }

  updateSupplier(Supplier: Supplier){
    return this.http.put(this.APIUrl + "/nhacungcap/update/" + Supplier._id, Supplier,  {headers :this.headers});
  }   

  getSupplier(Supplier_id: number){
    return this.http.get(this.APIUrl+"/nhacungcap/get/"+ Supplier_id, {headers :this.headers});
  }



}
