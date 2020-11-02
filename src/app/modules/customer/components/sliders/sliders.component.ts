import { Component, OnInit } from '@angular/core';

import * as $ from 'jquery';
@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {

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
       items: 1,
       nav: true
     },
      450: {
       items: 1,
       nav: true
     },
      940: {
       items: 1,
       nav: true,
       loop: false
     }
    }
  }

  images = [
    {
      text: "Avada Fashion",
      // image: "../../../../../assets/img/home_slider_one.jpg"
      image: "../../../../../assets/img/home_slider_2-2.jpg"
    },
    {
      text: "TUẦN LỄ THỜI TRANG THU ĐÔNG",
      image: "../../../../../assets/img/home_slider.png"
    }
  ]




  constructor() { }

  ngOnInit(): void {
  }

}
