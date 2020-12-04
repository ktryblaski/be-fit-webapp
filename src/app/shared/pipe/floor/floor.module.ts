import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloorPipe } from './floor.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FloorPipe
  ],
  exports: [
    FloorPipe
  ]
})
export class FloorModule { }
