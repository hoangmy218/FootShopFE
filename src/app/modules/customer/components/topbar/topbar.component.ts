import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { Brand } from 'src/app/models/brand-model';
import { Category } from 'src/app/models/category-model';
import { AuthService } from 'src/app/services/auth.service';
import { CustomerService } from 'src/app/services/customer.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  constructor(
    public service: AuthService,
    private _service: CustomerService,
    private _router: Router
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
    this.username.next('');
    console.log(localStorage.getItem('username'))
    if (localStorage.getItem('username')!= null){
      this.username.next(localStorage.getItem('username'));
      console.log(this.username)
    }
  }
  
  isUser(){
    // let user : any;
    // localStorage.getItem('role');
    if (localStorage.getItem('role') == null || localStorage.getItem('role') == 'admin'){
      return false;
    }else {
      return true;
    }
  }
  
  isAdmin(){
    if (localStorage.getItem('role') == null || localStorage.getItem('role') == 'customer'){
      return false;
    }else {
      return true;
    }
  }

  onLogout(){
    
    this.service.logout();
    localStorage.clear();
    this._router.navigate(['/']);
  }
  toggleMenu(){
    $('#menu').toggleClass('show-menu');
  }
  showSubmenu(sub){
      $('.'+sub).toggleClass('show-submenu');
  }



  

}
