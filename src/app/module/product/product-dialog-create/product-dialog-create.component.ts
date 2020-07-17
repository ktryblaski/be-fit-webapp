import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-product-dialog-create',
  templateUrl: './product-dialog-create.component.html',
  styleUrls: ['./product-dialog-create.component.scss']
})
export class ProductDialogCreateComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<ProductDialogCreateComponent>) { }

  ngOnInit(): void {
  }

  handleSubmit(): void {

  }

  handleCancel(): void {
    this.dialogRef.close();
  }

}
