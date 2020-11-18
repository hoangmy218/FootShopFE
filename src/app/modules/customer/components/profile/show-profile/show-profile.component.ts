import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  constructor(
    private service: CustomerService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { }
  profile : any = {
    'ten': '',
    'email': '',
    'gioitinh': '',
    'dienthoai': '',
    'ngaysinh': ''

  }

  ngOnInit(): void {
    this.refreshProfile();
    $(window).scrollTop(0);
  }

  refreshProfile(){
    this.service.getProfile().subscribe(res=>{
      console.log(res);
      this.profile = res['data'];
    })
  }

  onEdit(){
    this.router.navigate(['/profile/edit']);
  }


}
