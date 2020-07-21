import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductCreateDialogService} from "./product-create-dialog.service";
import {Observable, Subscription} from "rxjs";
import {filter} from "rxjs/operators";
import {ProductFormHandler} from "./product-form-handler";

export enum ProductCreateDialogResult {
  CREATED,
  NOTHING
}

@Component({
  selector: 'app-product-create-dialog',
  templateUrl: './product-create-dialog.component.html',
  styleUrls: ['./product-create-dialog.component.scss'],
  providers: [ProductCreateDialogService]
})
export class ProductCreateDialogComponent implements OnInit, OnDestroy {

  public saving$: Observable<boolean>;

  readonly formHandler: ProductFormHandler = new ProductFormHandler();

  private subscription: Subscription;

  constructor(private service: ProductCreateDialogService,
              private dialogRef: MatDialogRef<ProductCreateDialogComponent>) { }

  ngOnInit(): void {
    this.saving$ = this.service.saving$;
    this.subscription = this.service.saved$.pipe(
      filter((saved: boolean) => saved),
    ).subscribe(() => {
      this.dialogRef.close(ProductCreateDialogResult.CREATED)
    });
  }

  handleCreate(): void {
    this.service.create(this.formHandler);
  }

  handleCancel(): void {
    this.dialogRef.close(ProductCreateDialogResult.NOTHING);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
