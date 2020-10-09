import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductFormValue } from './product-create-form/-shared/product-form-value';

@Component({
  selector: 'app-product-create-dialog',
  templateUrl: './product-create-dialog.component.html',
  styleUrls: ['./product-create-dialog.component.scss']
})
export class ProductCreateDialogComponent {

  constructor(private dialogRef: MatDialogRef<ProductCreateDialogComponent>) { }

  handleCreate(formValue: ProductFormValue): void {
    this.dialogRef.close(formValue);
  }

}
