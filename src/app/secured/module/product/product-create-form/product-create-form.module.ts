import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateFormComponent } from './product-create-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { HelperModule } from '../../../../shared/helper/helper.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HelperModule
  ],
  declarations: [
    ProductCreateFormComponent
  ],
  exports: [
    ProductCreateFormComponent
  ]
})
export class ProductCreateFormModule { }
