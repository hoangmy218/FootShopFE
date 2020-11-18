import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-relatedproduct',
  templateUrl: './relatedproduct.component.html',
  styleUrls: ['./relatedproduct.component.scss']
})
export class RelatedproductComponent implements OnInit {

  
  customOptions: any = {
    margin: 0,
    autoplay: true,
    dots: true,
    responsiveClass: true,
    nav: true,
    items: 1,
    navText: [ '', '' ],
    responsive: {
      480: {
       items: 1,
       nav: true
     },
      768: {
       items: 2,
       nav: true
     },
      940: {
       items: 3,
       nav: true,
       loop: false
     }
    }
  }
  images =  [];



  constructor(
    private service: CustomerService,
    private router: Router,
    private actRoute: ActivatedRoute
  ) { }

  product : any = [];
  productID: any;
  ngOnInit(): void {
    this.refreshProductList();
    this.productID = this.actRoute.snapshot.params['pro_id'];
  }

  refreshProductList(){
    this.service.getProductList().subscribe(res=>{
      this.product = res['result'];
      console.log('prolist',res['result'])
      res['result'].forEach(element => {
        let image : any = {};
        image.text = element['sanpham']['ten'];
        image.image = element['mausanpham'][0]['hinh']['hinh'];
        this.images.push(image);
        console.log(this.images)
      });
    })
  }
  

}
