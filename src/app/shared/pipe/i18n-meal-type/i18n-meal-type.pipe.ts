import { Pipe, PipeTransform } from '@angular/core';
import {MealType} from "../../model/domain/meal";

@Pipe({
  name: 'i18nMealType'
})
export class I18nMealTypePipe implements PipeTransform {

  transform(mealType: MealType): string {
    if(!mealType) {
      return '';
    }

    switch (mealType) {
      case MealType.BREAKFAST:
        return 'Breakfast';

      case MealType.LUNCH:
        return 'Lunch';

      case MealType.DINNER:
        return 'Dinner';

      case MealType.SUPPER:
        return 'Supper';

      case MealType.BEFORE_WORKOUT:
        return 'Before Workout';

      case MealType.AFTER_WORKOUT:
        return 'After Workout';
    }
  }

}
