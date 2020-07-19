import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {merge, Observable} from "rxjs";
import {Macronutrients} from "../../../../shared/model/domain/macronutrients";
import {mapTo} from "rxjs/operators";

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.scss']
})
export class ProductCreateFormComponent implements OnInit {

  @Input() form: FormGroup
  @Output() create: EventEmitter<never> = new EventEmitter<never>();
  @Output() cancel: EventEmitter<never> = new EventEmitter<never>();

  kcal$: Observable<Macronutrients>;

  ngOnInit(): void {
    this.kcal$ = merge(
      this.form.get('carbohydrates').valueChanges,
      this.form.get('proteins').valueChanges,
      this.form.get('fats').valueChanges
    ).pipe(
      mapTo({
        carbohydrates: this.form.get('carbohydrates').value || 0,
        proteins: this.form.get('proteins').value || 0,
        fats: this.form.get('fats').value || 0,
      } as Macronutrients)
    );
  }

  handleSubmit(): void {
    this.create.emit();
  }

  handleCancel(): void {
    this.cancel.emit();
  }

}
