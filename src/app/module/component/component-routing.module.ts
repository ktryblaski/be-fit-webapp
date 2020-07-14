import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ComponentsListComponent} from "./components-list/components-list.component";


const routes: Routes = [
  {path: '', component: ComponentsListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ComponentRoutingModule {

}
