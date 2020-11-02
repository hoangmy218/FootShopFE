import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Brand } from 'src/app/models/brand-model';
import { Category } from 'src/app/models/category-model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    public service: AuthService,
    private _service: CustomerService
  ) { }
  username:Subject<string> = new BehaviorSubject('');
  // public username: string = '';
  brandList: Brand[] = [];
  categoryList: Category[] = [];

  ngOnInit(): void {
    this.refreshUser();
    this.refreshBrandList();
    this.refeshCategoryList();
    
  }

  refreshBrandList(){
   
    this._service.getBrandList().subscribe(res=>{
      this.brandList = res['data'];
      console.log(res)
    })
    
  }
  
  refeshCategoryList(){
    this._service.getCategoryList().subscribe(result=>{
      this.categoryList = result['data'];
      console.log(result)
    })
  }

  refreshUser(){
    this.service.setProfile();
    this.username.next(localStorage.getItem('user_name'));
    console.log(this.username)
  }

  onLogout(){
    
    this.service.logout();
    localStorage.clear();
  }



  

}
