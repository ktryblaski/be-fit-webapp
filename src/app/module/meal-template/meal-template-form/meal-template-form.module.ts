import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplateFormComponent } from './meal-template-form.component';
import { ProductPipe } from './form-ingredients/form-ingredients-table/product.pipe';
import { FormIngredientsComponent } from './form-ingredients/form-ingredients.component';
import { FormIngredientsTableComponent } from './form-ingredients/form-ingredients-table/form-ingredients-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CalculatorModule } from '../../../shared/pipe/calculator/calculator.module';
import { MatIconModule } from '@angular/material/icon';
import { HelperModule } from '../../../shared/helper/helper.module';
import { FormProductComponent } from './form-ingredients/form-product/form-product.component';
import { FormProductSelectComponent } from './form-ingredients/form-product/form-product-select/form-product-select.component';
import { SortProductsPipe } from './form-ingredients/form-product/form-product-select/sort-products.pipe';
import { FilterProductsPipe } from './form-ingredients/form-product/form-product-select/filter-products.pipe';
import { FormIngredientRowComponent } from './form-ingredients/form-ingredient-row/form-ingredient-row.component';
import { NonEmptyWeightPipe } from './form-ingredients/form-ingredient-row/not-empty-weight.pipe';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    CalculatorModule,
    MatIconModule,
    HelperModule,
  ],
  declarations: [
    MealTemplateFormComponent,
    FormIngredientsComponent,
    FormProductComponent,
    FormProductSelectComponent,
    FormIngredientsTableComponent,
    ProductPipe,
    SortProductsPipe,
    FilterProductsPipe,
    FormIngredientRowComponent,
    NonEmptyWeightPipe
  ],
  exports: [
    MealTemplateFormComponent
  ]
})
export class MealTemplateFormModule { }
