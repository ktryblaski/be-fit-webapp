import { Macronutrients } from './macronutrients';

export interface Product {
  id?: number;
  name: string;
  macronutrients: Macronutrients;
  favourite: boolean;
}
