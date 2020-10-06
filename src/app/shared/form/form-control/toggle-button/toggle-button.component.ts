import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToggleButtonComponent),
      multi: true
    }
  ]

})
export class ToggleButtonComponent implements ControlValueAccessor {

  value: any;
  disabled = false;

  onChanged: any = () => {};
  onTouched: any = () => {};

  setValue(value: any): void {
    this.writeValue(value);
    this.onChanged(value);
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (v: any) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

}
