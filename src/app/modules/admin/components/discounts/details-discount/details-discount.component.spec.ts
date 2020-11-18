import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsDiscountComponent } from './details-discount.component';

describe('DetailsDiscountComponent', () => {
  let component: DetailsDiscountComponent;
  let fixture: ComponentFixture<DetailsDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
