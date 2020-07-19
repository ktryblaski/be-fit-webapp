import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MealView} from "../../../../shared/model/domain/meal";
import {InternationalizationService} from "../../../../shared/internationalization.service";

@Component({
  selector: 'app-meals-list-table',
  templateUrl: './meals-list-table.component.html',
  styleUrls: ['./meals-list-table.component.scss']
})
export class MealsListTableComponent {

  readonly MEAL_TYPE;

  @Input() meals: MealView[]
  @Output() clickId: EventEmitter<number> = new EventEmitter<number>();

  constructor(private i18nService: InternationalizationService) {
    this.MEAL_TYPE = i18nService.MEAL_TYPE;
  }

  handleClickId(id: number) {
    this.clickId.next(id);
  }

}
