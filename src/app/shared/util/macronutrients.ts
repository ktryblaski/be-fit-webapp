import {Macronutrients} from "../model/domain/macronutrients";

export function calculateMacronutrientsKCAL(macronutrients: Macronutrients) {
  if(!macronutrients) {
    return 0;
  }

  return macronutrients.carbohydrates * 4
    + macronutrients.proteins * 4
    + macronutrients.fats * 9;
}
