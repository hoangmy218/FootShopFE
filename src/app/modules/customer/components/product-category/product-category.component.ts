import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss']
})
export class ProductCategoryComponent implements OnInit {

  constructor(
    private _router: Router,
    private service: CustomerService,
    private actRoute: ActivatedRoute
  ) { }
  cateID: any;
  cate: any = {};
  product: any = [];
  today : Date = new Date();

  ngOnInit(): void {
    this.cateID = this.actRoute.snapshot.params['id'];
    console.log(this.cateID);
    // this.refreshCateDetails();
    // this.refreshProductList();
    this.actRoute.params.subscribe(routeParams=>{
      this.refreshCateDetails(routeParams.id);
      this.refreshProductList(routeParams.id);
      console.log('params', routeParams)
      // this.refreshProductDetail(routeParams.pro_id, routeParams.clr_id);
      
    })
    
  }

  isExpirationExpired(discount) {
    // your date logic here, recommendnpm install moment --save;
    return ( moment(discount['ngaybd']).isBefore(moment(this.today)) 
            && moment(this.today).isBefore(moment(discount['ngaykt']))
            && discount['trangthai']==true) ;
  }
  refreshCateDetails(cate_id){
    this.service.getCategoryDetails(cate_id).subscribe(res=>{
      this.cate = res['data'];
      console.log(res)
    })
  }

  
  refreshProductList(cate_id){
    this.service.getProductCategoryList(cate_id).subscribe(res=>{
      this.product = res['result'];
      console.log('result',res['result'])
    })
  }

}
