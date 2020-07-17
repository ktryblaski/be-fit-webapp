import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {DietsListComponent} from "./diets-list/diets-list.component";


const routes: Routes = [
  {path: '', component: DietsListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class DietRoutingModule {

}
