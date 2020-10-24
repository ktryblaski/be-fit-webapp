import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DietFormHandler } from '../../diet-form-handler';
import { MealView } from '../../../../../shared/model/domain/meal';
import { Observable, Subscription } from 'rxjs';
import { DietMealsSelectService } from './diet-meals-select.service';

@Component({
  selector: 'app-diet-meals-select',
  templateUrl: './diet-meals-select.component.html',
  styleUrls: ['./diet-meals-select.component.scss'],
  providers: [DietMealsSelectService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietMealsSelectComponent implements OnInit, OnDestroy {
  @Input() formHandler: DietFormHandler;
  @Output() addMeal: EventEmitter<MealView> = new EventEmitter<MealView>();

  selected = [];

  meals$: Observable<MealView[]>;
  loading$: Observable<boolean>;

  subscription: Subscription;

  constructor(private service: DietMealsSelectService) {}

  ngOnInit(): void {
    this.meals$ = this.service.meals$;
    this.loading$ = this.service.loading$;

    this.subscription = this.formHandler.form.get('meals').valueChanges.subscribe((values: MealView[]) => {
      this.selected = values.map(value => value.id);
    });

    this.selected = (this.formHandler.form.get('meals').value as MealView[]).map(value => value.id);

    this.service.load();
  }

  handleAddMeal(): void {
    this.addMeal.emit(this.formHandler.form.get('meal').value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
