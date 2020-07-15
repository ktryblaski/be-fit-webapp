import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProductDialogService} from "./product-dialog.service";
import {Observable} from "rxjs";
import {Product} from "../../../shared/model/domain/product";

export interface ProductDialogData {
  productId: number
}

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  providers: [ProductDialogService]
})
export class ProductDialogComponent implements OnInit {

  public product$: Observable<Product>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(@Inject(MAT_DIALOG_DATA) private data: ProductDialogData,
              private service: ProductDialogService) { }

  ngOnInit(): void {
    this.product$ = this.service.product$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load(this.data.productId);
  }

}
