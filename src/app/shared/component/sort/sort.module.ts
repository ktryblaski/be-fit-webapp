import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortableDirective } from './sortable.directive';
import { SortHeaderComponent } from './sort-header/sort-header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    SortableDirective,
    SortHeaderComponent
  ],
  exports: [
    SortableDirective,
    SortHeaderComponent
  ]
})
export class SortModule { }
