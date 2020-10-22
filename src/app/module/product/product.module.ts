import { NgModule } from '@angular/core';
import { ProductsListModule } from './products-list/products-list.module';
import { ProductRoutingModule } from './product-routing.module';

@NgModule({
  imports: [
    ProductsListModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
