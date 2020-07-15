import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductRoutingModule} from "./product-routing.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import { ProductsTableComponent } from './products-list/products-table/products-table.component';
import {CaloriesCalculatorModule} from "../../shared/pipe/calories-calculator.module";
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProductDialogDataComponent } from './product-dialog/product-dialog-data/product-dialog-data.component';
import { MacronutrientsInfoComponent } from './product-dialog/product-dialog-data/macronutrients-info/macronutrients-info.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsTableComponent,
    ProductDialogComponent,
    ProductDialogDataComponent,
    MacronutrientsInfoComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SpinnerModule,
    CaloriesCalculatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule
  ]
})
export class ProductModule {

}
