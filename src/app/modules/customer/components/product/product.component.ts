import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(
    private service: CustomerService,
    private router: Router
  ) { }

  product : any;
  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList(){
    this.service.getProductList().subscribe(res=>{
      this.product = res['result'];
      console.log('result',res['result'])
    })
  }

}
