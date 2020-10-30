import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RawButtonComponent } from './raw-button.component';

@NgModule({
  declarations: [RawButtonComponent],
  exports: [RawButtonComponent],
  imports: [CommonModule],
})
export class RawButtonModule {}
