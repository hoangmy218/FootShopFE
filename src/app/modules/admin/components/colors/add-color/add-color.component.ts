import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-color',
  templateUrl: './add-color.component.html',
  styleUrls: ['./add-color.component.scss']
})
export class AddColorComponent implements OnInit {

  selectedFile : File = null;
  constructor(
    private http: HttpClient,
    public service: AdminService,
    public dialogbox: MatDialogRef<AddColorComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.resetForm();
  }
  readonly APIUrl = environment.public_apiUrl;
  token = localStorage.getItem('token');

  filedata:any;
  fileEvent(e){
      this.filedata = e.target.files[0];
  }
  
  processFile(photo: any){
    this.filedata = <File>photo.files[0];
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    myFormData.append('file', this.filedata);
    console.log(this.filedata)
    this.http.post(this.APIUrl + "/hinhanh/upload", myFormData, {headers: headers})
    .subscribe(data => {
      console.log(data);
      this.service.formColor.hinh= data['hinhanh'].hinh.toString();            
    });

  }
 
  onSubmit(form :NgForm){
    console.log(form.value);
    console.log(this.service.formColor);
    form.value['hinh'] = this.service.formColor.hinh;
    // this.service.formColor.ten = form.value['ten'];
    this.service.addColor(form.value).subscribe(res=>
      {
        this.resetForm(form);
        console.log(res)
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        if (res['success']){
          this.dialogbox.close();
          window.location.replace('/admin/color');
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
    this.service.formColor={
      _id : ' ',
      ten : '',
      hinh: ''
    }
  }
}
