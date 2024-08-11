import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';
import { HomeComponent } from '../pages/home/home.component';
 
const routes: Routes = [
  {path:"", component:HomeComponent},
  {path:"seller", loadChildren:()=>import('../components/seller/seller.module').then(m=>m.SellerModule)},
  {path:'shop', loadChildren:()=>import('../components/shop/shop.module').then(m=>m.ShopModule)},
  {path:"user", loadChildren:()=>import('../components/user/user.module').then(m=>m.UserModule)},
  { path: "**", component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
