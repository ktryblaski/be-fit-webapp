import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDirective } from './table/table.directive';
import { LinkDirective } from './link/link.directive';
import { HeaderDirective } from './header/header.directive';
import { TitleDirective } from './header/title.directive';
import { ActionsDirective } from './header/actions.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TableDirective,
    LinkDirective,
    HeaderDirective,
    TitleDirective,
    ActionsDirective
  ],
  exports: [
    TableDirective,
    LinkDirective,
    HeaderDirective,
    TitleDirective,
    ActionsDirective
  ]
})
export class HelperModule { }
