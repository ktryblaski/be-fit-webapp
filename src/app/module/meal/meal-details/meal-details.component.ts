import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MealDetailsService } from './meal-details.service';
import { Meal } from '../../../shared/model/domain/meal';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.scss'],
  providers: [MealDetailsService],
})
export class MealDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;

  public meal$: Observable<Meal>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: MealDetailsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.meal$ = this.service.meal$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
