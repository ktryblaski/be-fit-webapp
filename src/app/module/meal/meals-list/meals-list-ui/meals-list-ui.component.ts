import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MealView} from "../../../../shared/model/domain/meal";

@Component({
  selector: 'app-meals-list-ui',
  templateUrl: './meals-list-ui.component.html',
  styleUrls: ['./meals-list-ui.component.scss']
})
export class MealsListUiComponent {

  @Input() meals: MealView[]
  @Output() clickId: EventEmitter<number> = new EventEmitter<number>();

  handleClickId(id: number) {
    this.clickId.next(id);
  }

}
