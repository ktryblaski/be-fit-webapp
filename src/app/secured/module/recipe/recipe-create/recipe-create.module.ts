import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeCreateComponent } from './recipe-create.component';
import { RecipeFormModule } from '../recipe-form/recipe-form.module';
import { SpinnerModule } from '../../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    RecipeFormModule,
    SpinnerModule
  ],
  declarations: [
    RecipeCreateComponent
  ]
})
export class RecipeCreateModule { }
