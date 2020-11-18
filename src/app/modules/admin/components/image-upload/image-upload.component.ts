import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {


  selectedFile : File = null;
  constructor(
    private http: HttpClient,
    public service: AdminService,
  ) { }

  ngOnInit(): void {
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
    console.log('file', this.filedata )
    this.http.post(this.APIUrl + "/hinhanh/upload", myFormData, {headers: headers})
    .subscribe(data => {
      console.log(data['hinhanh']);
      this.service.formColor.hinh= data['hinhanh'].hinh.toString();        
    }, error=>{
      console.log(error)
    });

  }
 


}
