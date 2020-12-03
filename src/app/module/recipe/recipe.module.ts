import { NgModule } from '@angular/core';
import { RecipeCreateModule } from './recipe-create/recipe-create.module';
import { RecipeDetailsModule } from './recipe-details/recipe-details.module';
import { RecipeEditModule } from './recipe-edit/recipe-edit.module';
import { RecipeRoutingModule } from './recipe-routing.module';
import { RecipesListModule } from './recipe-list/recipes-list.module';

@NgModule({
  imports: [
    RecipeRoutingModule,
    RecipeCreateModule,
    RecipeDetailsModule,
    RecipeEditModule,
    RecipesListModule,
  ]
})
export class RecipeModule {}
