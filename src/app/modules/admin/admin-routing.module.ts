import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandComponent } from './components/brands/brand/brand.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { ProductChartComponent } from './components/charts/product-chart/product-chart.component';
import { RevenueChartComponent } from './components/charts/revenue-chart/revenue-chart.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CommentComponent } from './components/comment/comment.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddDiscountComponent } from './components/discounts/add-discount/add-discount.component';
import { DetailsDiscountComponent } from './components/discounts/details-discount/details-discount.component';
import { DiscountComponent } from './components/discounts/discount/discount.component';
import { EditDiscountComponent } from './components/discounts/edit-discount/edit-discount.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { OrderComponent } from './components/orders/order/order.component';
import { AddProductDetailsComponent } from './components/products/add-product-details/add-product-details.component';
import { EditProductDetailsComponent } from './components/products/edit-product-details/edit-product-details.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { ProductComponent } from './components/products/product/product.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SizeComponent } from './components/sizes/size/size.component';
import { AddStockComponent } from './components/stocks/add-stock/add-stock.component';
import { EditStockComponent } from './components/stocks/edit-stock/edit-stock.component';
import {StockComponent} from './components/stocks/stock/stock.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';
const routes: Routes = [
  {path: '', component: SidebarComponent,
    children: [
      {path: 'category', component: CategoryComponent},
      {path: 'brand', component: BrandComponent},
      {path: 'size', component: SizeComponent},
      {path: 'color', component: ColorComponent},
      {path: 'supplier', component: SupplierComponent},
      {path: 'dashboard', component: DashboardComponent},
      {path: 'product', component: ProductComponent},
      {path: 'product/:id/add', component: AddProductDetailsComponent},
      {path: 'product/:id/:procolor', component: EditProductDetailsComponent},
      {path: 'product/:id', component: ProductDetailComponent},
      {path: 'discount', component: DiscountComponent},
      {path: 'discount/add', component: AddDiscountComponent},
      {path: 'discount/edit/:id', component: EditDiscountComponent},
      {path: 'discount/details/:id', component: DetailsDiscountComponent},
      // {path: 'product/:product_id', component: ProductDetailsComponent},
     
      {path: 'order', component: OrderComponent},
      {path: 'order/:order_id', component: OrderDetailsComponent},
    
      {path: 'stock', component: StockComponent},
      {path: 'stock/add', component: AddStockComponent},
      {path: 'stock/edit/:id', component:EditStockComponent},
      {path: 'comment', component: CommentComponent},
      {path: 'pro-chart', component: ProductChartComponent},
      {path: 'revenue-chart', component: RevenueChartComponent},
      

      {path: '', component: DashboardComponent}
    ]  
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
