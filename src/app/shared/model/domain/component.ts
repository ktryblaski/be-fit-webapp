import {Macronutrients} from "./macronutrients";

export interface Component {
  id: number,
  name: string,
  macronutrients: Macronutrients;
}
