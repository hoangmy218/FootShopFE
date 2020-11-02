import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {


  constructor(
    private _router: Router,
    private service: CustomerService,
    private actRoute: ActivatedRoute
  ) { }
  cateID: any;
  cate: any = {};
  product: any = [];

  ngOnInit(): void {
    this.cateID = this.actRoute.snapshot.params['key'];
    console.log(this.cateID);
    // this.refreshCateDetails();
    // this.refreshProductList();
    this.actRoute.params.subscribe(routeParams=>{
      // this.refreshCateDetails(routeParams.key;
      this.refreshProductList(routeParams.key);
      console.log('params', routeParams)
      // this.refreshProductDetail(routeParams.pro_id, routeParams.clr_id);
      
    })
    
  }
  refreshCateDetails(cate_id){
    this.service.getCategoryDetails(cate_id).subscribe(res=>{
      this.cate = res['data'];
      console.log(res)
    })
  }

  
  refreshProductList(cate_id){
    let search: any = {};
    
    search.ten = cate_id;
    this.service.searchProduct(search).subscribe(res=>{
      this.product = res['result'];
      console.log('result',res['result'])
    })
  }

  onSearch(){
    // this._router.navigate(['/search/'+this.SearchForm.controls['search'].value]);
    let search: any = {};
    
    search.ten = this.cateID;
    this.service.searchProduct(search).subscribe(res=>{
      this.product = res['result'];
      console.log('result',res['result'])
    })
  }

}
