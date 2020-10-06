import { Component, OnInit } from '@angular/core';
import { ProductsListService } from './products-list.service';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/model/domain/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import { ProductCreateDialogComponent } from '../product-create-dialog/product-create-dialog.component';
import { ProductFormValue } from '../product-create-dialog/product-create-form/-shared/product-form-value';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService]
})
export class ProductsListComponent implements OnInit {

  public products$: Observable<Product[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public creating$: Observable<boolean>;

  constructor(private service: ProductsListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this.service.products$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;
    this.creating$ = this.service.creating$;

    this.service.load();
  }

  handleClick(product: Product): void {
    this.dialog.open(ProductDetailsDialogComponent, {
      data: {
        productId: product.id
      },
      width: '400px'
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
