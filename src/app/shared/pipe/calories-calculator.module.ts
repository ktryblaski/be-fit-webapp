import {NgModule} from "@angular/core";
import {CaloriesCalculatorPipe} from "./calories-calculator.pipe";

@NgModule({
  imports: [],
  declarations: [
    CaloriesCalculatorPipe
  ],
  exports: [
    CaloriesCalculatorPipe
  ]
})
export class CaloriesCalculatorModule {

}
