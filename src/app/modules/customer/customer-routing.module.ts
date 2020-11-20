import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGuard } from 'src/app/customer.guard';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
// import { OrderDetailsComponent } from '../admin/components/orders/order-details/order-details.component';
import { AddAddressComponent } from './components/address/add-address/add-address.component';
import { EditAddressComponent } from './components/address/edit-address/edit-address.component';
import { ShowAddressComponent } from './components/address/show-address/show-address.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CompleteComponent } from './components/complete/complete.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { GetstartedComponent } from './components/getstarted/getstarted.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { OrderdetailsComponent } from './components/order/orderdetails/orderdetails.component';
import { PlaceorderComponent } from './components/placeorder/placeorder.component';
import { ProductBrandComponent } from './components/product-brand/product-brand.component';
import { ProductCategoryComponent } from './components/product-category/product-category.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ShowProfileComponent } from './components/profile/show-profile/show-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { VerifyComponent } from './components/verify/verify.component';


const routes: Routes = [
  {path: '', component: LandingComponent,
    children: [
      {path: 'shopping', component: ShoppingComponent},
      {path: 'login', component: LoginComponent},
      {path: 'forgot', component: ForgotPasswordComponent},
      {path: 'getstarted', component: GetstartedComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'verify', component: VerifyComponent},
      {path: 'details/:pro_id/:clr_id', component: ProductDetailsComponent},
      {path: 'details', component: ProductDetailsComponent},
      {path: 'cate/:id', component: ProductCategoryComponent},
      {path: 'brand/:id', component: ProductBrandComponent},
      {path: 'search/:key', component: ProductSearchComponent},
      {path: 'cart', component: CartComponent,     canActivate: [CustomerGuard]},
      {path: 'checkout', component: CheckoutComponent ,     canActivate: [CustomerGuard]},
      {path: 'placeorder', component: PlaceorderComponent ,     canActivate: [CustomerGuard]},
      {path: 'complete', component: CompleteComponent ,     canActivate: [CustomerGuard]},
      {path: 'address', component: ShowAddressComponent ,     canActivate: [CustomerGuard]},
      {path: 'address/add', component: AddAddressComponent ,     canActivate: [CustomerGuard]},
      {path: 'address/edit/:add_id', component: EditAddressComponent,     canActivate: [CustomerGuard]},
      {path: 'profile', component: ShowProfileComponent, canActivate: [CustomerGuard]},
      {path: 'profile/edit', component: EditProfileComponent, canActivate: [CustomerGuard]},

      {path: 'orders', component: OrderComponent,     canActivate: [CustomerGuard]},
      {path: 'orders/:id', component: OrderdetailsComponent,     canActivate: [CustomerGuard]},
      {path: '', component: MainHomeComponent
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
