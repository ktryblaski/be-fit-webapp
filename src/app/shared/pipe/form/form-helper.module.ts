import { NgModule } from '@angular/core';
import { FormControlPipe } from './form-control.pipe';
import { FormGroupPipe } from './form-group.pipe';
import { FormArrayPipe } from './form-array.pipe';
import { FormArrayControlsPipe } from './form-array-controls.pipe';
import { FormArrayGroupsPipe } from './form-array-groups.pipe';

@NgModule({
  declarations: [FormControlPipe, FormGroupPipe, FormArrayPipe, FormArrayControlsPipe, FormArrayGroupsPipe],
  exports: [FormControlPipe, FormGroupPipe, FormArrayPipe, FormArrayControlsPipe, FormArrayGroupsPipe],
})
export class FormHelperModule {}
