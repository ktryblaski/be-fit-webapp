import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableDirective } from './table/table.directive';
import { LinkDirective } from './link/link.directive';
import { HeaderDirective } from './header/header.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [TableDirective, LinkDirective, HeaderDirective],
  exports: [TableDirective, LinkDirective, HeaderDirective],
})
export class HelperModule {}
