import { Macronutrients } from '../../model/domain/macronutrients';
import { Ingredient } from '../../model/domain/ingredient';
import {
  ingredientsCalories,
  ingredientsCarbohydrates,
  ingredientsFats,
  ingredientsProteins,
  ingredientsWeight,
} from './ingredients-calculator';

describe('ingredients-calculator', () => {
  const nuts: Macronutrients = { proteins: 15, fats: 61, carbohydrates: 17 };
  const banana: Macronutrients = { proteins: 1, fats: 0, carbohydrates: 23 };
  const rice: Macronutrients = { proteins: 3, fats: 0, carbohydrates: 28 };
  const coke: Macronutrients = { proteins: 0, fats: 0, carbohydrates: 10 };
  const avocado: Macronutrients = { proteins: 2, fats: 15, carbohydrates: 9 };
  const oliveOil: Macronutrients = { proteins: 0, fats: 100, carbohydrates: 0 };

  const ingredients1: Ingredient[] = [
    { product: { macronutrients: nuts, name: null, favourite: false }, weight: 30 },
    { product: { macronutrients: banana, name: null, favourite: false }, weight: 120 },
    { product: { macronutrients: rice, name: null, favourite: false }, weight: 90 },
  ];

  const ingredients2: Ingredient[] = [
    { product: { macronutrients: rice, name: null, favourite: false }, weight: 100 },
    { product: { macronutrients: avocado, name: null, favourite: false }, weight: 50 },
    { product: { macronutrients: oliveOil, name: null, favourite: false }, weight: 15 },
  ];

  const ingredients3: Ingredient[] = [{ product: { macronutrients: coke, name: null, favourite: false }, weight: 500 }];

  it('should calculate calories number correctly', () => {
    expect(ingredientsCalories(ingredients1)).toBe(429.9);
    expect(ingredientsCalories(ingredients2)).toBe(348.5);
    expect(ingredientsCalories(ingredients3)).toBe(200);
  });

  it('should calculate proteins number correctly', () => {
    expect(ingredientsProteins(ingredients1)).toBe(8.4);
    expect(ingredientsProteins(ingredients2)).toBe(4);
    expect(ingredientsProteins(ingredients3)).toBe(0);
  });

  it('should calculate fats number correctly', () => {
    expect(ingredientsFats(ingredients1)).toBe(18.3);
    expect(ingredientsFats(ingredients2)).toBe(22.5);
    expect(ingredientsFats(ingredients3)).toBe(0);
  });

  it('should calculate carbohydrates number correctly', () => {
    expect(ingredientsCarbohydrates(ingredients1)).toBe(57.89999999999999);
    expect(ingredientsCarbohydrates(ingredients2)).toBe(32.5);
    expect(ingredientsCarbohydrates(ingredients3)).toBe(50);
  });

  it('should calculate weight correctly', () => {
    expect(ingredientsWeight(ingredients1)).toBe(240);
    expect(ingredientsWeight(ingredients2)).toBe(165);
    expect(ingredientsWeight(ingredients3)).toBe(500);
  });
});
