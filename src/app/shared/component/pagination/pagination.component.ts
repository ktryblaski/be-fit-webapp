import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Pagination } from './-model/pagination';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginationComponent {

  @Input() pagination: Pagination;
  @Input() total: number;
  @Input() pageSizes = [5, 10, 25, 100];
  @Output() paginationChange = new EventEmitter<Pagination>();

  handlePageChange(page: number): void {
    this.paginationChange.next({ page, pageSize: this.pagination.pageSize });
  }

  handlePageSizeChange(pageSize: number): void {
    const currentPageFirstRowIndex = this.pagination.pageSize * (this.pagination.page - 1) + 1;
    const page = Math.ceil(currentPageFirstRowIndex / pageSize);

    this.paginationChange.next({ page, pageSize });
  }

}
