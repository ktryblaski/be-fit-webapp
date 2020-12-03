import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditComponent } from './recipe-edit.component';
import { RecipeFormModule } from '../recipe-form/recipe-form.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    RecipeFormModule,
    SpinnerModule
  ],
  declarations: [
    RecipeEditComponent
  ]
})
export class RecipeEditModule { }
