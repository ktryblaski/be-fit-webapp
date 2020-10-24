import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { DayOfEatingDetailsService } from './day-of-eating-details.service';
import { Observable, Subscription } from 'rxjs';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-day-of-eating-details',
  templateUrl: './day-of-eating-details.component.html',
  styleUrls: ['./day-of-eating-details.component.scss'],
  providers: [DayOfEatingDetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingDetailsComponent implements OnInit, OnDestroy {
  readonly DATE_FORMAT = 'dd-MM-yyy';

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  dayOfEating$: Observable<DayOfEating>;

  private subscription: Subscription;

  constructor(private service: DayOfEatingDetailsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.dayOfEating$ = this.service.dayOfEating$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  handleEdit(): void {}

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
