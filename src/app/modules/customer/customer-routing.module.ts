import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerGuard } from 'src/app/customer.guard';
import { PageNotFoundComponent } from 'src/app/page-not-found/page-not-found.component';
import { AddAddressComponent } from './components/address/add-address/add-address.component';
import { EditAddressComponent } from './components/address/edit-address/edit-address.component';
import { ShowAddressComponent } from './components/address/show-address/show-address.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { CompleteComponent } from './components/complete/complete.component';
import { GetstartedComponent } from './components/getstarted/getstarted.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { MainHomeComponent } from './components/main-home/main-home.component';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { PlaceorderComponent } from './components/placeorder/placeorder.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { RegisterComponent } from './components/register/register.component';
import { ShoppingComponent } from './components/shopping/shopping.component';
import { VerifyComponent } from './components/verify/verify.component';


const routes: Routes = [
  {path: '', component: LandingComponent,
    children: [
      {path: 'shopping', component: ShoppingComponent},
      {path: 'login', component: LoginComponent},
      {path: 'getstarted', component: GetstartedComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'verify', component: VerifyComponent},
      {path: 'details/:pro_id/:clr_id', component: ProductDetailsComponent},
      {path: 'details', component: ProductDetailsComponent},
      {path: 'cart', component: CartComponent,     canActivate: [CustomerGuard]},
      {path: 'checkout', component: CheckoutComponent},
      {path: 'placeorder', component: PlaceorderComponent},
      {path: 'complete', component: CompleteComponent},
      {path: 'address', component: ShowAddressComponent},
      {path: 'address/add', component: AddAddressComponent},
      {path: 'address/edit/:add_id', component: EditAddressComponent},

      {path: 'orders', component: OrderComponent},
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
