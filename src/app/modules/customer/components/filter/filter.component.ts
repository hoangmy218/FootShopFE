import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand-model';
import { Category } from 'src/app/models/category-model';
import { CustomerService } from '../../../../services/customer.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    private _service: CustomerService
  ) { }
  public pushedCates: {[id: string]: any;}={};
   BrandList : Brand[] = [];
   CategoryList: Category[] = [];

  ngOnInit(): void {
    this.refeshCategoryList();
    this.refreshBrandList();

  }

  refreshBrandList(){
   
    this._service.getBrandList().subscribe(res=>{
      this.BrandList = res['data'];
      console.log(res)
    })
    
  }
  
  refeshCategoryList(){
    this._service.getCategoryList().subscribe(result=>{
      this.CategoryList = result['data'];
      console.log(result)
    })
  }

}
