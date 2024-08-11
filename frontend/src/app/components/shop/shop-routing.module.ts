
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewcartComponent } from './viewcart/viewcart.component';
import { OrderComponent } from './order/order.component';

const routes: Routes = [
  {path:"products", component:ProductsComponent},
  {path:"product-details/:id", component:ProductDetailComponent},
  {path:"viewcart", component:ViewcartComponent},
  {path:"checkout", component:CheckoutComponent},
  {path:"order", component:OrderComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
