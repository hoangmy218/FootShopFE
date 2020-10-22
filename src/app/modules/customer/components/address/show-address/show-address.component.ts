import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Address } from 'src/app/models/address-model';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-show-address',
  templateUrl: './show-address.component.html',
  styleUrls: ['./show-address.component.scss']
})
export class ShowAddressComponent implements OnInit {

  constructor(
    private _router: Router,
    private service: CustomerService,
    private snackBar: MatSnackBar
  ) { }

  addressList : Address[] =[];

  ngOnInit(): void {
    this.refreshAddressList();
  }

  refreshAddressList(){
    this.service.getAddress().subscribe(res=>{
      // console.log(res)
      this.addressList = res['data'];
    })
  }

  onAdd(){
    this._router.navigate(['/address/add']);
  }

  onEdit(id: string){
    console.log(id)
    this._router.navigate(['/address/edit/'+id])
  }

  onDelete(id: string){
    if (confirm('Bạn có chắc chắn muốn xóa địa chỉ này?'))
    {
      console.log(id)
      this.service.deleteAddress(id).subscribe(res=>{
        this.snackBar.open(res['message'].toString(), '',{
          duration: 3000,
          verticalPosition:'bottom'
        });
        this.refreshAddressList();
      })
    }
  }

}
