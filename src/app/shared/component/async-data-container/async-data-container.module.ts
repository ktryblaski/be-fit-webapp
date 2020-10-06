import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsyncDataContainerComponent } from './async-data-container.component';
import { SlotDirective } from './slot.directive';
import { SpinnerModule } from '../spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    SpinnerModule
  ],
  declarations: [
    AsyncDataContainerComponent,
    SlotDirective
  ],
  exports: [
    AsyncDataContainerComponent,
    SlotDirective
  ]
})
export class AsyncDataContainerModule { }
