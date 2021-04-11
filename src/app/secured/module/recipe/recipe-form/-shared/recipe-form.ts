import { TypedFormArray, TypedFormControl } from '../../../../../shared/form/typed-form/typed-form';
import { Product } from '../../../product/-model/product';
import { ProductLite } from '../../../product/-model/product-lite';

export interface RecipeForm {
  name: string;
  description: string;
  weights: number[];
  product: ProductLite;
}

export interface RecipeFormControls {
  name: TypedFormControl<string>;
  description: TypedFormControl<string>;
  weights: TypedFormArray<number>;
  product: TypedFormControl<ProductLite>;
}
