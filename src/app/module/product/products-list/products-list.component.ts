import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsListService} from "./products-list.service";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../../shared/model/domain/product";
import {MatDialog} from "@angular/material/dialog";
import {ProductDetailsDialogComponent} from "../product-details-dialog/product-details-dialog.component";
import {
  ProductCreateDialogResult,
  ProductCreateDialogComponent
} from "../product-create-dialog/product-create-dialog.component";

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  providers: [ProductsListService]
})
export class ProductsListComponent implements OnInit, OnDestroy {

  public products$: Observable<Product[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  private subscription: Subscription

  constructor(private service: ProductsListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.products$ = this.service.products$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

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
    if(this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.dialog.open(ProductCreateDialogComponent, {
      width: '400px'
    }).afterClosed()
      .subscribe((result: ProductCreateDialogResult) => {
        if(result === ProductCreateDialogResult.CREATED) {
          this.service.load();
        }
      });
  }

  ngOnDestroy(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
