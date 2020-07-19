import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductCreateService} from "./product-create.service";
import {noop, Observable, Subscription} from "rxjs";
import {filter, tap} from "rxjs/operators";
import {ProductFormHandler} from "./product-form-handler";

export enum ProductCreateDialogResult {
  CREATED,
  NOTHING
}

@Component({
  selector: 'app-product-dialog-create',
  templateUrl: './product-dialog-create.component.html',
  styleUrls: ['./product-dialog-create.component.scss'],
  providers: [ProductCreateService]
})
export class ProductDialogCreateComponent implements OnInit, OnDestroy {

  public saving$: Observable<boolean>;

  readonly formHandler: ProductFormHandler = new ProductFormHandler();

  private subscription: Subscription;

  constructor(private service: ProductCreateService,
              private dialogRef: MatDialogRef<ProductDialogCreateComponent>) { }

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
