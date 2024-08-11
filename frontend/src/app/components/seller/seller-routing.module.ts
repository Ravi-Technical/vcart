import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { UpdateProductComponent } from './update-product/update-product.component';
import { BrandComponent } from './brand/brand.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGaurdGuard } from 'src/app/@core/auth/auth-gaurd.guard';
import { PageNotFoundComponent } from 'src/app/pages/page-not-found/page-not-found.component';
import { HomeComponent } from 'src/app/pages/home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  {path:'', pathMatch: 'full', component:HomeComponent},

  {path:'*', component:HomeComponent},

  { path:"login", component: LoginComponent },

  { path:"dashboard", canActivate:[authGaurdGuard], component:DashboardComponent},

  { path:"new-product", canActivate:[authGaurdGuard], component: NewProductComponent },

  { path:"product-list", canActivate:[authGaurdGuard], component: ProductListComponent },

  { path:"profile", canActivate:[authGaurdGuard],  component: ProfileComponent },

  { path:"forgot-password", component: ForgotPasswordComponent },

  { path:"reset-password/:token", component: ResetPasswordComponent },

  { path:"update-product/:id", canActivate:[authGaurdGuard],  component: UpdateProductComponent },

  { path:"brand", canActivate:[authGaurdGuard], component:BrandComponent},

  { path:"category", canActivate:[authGaurdGuard], component:CategoryComponent},

  { path: "**", pathMatch: 'full', component:PageNotFoundComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SellerRoutingModule { }
