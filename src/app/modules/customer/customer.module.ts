import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SlidersComponent } from './components/sliders/sliders.component';

import { OwlModule } from 'ngx-owl-carousel';
import { MainComponent } from './components/main/main.component';
import { MainHomeComponent } from './components/main-home/main-home.component';

import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { RelatedproductComponent } from './components/relatedproduct/relatedproduct.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { FilterComponent } from './components/filter/filter.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { VerifyComponent } from './components/verify/verify.component';
import { GetstartedComponent } from './components/getstarted/getstarted.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { MatTabsModule } from '@angular/material/tabs';
import { StarRatingModule } from '@sreyaj/ng-star-rating';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PlaceorderComponent } from './components/placeorder/placeorder.component';
import { AddAddressComponent } from './components/address/add-address/add-address.component';
import { EditAddressComponent } from './components/address/edit-address/edit-address.component';
import { CompleteComponent } from './components/complete/complete.component';
import { ShowAddressComponent } from './components/address/show-address/show-address.component';
import { OrderComponent } from './components/order/order.component';
import { StripeComponent } from './components/stripe/stripe.component';
import { StripeService, NgxStripeModule } from 'ngx-stripe';
import { OrderdetailsComponent } from './components/order/orderdetails/orderdetails.component';
import { MatChipsModule } from '@angular/material/chips';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductBrandComponent } from './components/product-brand/product-brand.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductImageComponent } from './components/product-details/product-image/product-image.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShowProfileComponent } from './components/profile/show-profile/show-profile.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    HeaderComponent, 
    LandingComponent, 
    TopbarComponent, 
    FooterComponent, 
    SlidersComponent, 
    MainComponent, 
    MainHomeComponent, 
    ProductGridComponent, 
    RelatedproductComponent, 
    ShoppingComponent, 
    FilterComponent, 
    ProductComponent, 
    LoginComponent, 
    RegisterComponent, 
    VerifyComponent, 
    GetstartedComponent, 
    CartComponent, 
    ProductDetailsComponent, 
    CheckoutComponent, 
    PlaceorderComponent, 
    AddAddressComponent, 
    EditAddressComponent, 
    CompleteComponent, 
    ShowAddressComponent, 
    OrderComponent, 
    StripeComponent, 
    OrderdetailsComponent, 
    ProductCategoryComponent, 
    ProductBrandComponent, 
    ProductSearchComponent, 
    ProductImageComponent, ShowProfileComponent, EditProfileComponent, ForgotPasswordComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    OwlModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    NgxImageZoomModule,
    MatTabsModule,
    StarRatingModule,
    MatChipsModule,
    MatDialogModule,
    NgxPaginationModule,
    NgxStripeModule.forRoot('pk_test_51HHmGZJ6o6GkwUDliVfWqhwDWsVaIkBIeld8MRRPdKzeq6wTJ2eSh9tq3bHOiHH2HpVgVpmzuv0UQeby22PH9jGD00L6Kc0LHm'),
    // NgxDatatableModule,
    
    
  ],
  providers: [
    StripeService,
    DatePipe
  ]
})
export class CustomerModule { }
