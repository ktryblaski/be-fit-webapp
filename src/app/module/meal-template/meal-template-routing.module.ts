import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MealTemplatesListComponent} from './meal-templates-list/meal-templates-list.component';
import {MealTemplateDetailsComponent} from './meal-template-details/meal-template-details.component';
import {MealTemplateCreateComponent} from './meal-template-create/meal-template-create.component';
import {MealTemplateEditComponent} from './meal-template-edit/meal-template-edit.component';

const routes: Routes = [

  {path: '', component: MealTemplatesListComponent},
  {path: 'new', component: MealTemplateCreateComponent},
  {path: ':id', component: MealTemplateDetailsComponent},
  {path: ':id/edit', component: MealTemplateEditComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MealTemplateRoutingModule { }
