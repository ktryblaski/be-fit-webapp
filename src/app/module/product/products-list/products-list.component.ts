import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsListService } from './products-list.service';
import { combineLatest, Observable } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { ProductCreateDialogComponent } from '../product-create-dialog/product-create-dialog.component';
import { ProductFormValue } from '../product-create-form/model/product-form-value';
import { filter, map, tap } from 'rxjs/operators';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { ProductsSortBy } from './-model/products.sort-by';
import { ascending, Sort } from '../../../shared/component/sort/-model/sort';
import { Pagination } from '../../../shared/component/pagination/-model/pagination';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {

  products$: Observable<Product[]>;
  loaded$: Observable<boolean>;
  pending$: Observable<boolean>;
  total$: Observable<number>;

  sort: Sort<ProductsSortBy> = ascending(ProductsSortBy.NAME);
  pagination: Pagination = { page: 1, pageSize: 10 };

  constructor(private service: ProductsListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this.service.products$.pipe(
      tap(page => {
        this.pagination = { page: page.page + 1, pageSize: page.pageSize }
      }),
      map(page => page.results)
    );
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([
      this.service.loading$, this.service.creating$
    ]).pipe(
      map(([loading, saving]) => loading || saving)
    );
    this.total$ = this.service.products$.pipe(
      map(page => page.total)
    );

    this.load();
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

  handleClickRow(product: Product): void {
    const dialogConfig: MatDialogConfig = {
      data: { productId: product.id },
      disableClose: true,
      width: '400px'
    };

    this.dialog.open(ProductDetailsDialogComponent, dialogConfig).afterClosed().pipe(
      filter((saved: boolean) => saved === true)
    ).subscribe(() => {
      this.load();
    });
  }

  handleSortChange(sort: Sort<ProductsSortBy>): void {
    this.sort = sort ? { ...sort } : null;
    this.load();
  }

  handlePaginationChange(pagination: Pagination): void {
    this.pagination = { ...pagination };
    this.load();
  }

  private load(): void {
    this.service.load({
      sort: this.sort,
      pagination: this.pagination
    });
  }

}
