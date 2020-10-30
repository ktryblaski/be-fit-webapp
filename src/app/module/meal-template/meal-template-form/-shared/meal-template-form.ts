import { Product } from '../../../../shared/model/domain/product';
import { TypedFormArray, TypedFormControl } from '../../../../shared/form/typed-form/typed-form';

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
