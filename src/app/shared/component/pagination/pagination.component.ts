import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from './-model/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent implements OnInit {

  @Input() pagination: Pagination;
  @Input() total: number;
  @Output() paginationChange = new EventEmitter<Pagination>();

  constructor() { }

  ngOnInit(): void {
  }

  first(): void {
    if (this.pagination.page === 1) {
      return;
    }

    this.paginationChange.next({
      page: 1,
      pageSize: this.pagination.pageSize
    });
  }

  previous(): void {
    if (this.pagination.page === 1) {
      return;
    }

    this.paginationChange.next({
      page: this.pagination.page - 1,
      pageSize: this.pagination.pageSize
    });
  }

  page(index: number): void {
    if (index < 1 || index > Math.ceil(this.total / this.pagination.pageSize)) {
      return;
    }

    this.paginationChange.next({
      page: index,
      pageSize: this.pagination.pageSize
    });
  }

  next(): void {
    if (this.pagination.page === Math.ceil(this.total / this.pagination.pageSize)) {
      return;
    }

    this.paginationChange.next({
      page: this.pagination.page + 1,
      pageSize: this.pagination.pageSize
    });
  }

  last(): void {
    if (this.pagination.page === Math.ceil(this.total / this.pagination.pageSize)) {
      return;
    }

    this.paginationChange.next({
      page: Math.ceil(this.total / this.pagination.pageSize),
      pageSize: this.pagination.pageSize
    });
  }

}
