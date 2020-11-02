import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand-model';
import { Category } from 'src/app/models/category-model';
import { CustomerService } from '../../../../services/customer.service';
import * as $ from 'jquery';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(
    private _service: CustomerService,
    private fb: FormBuilder,
    private _router: Router,
    private snackBar: MatSnackBar
  ) { }

  public pushedCates: {[id: string]: any;}={};
   BrandList : Brand[] = [];
   CategoryList: Category[] = [];

   SearchForm: FormGroup;

   account_validation_messages = {
     'search': [
       { type: 'required', message: 'Nhập từ khóa tìm kiếm' },
     ]
   }

  ngOnInit(): void {
    this.resetSearchForm();
    this.refeshCategoryList();
    this.refreshBrandList();
    setInterval(()=>{
      $('a').each(function(){
        var key = $(this).attr('routerLink');
        if (window.location.pathname.includes(key)){
          $(this).addClass('active');
        }else{
          $(this).removeClass('active');
        }
      })
    }, 500)

  }

  // resetForm(form ?: NgForm){
  //   if (form != null){
  //     form.resetForm();
  //   }
  //   this._service.SearchForm={
  //     search: ''
  //   }
    
  // }
  resetSearchForm(){
    this.SearchForm = this.fb.group({
      search: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
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

  onSearch(){
    this._router.navigate(['/search/'+this.SearchForm.controls['search'].value]);
    let search: any = {};
    
    search.ten = this.SearchForm.controls['search'].value;
    this._service.searchProduct(search).subscribe(res=>{
      console.log(res)
    })
  }

}
