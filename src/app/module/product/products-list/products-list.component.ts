import { Component, OnInit } from '@angular/core';
import { ProductsListService } from './products-list.service';
import { combineLatest, Observable } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { ProductCreateDialogComponent } from '../product-create-dialog/product-create-dialog.component';
import { ProductFormValue } from '../product-create-form/-shared/product-form-value';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService]
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
    this.pending$ = combineLatest([this.service.loading$, this.service.creating$]).pipe(
      map(([loading, saving]) => loading || saving)
    );

    this.service.load();
  }

  handleClick(product: Product): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: {
        productId: product.id
      },
      disableClose: true,
      width: '400px'
    }).afterClosed().subscribe((saved: boolean) => {
      if (saved) {
        this.service.load();
      }
    });
  }

  handleAddNewProduct(): void {
    this.dialog.open(ProductCreateDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe((formValue: ProductFormValue) => {
      if (formValue) {
        this.service.create(formValue);
      }
    });
  }

}
