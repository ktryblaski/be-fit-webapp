import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Host, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { SortableDirective } from '../sortable.directive';
import { SortOrder } from '../-model/sort-order';
import { Subscription } from 'rxjs';

@Component({
  selector: 'th[sortHeader]',
  templateUrl: './sort-header.component.html',
  styleUrls: ['./sort-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SortHeaderComponent implements OnInit, OnDestroy {

  readonly SortOrder = SortOrder;

  @Input() sortHeader: string;

  sortOrder: SortOrder = null;

  subscription: Subscription;

  constructor(@Host() private sortable: SortableDirective,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.subscription = this.sortable.sort$.subscribe(sort => {
      this.sortOrder = sort?.sortBy === this.sortHeader ? sort.sortOrder : null;
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click')
  click(): void {
    this.sortable.toggleSort(this.sortHeader);
  }

}
