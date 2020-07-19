import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ProductsListComponent} from "./products-list/products-list.component";
import {ProductRoutingModule} from "./product-routing.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import { ProductsTableComponent } from './products-list/products-table/products-table.component';
import {CalculatorModule} from "../../shared/pipe/calculator/calculator.module";
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ProductDialogDataComponent } from './product-dialog/product-dialog-data/product-dialog-data.component';
import { MacronutrientsInfoComponent } from './product-dialog/product-dialog-data/macronutrients-info/macronutrients-info.component';
import {MatBadgeModule} from "@angular/material/badge";
import {MatChipsModule} from "@angular/material/chips";
import { ProductDialogCreateComponent } from './product-dialog-create/product-dialog-create.component';
import { ProductCreateFormComponent } from './product-dialog-create/product-create-form/product-create-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ProductRoutingModule,
    SpinnerModule,
    CalculatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsTableComponent,
    ProductDialogComponent,
    ProductDialogDataComponent,
    MacronutrientsInfoComponent,
    ProductDialogCreateComponent,
    ProductCreateFormComponent
  ]
})
export class ProductModule {

}
