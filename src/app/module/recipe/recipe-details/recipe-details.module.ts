import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeDetailsComponent } from './recipe-details.component';
import { MatButtonModule } from '@angular/material/button';
import { RecipeViewModule } from '../../../shared/component/recipe/recipe-view/recipe-view.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';
import { HelperModule } from '../../../shared/helper/helper.module';
import { RecipeRoutingModule } from '../recipe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    RecipeViewModule,
    SpinnerModule,
    HelperModule,
    RecipeRoutingModule
  ],
  declarations: [
    RecipeDetailsComponent
  ]
})
export class RecipeDetailsModule { }
