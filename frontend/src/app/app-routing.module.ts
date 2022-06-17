import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { CreateProductComponent } from './products/create/create-product.component';

const routes: Routes = [
    {path: 'products/create', component: CreateProductComponent},
    {path: 'products/:id', component: ProductComponent},         
    {path: 'products', component: ProductsComponent},    
    {path: '', redirectTo: '/products', pathMatch: 'full' }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
