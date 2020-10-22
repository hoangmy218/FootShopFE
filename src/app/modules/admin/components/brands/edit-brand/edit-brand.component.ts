import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-edit-brand',
  templateUrl: './edit-brand.component.html',
  styleUrls: ['./edit-brand.component.scss']
})
export class EditBrandComponent implements OnInit {


  constructor(
    public dialogbox: MatDialogRef<EditBrandComponent>,
    public service: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
   
  }

  onSubmit(form :NgForm){
    console.log(form.value);
    this.service.updateBrand(form.value).subscribe(res=>
      {
        console.log(res)
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        if (res['success']){
          this.dialogbox.close();
        }
      })
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register Click');
  }

  
}
