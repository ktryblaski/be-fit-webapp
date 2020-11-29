import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ProductFormValue } from '../product-create-form/model/product-form-value';
import { merge, noop, Observable, Subscription } from 'rxjs';
import { ProductCreateDialogService } from './product-create-dialog.service';
import { filter, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-product-create-dialog',
  templateUrl: './product-create-dialog.component.html',
  styleUrls: ['./product-create-dialog.component.scss'],
  providers: [ProductCreateDialogService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCreateDialogComponent implements OnInit {

  creating$: Observable<boolean>;

  private subscription: Subscription;

  private creating = false;

  constructor(private service: ProductCreateDialogService,
              private dialogRef: MatDialogRef<ProductCreateDialogComponent>) { }

  ngOnInit(): void {
    this.creating$ = this.service.creating$.pipe(
      tap(() => this.creating = true)
    );

    this.subscription = merge(
      this.dialogRef.keydownEvents().pipe(
        withLatestFrom(this.service.creating$),
        filter(([event, creating]) => event.key === 'Escape' && !creating),
        tap(() => this.dialogRef.close())
      ),
      this.dialogRef.backdropClick().pipe(
        withLatestFrom(this.service.creating$),
        filter(([, creating]) => !creating),
        tap(() => this.dialogRef.close())
      ),
      this.service.created$.pipe(
        filter(created => created),
        tap(() => this.dialogRef.close(true))
      )
    ).subscribe(noop);
  }

  handleCreate(formValue: ProductFormValue): void {
    this.service.create(formValue);
  }

  handleCancel(): void {
    this.dialogRef.close();
  }

}
