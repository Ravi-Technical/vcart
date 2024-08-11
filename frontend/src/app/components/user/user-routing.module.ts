import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SaveForLaterComponent } from './save-for-later/save-for-later.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { ProfileComponent } from './profile/profile.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"profile", component:ProfileComponent},
  {path:"dashboard", component:DashboardComponent},
  {path:"save-for-later", component:SaveForLaterComponent},
  {path:"wishlist", component:WishlistComponent},
  {path:"my-orders", component:MyOrdersComponent},
  {path:"forget-password", component:ForgetPasswordComponent},
  {path:"reset-password/:token", component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
