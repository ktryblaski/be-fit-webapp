import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {DietRoutingModule} from "./diet-routing.module";
import { DietsListComponent } from './diets-list/diets-list.component';

@NgModule({
  imports: [
    CommonModule,
    DietRoutingModule,
  ],
  declarations: [

  DietsListComponent]
})
export class DietModule {

}
