import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductRoutingModule } from './product-routing.module';
import { SpinnerModule } from '../../shared/component/spinner/spinner.module';
import { ProductsListUiComponent } from './products-list/products-list-ui/products-list-ui.component';
import { CalculatorModule } from '../../shared/pipe/calculator/calculator.module';
import { ProductDetailsDialogComponent } from './product-details-dialog/product-details-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductDetailsDialogUiComponent } from './product-details-dialog/product-details-dialog-ui/product-details-dialog-ui.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { ProductCreateDialogComponent } from './product-create-dialog/product-create-dialog.component';
import { ProductCreateFormComponent } from './product-create-dialog/product-create-form/product-create-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { HelperModule } from '../../shared/helper/helper.module';
import { ChartsModule } from 'ng2-charts';
import { MacronutrientsChartModule } from '../../shared/component/macronutrients-chart/macronutrients-chart.module';
import { NoTableDataModule } from '../../shared/component/no-table-data/no-table-data.module';
import { AsyncDataContainerModule } from '../../shared/component/async-data-container/async-data-container.module';

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
    ReactiveFormsModule,
    HelperModule,
    ChartsModule,
    MacronutrientsChartModule,
    NoTableDataModule,
    AsyncDataContainerModule
  ],
  declarations: [
    ProductsListComponent,
    ProductsListUiComponent,
    ProductDetailsDialogComponent,
    ProductDetailsDialogUiComponent,
    ProductCreateDialogComponent,
    ProductCreateFormComponent
  ]
})
export class ProductModule { }
