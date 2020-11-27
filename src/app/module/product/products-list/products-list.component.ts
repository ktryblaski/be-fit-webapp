import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsListService } from './products-list.service';
import { combineLatest, Observable } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { ProductCreateDialogComponent } from '../product-create-dialog/product-create-dialog.component';
import { ProductFormValue } from '../product-create-form/model/product-form-value';
import { filter, map } from 'rxjs/operators';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public loaded$: Observable<boolean>;
  public pending$: Observable<boolean>;

  constructor(private service: ProductsListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this.service.products$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([
      this.service.loading$, this.service.creating$
    ]).pipe(
      map(([loading, saving]) => loading || saving)
    );

    this.service.load();
  }

  handleClickRow(product: Product): void {
    const dialogConfig: MatDialogConfig = {
      data: { productId: product.id },
      disableClose: true,
      width: '400px'
    };

    this.dialog.open(ProductDetailsDialogComponent, dialogConfig).afterClosed().pipe(
      filter((saved: boolean) => saved === true)
    ).subscribe(() => {
      this.service.load();
    });
  }

  handleAddNewProduct(): void {
    const dialogConfig: MatDialogConfig = {
      width: '400px',
    };

    this.dialog.open(ProductCreateDialogComponent, dialogConfig).afterClosed().pipe(
      filter((formValue: ProductFormValue) => !!formValue)
    ).subscribe((formValue: ProductFormValue) => {
      this.service.create(formValue);
    });
  }

}
