import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductRoutingModule} from "./product-routing.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import { ProductsTableComponent } from './products-list/products-table/products-table.component';
import {CaloriesCalculatorModule} from "../../shared/pipe/calories-calculator.module";

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsTableComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SpinnerModule,
    CaloriesCalculatorModule
  ]
})
export class ProductModule {

}
