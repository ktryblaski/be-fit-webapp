import { NgModule } from '@angular/core';
import { ProductRoutingModule } from './product-routing.module';
import { ProductsListModule } from './products-list/products-list.module';

@NgModule({
  imports: [ProductRoutingModule, ProductsListModule],
})
export class ProductModule {}
