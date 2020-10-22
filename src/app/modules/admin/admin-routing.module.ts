import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandComponent } from './components/brands/brand/brand.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { ColorComponent } from './components/colors/color/color.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { OrderComponent } from './components/orders/order/order.component';
import { AddProductDetailsComponent } from './components/products/add-product-details/add-product-details.component';
import { EditProductDetailsComponent } from './components/products/edit-product-details/edit-product-details.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductComponent } from './components/products/product/product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SizeComponent } from './components/sizes/size/size.component';
import { AddStockComponent } from './components/stocks/add-stock/add-stock.component';
import {StockComponent} from './components/stocks/stock/stock.component';
const routes: Routes = [
  {path: '', component: SidebarComponent,
    children: [
      {path: 'category', component: CategoryComponent},
      {path: 'brand', component: BrandComponent},
      {path: 'size', component: SizeComponent},
      {path: 'color', component: ColorComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'product', component: ProductComponent},
      {path: 'product/:id/add', component: AddProductDetailsComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      
      // {path: 'product/:product_id', component: ProductDetailsComponent},
     
      {path: 'order', component: OrderComponent},
      {path: 'order/:order_id', component: OrderDetailsComponent},
    
      {path: 'stock', component: StockComponent},
      {path: 'stock/add', component: AddStockComponent}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
