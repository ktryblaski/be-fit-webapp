import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DietsListComponent} from "./diets-list/diets-list.component";
import {DietDetailsComponent} from "./diet-details/diet-details.component";
import {DietCreateComponent} from "./diet-create/diet-create.component";
import {DietEditComponent} from "./diet-edit/diet-edit.component";


const routes: Routes = [
  {path: '', component: DietsListComponent},
  {path: 'new', component: DietCreateComponent},
  {path: ':id', component: DietDetailsComponent},
  {path: ':id/edit', component: DietEditComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DietRoutingModule {

}
