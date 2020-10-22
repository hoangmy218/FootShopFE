import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    items: 2,
    navText: [ '', '' ],
    responsive: {
      0: {
       items: 2,
       nav: true
     },
      480: {
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

  images = [
    {
      text: "Avada Fashion 1",
      // image: "../../../../../assets/img/home_slider_one.jpg"
      image: "../../../../../assets/img/home_slider_2-2.jpg"
    },
    {
      text: "Avada Fashion 2",
      image: "../../../../../assets/img/home_slider_2-2.jpg"
    },
    {
      text: "Avada Fashion 3",
      image: "../../../../../assets/img/home_slider_2-2.jpg"
    },
    {
      text: "Avada Fashion 4",
      image: "../../../../../assets/img/home_slider_2-2.jpg"
    }
  ]

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
      console.log(res['result'])
    })
  }

}
