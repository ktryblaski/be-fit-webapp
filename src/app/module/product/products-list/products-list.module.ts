import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list.component';
import { ProductsListUiComponent } from './products-list-ui/products-list-ui.component';
import { CalculatorModule } from '../../../shared/pipe/calculator/calculator.module';
import { HelperModule } from '../../../shared/helper/helper.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NoTableDataModule } from '../../../shared/component/no-table-data/no-table-data.module';
import { MatButtonModule } from '@angular/material/button';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { ProductCreateDialogModule } from '../product-create-dialog/product-create-dialog.module';
import { ProductDetailsDialogModule } from '../product-details-dialog/product-details-dialog.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    FontAwesomeModule,
    CalculatorModule,
    HelperModule,
    NoTableDataModule,
    SpinnerModule,
    ProductCreateDialogModule,
    ProductDetailsDialogModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsListUiComponent
  ]
})
export class ProductsListModule { }
