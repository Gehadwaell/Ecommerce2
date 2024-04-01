import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductsComponent } from './components/products/products.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {path:'',
  canActivate:[authGuard],
  component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:'home',component:HomeComponent,title:"Home"},
    {path:'cart',component:CartComponent,title:"Cart"},
    {path:'details/:id',component:DetailsComponent,title:"Details"},
    {path:'categories',component:CategoriesComponent,title:"Categories"},
    {path:'categoryDetails/:id',component:CategoryDetailsComponent,title:"Categories Details"},
    {path:'products',component:ProductsComponent,title:"Products"},
    {path:'brands',component:BrandsComponent,title:"Brands"},
    {path:'payment/:id',component:PaymentComponent,title:"Payment"},
    {path:'home/allorders',component:AllordersComponent,title:"All orders"},
    {path:'forgotPassword',component:ForgotPasswordComponent,title:"Forgot Password"},
    {path:'wishlist',component:WishlistComponent,title:"Wishlist"}


  ]},
  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent,title:"Login"},
    {path:'register',component:RegisterComponent,title:"Register"},
    {path:'forgotPass',component:ForgotPasswordComponent,title:"Forgot Password"}

  ]},
  {path:'**',component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
