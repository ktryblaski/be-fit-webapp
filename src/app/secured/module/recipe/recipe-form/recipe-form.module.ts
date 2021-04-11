import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CalculatorModule } from '../../../../shared/pipe/calculator/calculator.module';
import { MatIconModule } from '@angular/material/icon';
import { HelperModule } from '../../../../shared/helper/helper.module';
import { FormProductComponent } from './ingredients-form/form-product/form-product.component';
import { FormProductSelectComponent } from './ingredients-form/form-product/form-product-select/form-product-select.component';
import { SortProductsPipe } from './ingredients-form/form-product/form-product-select/sort-products.pipe';
import { FilterProductsPipe } from './ingredients-form/form-product/form-product-select/filter-products.pipe';
import { RawButtonModule } from '../../../../shared/component/raw-button/raw-button.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IngredientsFormComponent } from './ingredients-form/ingredients-form.component';
import { IngredientsTableFormComponent } from './ingredients-form/ingredients-table-form/ingredients-table-form.component';

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
    RawButtonModule,
    FontAwesomeModule,
  ],
  declarations: [
    RecipeFormComponent,
    FormProductComponent,
    FormProductSelectComponent,
    SortProductsPipe,
    FilterProductsPipe,
    IngredientsFormComponent,
    IngredientsTableFormComponent,
  ],
  exports: [
    RecipeFormComponent
  ]
})
export class RecipeFormModule { }
