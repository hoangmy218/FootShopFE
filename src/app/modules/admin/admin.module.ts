import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './components/admin/admin.component';
import { SizeComponent } from './components/sizes/size/size.component';
import { ColorComponent } from './components/colors/color/color.component';
import { CategoryComponent } from './components/categories/category/category.component';
import { BrandComponent } from './components/brands/brand/brand.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddBrandComponent } from './components/brands/add-brand/add-brand.component';
import { EditBrandComponent } from './components/brands/edit-brand/edit-brand.component';
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
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { AddCategoryComponent } from './components/categories/add-category/add-category.component';
import { EditCategoryComponent } from './components/categories/edit-category/edit-category.component';
import { EditColorComponent } from './components/colors/edit-color/edit-color.component';
import { AddColorComponent } from './components/colors/add-color/add-color.component';
import { AddSizeComponent } from './components/sizes/add-size/add-size.component';
import { EditSizeComponent } from './components/sizes/edit-size/edit-size.component';
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ProductComponent } from './components/products/product/product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { OrderComponent } from './components/orders/order/order.component';
import { OrderDetailsComponent } from './components/orders/order-details/order-details.component';
import { StockComponent } from './components/stocks/stock/stock.component';
import { AddStockComponent } from './components/stocks/add-stock/add-stock.component';
import { EditStockComponent } from './components/stocks/edit-stock/edit-stock.component';
import { AddProductDetailsComponent } from './components/products/add-product-details/add-product-details.component';
import { EditProductDetailsComponent } from './components/products/edit-product-details/edit-product-details.component';
import { SupplierComponent } from './components/suppliers/supplier/supplier.component';
import { AddSupplierComponent } from './components/suppliers/add-supplier/add-supplier.component';
import { EditSupplierComponent } from './components/suppliers/edit-supplier/edit-supplier.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ChartsModule } from 'ng2-charts';
import { MatChipsModule } from '@angular/material/chips';
import { CommentComponent } from './components/comment/comment.component';
import { ProductChartComponent } from './components/charts/product-chart/product-chart.component';
import { RevenueChartComponent } from './components/charts/revenue-chart/revenue-chart.component';
import { DiscountComponent } from './components/discounts/discount/discount.component';
import { AddDiscountComponent } from './components/discounts/add-discount/add-discount.component';
import { EditDiscountComponent } from './components/discounts/edit-discount/edit-discount.component';
import { DetailsDiscountComponent } from './components/discounts/details-discount/details-discount.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
  declarations: [
    SidebarComponent,
    AdminComponent,
    SizeComponent,
    ColorComponent,
    CategoryComponent,
    BrandComponent,
    DashboardComponent,
    AddBrandComponent,
    EditBrandComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    EditColorComponent,
    AddColorComponent,
    AddSizeComponent,
    EditSizeComponent,
    ImageUploadComponent,
    AddProductComponent,
    ProductComponent,
    EditProductComponent,
    OrderComponent,
    OrderDetailsComponent,
    StockComponent,
    AddStockComponent,
    EditStockComponent,
    AddProductDetailsComponent,
    EditProductDetailsComponent,
    SupplierComponent,
    AddSupplierComponent,
    ProductDetailComponent,
    CommentComponent,
    ProductChartComponent,
    RevenueChartComponent,
    EditSupplierComponent,
    DiscountComponent,
    AddDiscountComponent,
    EditDiscountComponent,
    DetailsDiscountComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CommonModule,
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
    MatListModule,
    MatPaginatorModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTabsModule,
    MatCheckboxModule,
    ChartsModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AdminModule { }
