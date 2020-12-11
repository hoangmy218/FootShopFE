import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnChanges {

  @Input() isLoading = false;
  loading = true;
  constructor() { }

  ngOnChanges(data: SimpleChanges): void {
    this.loading = data.isLoading.currentValue;
  }
}
