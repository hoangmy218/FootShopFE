import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product-model';
import { CustomerService } from 'src/app/services/customer.service';
import * as moment from 'moment';
import * as $ from 'jquery';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private service: CustomerService,
    private router: Router
  ) {
    this.config = {
      itemsPerPage: 6,
      currentPage: 1,
      totalItems: this.product.length
    };
   }
   config: any;
   today : Date = new Date();
   discountValue : number = 0;

  product : any = [];
  @ViewChild('next') scroll;
  ngOnInit(): void {
    this.refreshProductList();
    $(window).scrollTop(0);
  }

  refreshProductList(){
    this.service.getProductList().subscribe(res=>{
      this.product = res['result'];
      console.log('result',res['result'])
    })
  }

  isExpirationExpired(discount) {
    // your date logic here, recommendnpm install moment --save;
    return ( moment(discount['ngaybd']).isBefore(moment(this.today)) 
            && moment(this.today).isBefore(moment(discount['ngaykt']))
            && discount['trangthai']==true) ;
  }

  
  pageChanged(event){
    this.config.currentPage = event;
    $(window).scrollTop(500);
    this.scroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }

  refreshPage(){
    window.location.reload();
  }


}
