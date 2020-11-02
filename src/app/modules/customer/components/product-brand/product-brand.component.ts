import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss']
})
export class ProductBrandComponent implements OnInit {

  constructor(
    private _router: Router,
    private service: CustomerService,
    private actRoute: ActivatedRoute
  ) { }
  brandID: any;
  brand: any = {};
  product: any = [];

  ngOnInit(): void {
    this.brandID = this.actRoute.snapshot.params['id'];
    console.log(this.brandID);
    // this.refreshbrandDetails();
    // this.refreshProductList();
    this.actRoute.params.subscribe(routeParams=>{
      this.refreshBrandDetails(routeParams.id);
      this.refreshProductList(routeParams.id);
      console.log('params', routeParams)
      // this.refreshProductDetail(routeParams.pro_id, routeParams.clr_id);
      
    })
    
  }
  refreshBrandDetails(brand_id){
    this.service.getBrandDetails(brand_id).subscribe(res=>{
      this.brand = res['data'];
      console.log(res)
    })
  }

  
  refreshProductList(brand_id){
    this.service.getProductBrandList(brand_id).subscribe(res=>{
      this.product = res['result'];
      console.log('result',res['result'])
    })
  }

}
