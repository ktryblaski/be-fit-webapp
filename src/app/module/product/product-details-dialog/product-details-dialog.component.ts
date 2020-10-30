import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDetailsDialogService } from './product-details-dialog.service';
import { combineLatest, merge, noop, Observable, Subscription } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { filter, map, tap } from 'rxjs/operators';

export interface ProductDialogData {
  productId: number;
}

@Component({
  selector: 'app-product-details-dialog',
  templateUrl: './product-details-dialog.component.html',
  styleUrls: ['./product-details-dialog.component.scss'],
  providers: [ProductDetailsDialogService],
})
export class ProductDetailsDialogComponent implements OnInit, OnDestroy {
  public product$: Observable<Product>;
  public loaded$: Observable<boolean>;
  public pending$: Observable<boolean>;

  private subscription: Subscription;
  private saved = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: ProductDialogData,
    private dialogRef: MatDialogRef<ProductDetailsDialogComponent>,
    private service: ProductDetailsDialogService
  ) {}

  ngOnInit(): void {
    this.product$ = this.service.product$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([this.service.loading$, this.service.saving$]).pipe(map(([loading, saving]) => loading || saving));

    // we listen to backdrop click or escape click in order to close dialog and pass whether favourite value has been changed
    this.subscription = merge(
      this.dialogRef.keydownEvents().pipe(
        filter(event => event.key === 'Escape'),
        tap(() => this.dialogRef.close(this.saved))
      ),
      this.dialogRef.backdropClick().pipe(tap(() => this.dialogRef.close(this.saved))),
      this.service.saved$.pipe(tap(saved => (this.saved = saved)))
    ).subscribe(noop);

    this.service.load(this.data.productId);
  }

  handleToggleFavourite(): void {
    this.service.toggleFavourite();
  }

  handleExit(): void {
    this.dialogRef.close(this.saved);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
