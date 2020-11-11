import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';
import { ProductDetailsDialogUiComponent } from './product-details-dialog-ui/product-details-dialog-ui.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MacronutrientsChartModule } from '../../../shared/component/macronutrients-chart/macronutrients-chart.module';
import { RawButtonModule } from '../../../shared/component/raw-button/raw-button.module';
import { MatButtonModule } from '@angular/material/button';
import { HelperModule } from '../../../shared/helper/helper.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule,
    MacronutrientsChartModule,
    RawButtonModule,
    MatButtonModule,
    HelperModule,
    SpinnerModule
  ],
  declarations: [
    ProductDetailsDialogComponent,
    ProductDetailsDialogUiComponent
  ]
})
export class ProductDetailsDialogModule { }
