import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { Brand } from 'src/app/models/brand-model';
import { Category } from 'src/app/models/category-model';
import { CustomerService } from '../../../../services/customer.service';
import * as $ from 'jquery';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

declare var webkitSpeechRecognition: any;
declare var annyang: any;

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  voiceActiveSectionDisabled: boolean = true;
	voiceActiveSectionError: boolean = false;
	voiceActiveSectionSuccess: boolean = false;
	voiceActiveSectionListening: boolean = false;
	voiceText: any = "Tìm kiếm";

  constructor(
    private _service: CustomerService,
    private fb: FormBuilder,
    private _router: Router,
    private snackBar: MatSnackBar,
    private ngZone: NgZone
  ) { }

  @ViewChild('gSearch') formSearch;
  @ViewChild('searchKey') hiddenSearchHandler

  public pushedCates: {[id: string]: any;}={};
   BrandList : Brand[] = [];
   CategoryList: Category[] = [];

   SearchForm: FormGroup;
   VoiceForm: FormGroup;

   account_validation_messages = {
     'search': [
       { type: 'required', message: 'Nhập từ khóa tìm kiếm' },
     ]
   }

  ngOnInit(): void {
    this.resetSearchForm();
    this.refeshCategoryList();
    this.refreshBrandList();
    setInterval(()=>{
      $('a').each(function(){
        var key = $(this).attr('routerLink');
        if (window.location.pathname.includes(key)){
          $(this).addClass('active');
        }else{
          $(this).removeClass('active');
        }
      })
    }, 500)

  }
  voice_Search(){
    console.log('d')
  }

  public voiceSearch(){
    if (!('webkitSpeechRecognition' in window)) {
      var vSearch = new webkitSpeechRecognition();
      vSearch.continuous = false;
      vSearch.interimResults = true;
      vSearch.lang = "en-US";
      vSearch.start();
      const voiceSearchForm = this.formSearch.nativeElement;
      const voiceHandler = this.hiddenSearchHandler.nativeElement;
      vSearch.onresult = function(e){
        voiceHandler.value = e.results[0][0].transcript;
        vSearch.stop();
        voiceSearchForm.submit();
      };
      vSearch.onerror = function(e){
        console.log(e);
        vSearch.stop();
      };
  
    } else {
      console.log('Trình duyệt không hỗ trợ!');
    }
      
  }

  // resetForm(form ?: NgForm){
  //   if (form != null){
  //     form.resetForm();
  //   }
  //   this._service.SearchForm={
  //     search: ''
  //   }
    
  // }
  resetSearchForm(){
    this.SearchForm = this.fb.group({
      search: new FormControl('', Validators.compose([
        Validators.required
      ]))
    })
  }

  refreshBrandList(){
   
    this._service.getBrandList().subscribe(res=>{
      this.BrandList = res['data'];
      console.log(res)
    })
    
  }
  
  refeshCategoryList(){
    this._service.getCategoryList().subscribe(result=>{
      this.CategoryList = result['data'];
      console.log(result)
    })
  }

  onSearch(){
    this._router.navigate(['/search/'+this.SearchForm.controls['search'].value]);
    let search: any = {};
    
    search.ten = this.SearchForm.controls['search'].value;
    this._service.searchProduct(search).subscribe(res=>{
      console.log(res)
    })
  }

  initializeVoiceRecognitionCallback(): void {
		annyang.addCallback('error', (err) => {
      if(err.error === 'network'){
        
        this.voiceText = "Internet is require";
        this.SearchForm.controls['search'].setValue(this.voiceText)
        annyang.abort();
        this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
      } else if (this.voiceText === undefined) {
				this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('soundstart', (res) => {
      this.ngZone.run(() => this.voiceActiveSectionListening = true);
		});

		annyang.addCallback('end', () => {
      if (this.voiceText === undefined) {
        this.ngZone.run(() => this.voiceActiveSectionError = true);
				annyang.abort();
			}
		});

		annyang.addCallback('result', (userSaid) => {
			this.ngZone.run(() => this.voiceActiveSectionError = false);

			let queryText: any = userSaid[0];

			annyang.abort();

      this.voiceText = queryText;
      console.log(userSaid[0])
      this.SearchForm.controls['search'].setValue(this.voiceText)

			this.ngZone.run(() => this.voiceActiveSectionListening = false);
      this.ngZone.run(() => this.voiceActiveSectionSuccess = true);
		});
	}

	startVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = false;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceText = undefined;
    this.SearchForm.controls['search'].setValue('')

		if (annyang) {
			let commands = {
				'hi': () => { }
			};

      annyang.addCommands(commands);
      console.log(commands)

      this.initializeVoiceRecognitionCallback();

			annyang.start({ autoRestart: false });
		}
	}

	closeVoiceRecognition(): void {
    this.voiceActiveSectionDisabled = true;
		this.voiceActiveSectionError = false;
		this.voiceActiveSectionSuccess = false;
    this.voiceActiveSectionListening = false;
    // this._router.navigate(['/search/'+this.voiceText]);
    this.voiceText = undefined;
    this.SearchForm.controls['search'].setValue('')
		if(annyang){
      annyang.abort();
    }
	}

}
