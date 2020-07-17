import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MealsListComponent} from "./meals-list/meals-list.component";


const routes: Routes = [
  {path: '', component: MealsListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class MealRoutingModule {

}
