import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<AddCategoryComponent>,
    public service: AdminService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onSubmit(form :NgForm){
    console.log(form.value);
    this.service.addCategory(form.value).subscribe(res=>
      {
        this.resetForm(form);
        console.log(res)
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        if (res['success']){
          this.dialogbox.close();
          window.location.replace('/admin/category');
        }
      })
  }

  onClose(){
    this.dialogbox.close();
    this.service.filter('Register Click');
  }

  resetForm( form ?: NgForm){
    if (form!= null)
    {
      form.resetForm();
    }
    this.service.formData={
      _id : '',
      ten : '',
    }
  }
}