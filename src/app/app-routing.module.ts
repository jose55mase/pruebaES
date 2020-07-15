import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ArticleComponent } from './components/article/article.component';
import { RolesComponent } from './components/roles/roles.component';
import { FacturasComponent } from './components/facturas/facturas.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/facturas/payment/payment.component';

const routes: Routes = [
  {path: '',component: ArticleComponent},
  {path: 'article',component: ArticleComponent}, 
  {path: 'products',component: ProductsComponent},
  {path: 'user',component: UsersComponent},
  {path: 'rol', component: RolesComponent},
  {path: 'bill', component: FacturasComponent},
  {path: 'login', component: LoginComponent},
  {path: 'bill/payment', component: PaymentComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    { enableTracing: true } // <-- debugging purposes only
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
