import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MealsListComponent} from "./meals-list/meals-list.component";
import {MealDetailsComponent} from "./meal-details/meal-details.component";
import {MealCreateComponent} from "./meal-create/meal-create.component";
import {MealEditComponent} from "./meal-edit/meal-edit.component";

const routes: Routes = [
  {path: '', component: MealsListComponent},
  {path: 'new', component: MealCreateComponent},
  {path: ':id', component: MealDetailsComponent},
  {path: ':id/edit', component: MealEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MealRoutingModule { }
