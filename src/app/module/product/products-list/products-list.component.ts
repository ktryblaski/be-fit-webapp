import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductsListService} from "./products-list.service";
import {Observable, Subscription} from "rxjs";
import {Product} from "../../../shared/model/domain/product";
import {MatDialog} from "@angular/material/dialog";
import {ProductDialogComponent} from "../product-dialog/product-dialog.component";
import {
  ProductCreateDialogResult,
  ProductDialogCreateComponent
} from "../product-dialog-create/product-dialog-create.component";

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

  handleClickId(id: number): void {
    this.dialog.open(ProductDialogComponent, {
      data: {
        productId: id
      },
      width: '400px'
    });
  }

  handleAddNewProduct(): void {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.dialog.open(ProductDialogCreateComponent, {
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
