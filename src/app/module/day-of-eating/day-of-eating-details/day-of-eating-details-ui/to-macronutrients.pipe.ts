import { Pipe, PipeTransform } from '@angular/core';
import { DayOfEating } from '../../../../shared/model/domain/day-of-eating';
import { Macronutrients } from '../../../../shared/model/domain/macronutrients';
import { mealsCarbohydrates, mealsFats, mealsProteins } from '../../../../shared/util/calculator/meals-calculator';

@Pipe({
  name: 'toMacronutrients',
})
export class ToMacronutrientsPipe implements PipeTransform {

  transform(dayOfEating: DayOfEating): Macronutrients {
    return {
      proteins: Math.round(mealsProteins(dayOfEating.meals)),
      fats: Math.round(mealsFats(dayOfEating.meals)),
      carbohydrates: Math.round(mealsCarbohydrates(dayOfEating.meals))
    };
  }
}
