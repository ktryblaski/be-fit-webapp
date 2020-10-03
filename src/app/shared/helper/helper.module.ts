import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableDirective} from './table/table.directive';
import { LinkDirective } from './link/link.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableDirective,
    LinkDirective
  ],
  exports: [
    TableDirective,
    LinkDirective
  ]
})
export class HelperModule { }
