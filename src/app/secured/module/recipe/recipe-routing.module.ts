import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesListComponent } from './recipe-list/recipes-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

const routes: Routes = [
  { path: '', component: RecipesListComponent },
  { path: 'new', component: RecipeCreateComponent },
  { path: ':id', component: RecipeDetailsComponent },
  { path: ':id/edit', component: RecipeEditComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipeRoutingModule { }
