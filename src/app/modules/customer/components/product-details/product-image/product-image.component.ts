import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import * as $ from 'jquery';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-product-image',
  templateUrl: './product-image.component.html',
  styleUrls: ['./product-image.component.scss']
})
export class ProductImageComponent implements OnInit {

  threeSixtyImages= [
    '../../../../../assets/images/image1_1.jpg',
    '../../../../../assets/images/image1_3.jpg',
    '../../../../../assets/images/image.jpg',
    '../../../../../assets/images/image1_7.jpg',
    '../../../../../assets/images/image1_9.jpg',
  ];
  imageList = [];


  constructor(
    public dialogbox: MatDialogRef<ProductImageComponent>,
    private service: CustomerService
  ) { }

  ngOnInit(): void {
    this.refreshImageList();

    $(function(){
      var pic = $('.list').offset();
      var pic_X= pic.left;
      var pic_Y=$('.list').offset().top;
      var pic_W=$('.list').width()/2;
      var pic_H=$('.list').height()/2;
      var center_X=pic_X+pic_W;
      var center_Y=pic_Y+pic_H;
      var movestop=pic_W/10;
      $('.list').mousemove(function(event){
        var mouse_X=event.pageX;
        var mouse_Y=event.pageY;
        if(mouse_X-center_X<=0){
          moveImg(mouse_X,mouse_Y,'left')
        }else{
          moveImg(mouse_X,mouse_Y,'')
        }
      });
      function moveImg(m_X,m_Y,dir){
        var index=Math.ceil(Math.abs(m_X-center_X)/movestop);
        if(dir){
          $('.list li').eq(index).show().siblings().hide();
        }else{
          $('.list li').eq(18-index).show().siblings().hide();
        }
      }
    })
  }
  onClose(){
    this.dialogbox.close();
  }

  refreshImageList(){
    console.log('proColorId', this.service.proColorID);
    this.service.getImageDegree(this.service.proColorID).subscribe(res=>{
      console.log('res', res)
      for(var i = 0; i< res['data']['hinh'].length; i++){
        this.imageList.push(res['data']['hinh'][i]['hinh']);
        console.log(this.imageList)
      }
      
    })
  }

}
