import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-new-product-dialog',
  templateUrl: './new-product-dialog.component.html',
  styleUrls: ['./new-product-dialog.component.scss']
})
export class NewProductDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NewProductDialogComponent>) { }

  ngOnInit(): void {
  }

  handleSubmit(): void {

  }

  handleCancel(): void {
    this.dialogRef.close();
  }

}
