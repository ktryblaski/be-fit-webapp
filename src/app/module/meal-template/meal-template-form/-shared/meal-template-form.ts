import { TypedFormArray, TypedFormControl } from '../../../../shared/form/typed-form/typed-form';
import { Product } from '../../../product/-model/product';

export interface MealTemplateForm {
  name: string;
  description: string;
  ingredients: number[];
  product: Product;
}

export interface MealTemplateFormControls {
  name: TypedFormControl<string>;
  description: TypedFormControl<string>;
  ingredients: TypedFormArray<number>;
  product: TypedFormControl<Product>;
}
