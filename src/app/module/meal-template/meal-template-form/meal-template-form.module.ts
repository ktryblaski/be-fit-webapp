import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplateFormComponent } from './meal-template-form.component';
import { ProductPipe } from './meal-template-form-ingredients/meal-template-form-ingredients-table/product.pipe';
import { NotSelectedProductsPipe } from './meal-template-form-ingredients/meal-template-form-product/not-selected-products.pipe';
import { MealTemplateFormIngredientsComponent } from './meal-template-form-ingredients/meal-template-form-ingredients.component';
import { MealTemplateFormIngredientsTableComponent } from './meal-template-form-ingredients/meal-template-form-ingredients-table/meal-template-form-ingredients-table.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CalculatorModule } from '../../../shared/pipe/calculator/calculator.module';
import { MatIconModule } from '@angular/material/icon';
import { HelperModule } from '../../../shared/helper/helper.module';
import { MealTemplateFormProductComponent } from './meal-template-form-ingredients/meal-template-form-product/meal-template-form-product.component';
import { MealTemplateFormProductSelectComponent } from './meal-template-form-ingredients/meal-template-form-product/meal-template-form-product-select/meal-template-form-product-select.component';
import { SortProductsPipe } from './meal-template-form-ingredients/meal-template-form-product/meal-template-form-product-select/sort-products.pipe';
import { FilterProductsPipe } from './meal-template-form-ingredients/meal-template-form-product/meal-template-form-product-select/filter-products.pipe';

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
    MealTemplateFormIngredientsComponent,
    MealTemplateFormProductComponent,
    MealTemplateFormProductSelectComponent,
    MealTemplateFormIngredientsTableComponent,
    ProductPipe,
    NotSelectedProductsPipe,
    SortProductsPipe,
    FilterProductsPipe
  ],
  exports: [
    MealTemplateFormComponent
  ]
})
export class MealTemplateFormModule { }
