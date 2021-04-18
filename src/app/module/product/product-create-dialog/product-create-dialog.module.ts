import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateDialogComponent } from './product-create-dialog.component';
import { ProductCreateFormModule } from '../product-create-form/product-create-form.module';
import { SpinnerModule } from '../../../shared/component/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    ProductCreateFormModule,
    SpinnerModule
  ],
  declarations: [
    ProductCreateDialogComponent
  ]
})
export class ProductCreateDialogModule { }
