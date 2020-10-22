import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private service: AuthService,
    private _router: Router
  ) { }
  url_key = '';

  ngOnInit(): void {
    $('.sidebar-btn').click(function(){
      $('.wrapper').toggleClass("collapse");
    })
    this.url_key=this._router.url;
    // console.log('uk', this.url_key)

    // $('#category').removeClass('active');
    // $('#brand').removeClass('active');
    // $('#size').removeClass('active');
    // $('#color').removeClass('active');
    // $('#product').removeClass('active');
    // $('#order').removeClass('active');
    // $('#stock').removeClass('active');
    // $('#chart').removeClass('active');
    
    
    // if (this._router.url.includes('/category')){
    //   $('#category').addClass('active');
    // }
    // if (this._router.url.includes('/brand')){
    //   $('#brand').addClass('active');
    // }
    // if (this._router.url.includes('/size')){
    //   $('#size').addClass('active');
    // }
    // if (this._router.url.includes('/color')){
    //   $('#color').addClass('active');
    // }

    // if (this._router.url.includes('/product')){
    //   $('#product').addClass('active');
    // }
    // if (this._router.url.includes('/order')){
    //   $('#order').addClass('active');
    // }
    // if (this._router.url.includes('/stock')){
    //   $('#stock').addClass('active');
    // }
    // if (this._router.url.includes('/chart')){
    //   $('#chart').addClass('active');
    // }

    setInterval(()=>{
      $('.menu-btn').each(function(){
        var key = $(this).attr('routerLink');
        if (window.location.pathname.includes(key)){
          $(this).addClass('active');
        }else{
          $(this).removeClass('active');
        }
      })
    }, 500)

  }

 

  status: boolean = false;
  clickEvent(){
      this.status = !this.status;       
  }

  onLogout(){
    this.service.logout();
  }

}
