import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToggleButtonComponent } from './toggle-button.component';
import { ToggleButtonOptionComponent } from './toggle-button-option/toggle-button-option.component';

@NgModule({
  declarations: [ToggleButtonComponent, ToggleButtonOptionComponent],
  exports: [ToggleButtonComponent, ToggleButtonOptionComponent],
  imports: [CommonModule],
})
export class ToggleButtonModule {}
