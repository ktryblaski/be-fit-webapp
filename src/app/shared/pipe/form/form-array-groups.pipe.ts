import { Pipe, PipeTransform } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Pipe({
  name: 'formArrayGroups',
})
export class FormArrayGroupsPipe implements PipeTransform {
  transform(formArray: FormArray): FormGroup[] {
    return formArray.controls as FormGroup[];
  }
}
