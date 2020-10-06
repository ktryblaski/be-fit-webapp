import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MealTemplateDetailsService } from './meal-template-details.service';
import { MealTemplate } from '../../../shared/model/domain/meal-template';

@Component({
  selector: 'app-meal-template-details',
  templateUrl: './meal-template-details.component.html',
  styleUrls: ['./meal-template-details.component.scss'],
  providers: [MealTemplateDetailsService]
})
export class MealTemplateDetailsComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  public mealTemplate$: Observable<MealTemplate>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;
  public saving$: Observable<boolean>;

  constructor(private service: MealTemplateDetailsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mealTemplate$ = this.service.mealTemplate$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;
    this.saving$ = this.service.saving$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  handleActivate(): void {
    this.service.activate();
  }

  handleDeactivate(): void {
    this.service.deactivate();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
