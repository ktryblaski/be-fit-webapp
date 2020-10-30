import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DayOfEatingFormComponent } from './day-of-eating-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { DayOfEatingFormMealComponent } from './day-of-eating-form-meal/day-of-eating-form-meal.component';
import { MatInputModule } from '@angular/material/input';
import { DayOfEatingFormIngredientsComponent } from './day-of-eating-form-ingredients/day-of-eating-form-ingredients.component';
import { MatIconModule } from '@angular/material/icon';
import { CalculatorModule } from '../../../shared/pipe/calculator/calculator.module';
import { ProductPipe } from './day-of-eating-form-ingredients/product.pipe';
import { HelperModule } from '../../../shared/helper/helper.module';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTabsModule,
    MatInputModule,
    MatIconModule,
    CalculatorModule,
    HelperModule,
  ],
  exports: [DayOfEatingFormComponent],
  declarations: [DayOfEatingFormComponent, DayOfEatingFormMealComponent, DayOfEatingFormIngredientsComponent, ProductPipe],
})
export class DayOfEatingFormModule {}
