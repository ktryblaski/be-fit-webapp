import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Pipe({
  name: 'formArrayControls',
})
export class FormArrayControlsPipe implements PipeTransform {
  transform(formArray: FormArray): FormControl[] {
    return formArray.controls as FormControl[];
  }
}
