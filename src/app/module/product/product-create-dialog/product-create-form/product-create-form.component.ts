import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {merge, Observable} from 'rxjs';
import {Macronutrients} from '../../../../shared/model/domain/macronutrients';
import {map} from 'rxjs/operators';
import {ProductFormHandler} from '../product-form-handler';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent implements OnInit {

  @Input() formHandler: ProductFormHandler;
  @Output() create: EventEmitter<never> = new EventEmitter<never>();
  @Output() cancel: EventEmitter<never> = new EventEmitter<never>();

  kcal$: Observable<Macronutrients>;

  ngOnInit(): void {
    this.kcal$ = merge(
      this.formHandler.form.get('carbohydrates').valueChanges,
      this.formHandler.form.get('proteins').valueChanges,
      this.formHandler.form.get('fats').valueChanges
    ).pipe(
      map(() => {
        return {
          carbohydrates: this.formHandler.form.get('carbohydrates').value,
          proteins: this.formHandler.form.get('proteins').value,
          fats: this.formHandler.form.get('fats').value,
        } as Macronutrients;
      })
    );
  }

  handleSubmit(): void {
    this.create.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
