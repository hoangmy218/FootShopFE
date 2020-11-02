import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-color',
  templateUrl: './edit-color.component.html',
  styleUrls: ['./edit-color.component.scss']
})
export class EditColorComponent implements OnInit {

  constructor(
    public dialogbox: MatDialogRef<EditColorComponent>,
    public service: AdminService,
    private snackBar: MatSnackBar,
    private http: HttpClient
  ) { }
  image_link : string = "";

  ngOnInit(): void {
    console.log(this.service.formColor)
    this.image_link = this.service.formColor.hinh;
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
      this.image_link =  data['hinhanh'].hinh.toString();   
      this.service.formColor.hinh= data['hinhanh'].hinh.toString();            
    });

  }

 
  onSubmit(form :NgForm){
    console.log(form.value);
    console.log(this.service.formColor);
    form.value['hinh'] = this.service.formColor.hinh;
    this.service.formColor.ten = form.value['ten'];
    this.service.updateColor(form.value).subscribe(res=>
      {
        console.log(res)
        this.snackBar.open(res['message'].toString(), '', {
          duration: 3000,
          verticalPosition:'bottom'
        })
        if (res['success']){
          this.dialogbox.close();
          // window.location.replace('/admin/color');
        }
      })
  }



  onClose(){
    this.dialogbox.close();
    this.service.filter('Register Click');
  }

  
}
