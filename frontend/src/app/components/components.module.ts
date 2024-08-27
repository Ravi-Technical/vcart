import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComponentsRoutingModule } from './components-routing.module';
import { ShopModule } from './shop/shop.module';            
import { SellerModule } from './seller/seller.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ShopModule,
    SellerModule,
    FormsModule,
    
  ]
})
export class ComponentsModule { }
