import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ProductsComponent } from './products/products.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { FormsModule } from '@angular/forms';
import { OrderComponent } from './order/order.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipe } from 'src/app/components/shop/filter.pipe';
 


@NgModule({
  declarations: [
    ProductsComponent,
    ProductDetailComponent,
    CheckoutComponent,
    ViewcartComponent,
    OrderComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    NgxSliderModule,
    FormsModule,
    NgxPaginationModule
  ]
})
export class ShopModule { }
