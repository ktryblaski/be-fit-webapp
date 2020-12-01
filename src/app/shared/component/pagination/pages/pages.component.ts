import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from '../-model/pagination';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent {

  @Input() pagination: Pagination;
  @Input() total: number;
  @Output() pageChange = new EventEmitter<number>();

  first(): void {
    if (this.pagination.page === 1) {
      return;
    }

    this.pageChange.next(1);
  }

  previous(): void {
    if (this.pagination.page === 1) {
      return;
    }

    this.pageChange.next(this.pagination.page - 1);
  }

  page(index: number): void {
    if (index < 1 || index > Math.ceil(this.total / this.pagination.pageSize)) {
      return;
    }

    this.pageChange.next(index);
  }

  next(): void {
    if (this.pagination.page === Math.ceil(this.total / this.pagination.pageSize)) {
      return;
    }

    this.pageChange.next(this.pagination.page + 1);
  }

  last(): void {
    if (this.pagination.page === Math.ceil(this.total / this.pagination.pageSize)) {
      return;
    }

    this.pageChange.next(Math.ceil(this.total / this.pagination.pageSize));
  }

}
