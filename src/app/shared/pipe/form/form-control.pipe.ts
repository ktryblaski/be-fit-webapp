import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Pipe({
  name: 'formControl',
})
export class FormControlPipe implements PipeTransform {
  transform(control: AbstractControl): FormControl {
    return control as FormControl;
  }
}
