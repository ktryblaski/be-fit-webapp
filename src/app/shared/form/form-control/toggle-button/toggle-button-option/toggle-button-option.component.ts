import { Component, HostBinding, HostListener, Input } from '@angular/core';
import { ToggleButtonComponent } from '../toggle-button.component';

// TODO add invalid layout
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[appToggleButtonOption]',
  templateUrl: './toggle-button-option.component.html',
  styleUrls: ['./toggle-button-option.component.scss'],
})
export class ToggleButtonOptionComponent {
  // tslint:disable-next-line:no-input-rename
  @Input('appToggleButtonOption') value: any;
  @Input() disabled = false;

  constructor(private toggleButtonComponent: ToggleButtonComponent) {}

  @HostListener('click')
  handleClickOption(): void {
    if (!this.disabled) {
      this.toggleButtonComponent.handleClicked(this.value);
    }
  }

  @HostBinding('class.selected')
  get buttonSelected(): boolean {
    return this.value === this.toggleButtonComponent.value;
  }

  @HostBinding('class.disabled')
  get buttonDisabled(): boolean {
    return this.disabled;
  }
}
