import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {ComponentsListComponent} from "./components-list/components-list.component";
import {ComponentRoutingModule} from "./component-routing.module";
import {SpinnerModule} from "../../shared/component/spinner/spinner.module";
import { ComponentsTableComponent } from './components-list/components-table/components-table.component';
import {CaloriesCalculatorModule} from "../../shared/pipe/calories-calculator.module";

@NgModule({
  declarations: [
    ComponentsListComponent,
    ComponentsTableComponent
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    SpinnerModule,
    CaloriesCalculatorModule
  ]
})
export class ComponentModule {

}
