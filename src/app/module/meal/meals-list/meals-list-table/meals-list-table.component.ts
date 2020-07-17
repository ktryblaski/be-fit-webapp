import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MealView} from "../../../../shared/model/domain/meal";

@Component({
  selector: 'app-meals-list-table',
  templateUrl: './meals-list-table.component.html',
  styleUrls: ['./meals-list-table.component.scss']
})
export class MealsListTableComponent {

  @Input() meals: MealView[]

  @Output() clickId: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  handleClickId(id: number) {
    this.clickId.next(id);
  }

}
