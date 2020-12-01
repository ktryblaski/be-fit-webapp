import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-size',
  templateUrl: './page-size.component.html',
  styleUrls: ['./page-size.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageSizeComponent {

  @Input() pageSize: number;
  @Input() pageSizes: number[];
  @Output() pageSizeChange = new EventEmitter<number>();

  handlePageSizeClick(pageSize: number): void {
    this.pageSizeChange.next(pageSize);
  }

}
