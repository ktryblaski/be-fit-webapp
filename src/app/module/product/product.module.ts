import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductRoutingModule} from "./product-routing.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import { ProductsTableComponent } from './products-list/products-table/products-table.component';
import {CaloriesCalculatorModule} from "../../shared/pipe/calories-calculator/calories-calculator.module";
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProductDialogDataComponent } from './product-dialog/product-dialog-data/product-dialog-data.component';
import { MacronutrientsInfoComponent } from './product-dialog/product-dialog-data/macronutrients-info/macronutrients-info.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import { NewProductDialogComponent } from './new-product-dialog/new-product-dialog.component';
import { NewProductDialogFormComponent } from './new-product-dialog/new-product-dialog-form/new-product-dialog-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SpinnerModule,
    CaloriesCalculatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsTableComponent,
    ProductDialogComponent,
    ProductDialogDataComponent,
    MacronutrientsInfoComponent,
    NewProductDialogComponent,
    NewProductDialogFormComponent
  ]
})
export class ProductModule {

}
