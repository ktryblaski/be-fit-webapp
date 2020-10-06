import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { DayOfEating } from '../../../shared/model/domain/day-of-eating';
import { ActivatedRoute, Router } from '@angular/router';
import { DayOfEatingEditService } from './day-of-eating-edit.service';
import { DayOfEatingFormDataSource } from '../day-of-eating-form/-shared/day-of-eating-form-data-source';
import { DayOfEatingFormValue } from '../day-of-eating-form/-shared/day-of-eating-form-value';

@Component({
  selector: 'app-day-of-eating-edit',
  templateUrl: './day-of-eating-edit.component.html',
  styleUrls: ['./day-of-eating-edit.component.scss'],
  providers: [DayOfEatingEditService]
})
export class DayOfEatingEditComponent implements OnInit, OnDestroy {

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  dayOfEating$: Observable<DayOfEating>;
  dataSource$: Observable<DayOfEatingFormDataSource>;

  private subscription: Subscription;

  constructor(private service: DayOfEatingEditService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.dayOfEating$ = this.service.dayOfEating$;
    this.dataSource$ = this.service.dataSource$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  handleSave(formValue: DayOfEatingFormValue): void {
    this.service.save(formValue);
  }

  handleCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
