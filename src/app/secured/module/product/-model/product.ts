import { Macronutrients } from '../../../../shared/model/domain/macronutrients';

export interface Product {
  id?: number;
  name: string;
  macronutrients: Macronutrients;
  favourite: boolean;
}
