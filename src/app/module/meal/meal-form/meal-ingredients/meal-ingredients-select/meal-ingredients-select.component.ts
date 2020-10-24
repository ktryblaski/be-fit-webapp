import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MealIngredientsSelectService } from './meal-ingredients-select.service';
import { Observable, Subscription } from 'rxjs';
import { Product } from '../../../../../shared/model/domain/product';
import { MealFormHandler } from '../../meal-form-handler';
import { Ingredient } from '../../../../../shared/model/domain/ingredient';

@Component({
  selector: 'app-meal-ingredients-select',
  templateUrl: './meal-ingredients-select.component.html',
  styleUrls: ['./meal-ingredients-select.component.scss'],
  providers: [MealIngredientsSelectService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealIngredientsSelectComponent implements OnInit, OnDestroy {
  @Input() formHandler: MealFormHandler;
  @Output() addProduct: EventEmitter<Product> = new EventEmitter<Product>();

  selected = [];

  products$: Observable<Product[]>;
  loading$: Observable<boolean>;

  subscription: Subscription;

  constructor(private service: MealIngredientsSelectService) {}

  ngOnInit(): void {
    this.products$ = this.service.products$;
    this.loading$ = this.service.loading$;

    this.subscription = this.formHandler.form.get('ingredients').valueChanges.subscribe((values: Ingredient[]) => {
      this.selected = values.map(value => value.product.id);
    });

    this.selected = (this.formHandler.form.get('ingredients').value as Ingredient[]).map(value => value.product.id);

    this.service.load();
  }

  handleAddProduct(): void {
    this.addProduct.emit(this.formHandler.form.get('product').value);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
