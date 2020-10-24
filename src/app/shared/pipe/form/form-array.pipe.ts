import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormArray } from '@angular/forms';

@Pipe({
  name: 'formArray',
})
export class FormArrayPipe implements PipeTransform {
  transform(control: AbstractControl): FormArray {
    return control as FormArray;
  }
}
