import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Sort } from '../../../../../shared/component/sort/-model/sort';
import { ProductsSortBy } from '../-model/products.sort-by';
import { Pagination } from '../../../../../shared/component/pagination/-model/pagination';
import { ProductLite } from '../../-model/product-lite';

@Component({
  selector: 'app-products-list-ui',
  templateUrl: './products-list-ui.component.html',
  styleUrls: ['./products-list-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListUiComponent {

  readonly ProductsSortBy = ProductsSortBy;

  @Input() products: ProductLite[];
  @Input() pagination: Pagination;
  @Input() sort: Sort<ProductsSortBy>;
  @Input() total: number;

  @Output() clickRow = new EventEmitter<ProductLite>();
  @Output() sortChange = new EventEmitter<Sort<ProductsSortBy>>();
  @Output() paginationChange = new EventEmitter<Pagination>();

  handleClickRow(product: ProductLite) {
    this.clickRow.next(product);
  }

  handleSortChange(sort: Sort<ProductsSortBy>): void {
    this.sortChange.next(sort);
  }

  handlePaginationChange(pagination: Pagination): void {
    this.paginationChange.next(pagination);
  }

}
