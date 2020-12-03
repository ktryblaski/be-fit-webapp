import { TypedFormArray, TypedFormControl } from '../../../../shared/form/typed-form/typed-form';
import { Product } from '../../../product/-model/product';

export interface RecipeForm {
  name: string;
  description: string;
  ingredients: number[];
  product: Product;
}

export interface RecipeFormControls {
  name: TypedFormControl<string>;
  description: TypedFormControl<string>;
  ingredients: TypedFormArray<number>;
  product: TypedFormControl<Product>;
}
