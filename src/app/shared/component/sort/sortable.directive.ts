import { Directive, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Sort } from './-model/sort';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { SortOrder } from './-model/sort-order';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: 'table[sortable]'
})
export class SortableDirective<T extends string = string>  implements OnChanges {

  @Input() sort: Sort<T>;
  @Output() sortChange = new EventEmitter<Sort<T>>();

  private readonly activeSort = new BehaviorSubject<Sort<T>>(null);

  readonly sort$: Observable<Sort<T>> = this.activeSort.pipe(distinctUntilChanged());

  toggleSort(sortHeader: T): void {
    const activeSort = this.activeSort.value;

    if (!activeSort || activeSort.sortBy !== sortHeader) {
      this.changeSort({ sortBy: sortHeader, sortOrder: SortOrder.ASC });
    } else {
      activeSort.sortOrder === SortOrder.ASC
        ? this.changeSort({ sortBy: sortHeader, sortOrder: SortOrder.DESC })
        : this.changeSort(null);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.sort) {
      this.activeSort.next(this.sort);
    }
  }

  private changeSort(sort: Sort<T>): void {
    this.activeSort.next(sort);
    this.sortChange.next(sort);
  }

}
