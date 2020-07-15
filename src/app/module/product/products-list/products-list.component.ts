import {Component, OnInit} from '@angular/core';
import {ProductsListService} from "./products-list.service";
import {Observable} from "rxjs";
import {Product} from "../../../shared/model/domain/product";

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

  constructor(private service: ProductsListService) { }

  ngOnInit(): void {
    this.products$ = this.service.products$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load();
  }

  refresh() {
    this.service.load();
  }

}
