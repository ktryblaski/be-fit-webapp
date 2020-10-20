import { Macronutrients } from '../../model/domain/macronutrients';
import { Ingredient } from '../../model/domain/ingredient';
import { mealsCalories, mealsCarbohydrates, mealsFats, mealsProteins, mealsWeight } from './meals-calculator';
import { Meal } from '../../model/domain/meal';

describe('ingredients-calculator', () => {

  const nuts: Macronutrients = {proteins: 15, fats: 61, carbohydrates: 17};
  const banana: Macronutrients = {proteins: 1, fats: 0, carbohydrates: 23};
  const rice: Macronutrients = {proteins: 3, fats: 0, carbohydrates: 28};
  const coke: Macronutrients = {proteins: 0, fats: 0, carbohydrates: 10};
  const avocado: Macronutrients = {proteins: 2, fats: 15, carbohydrates: 9};
  const oliveOil: Macronutrients = {proteins: 0, fats: 100, carbohydrates: 0};

  const ingredients1: Ingredient[] = [
    {product: {macronutrients: nuts, name: null, favourite: false}, weight: 30},
    {product: {macronutrients: banana, name: null, favourite: false}, weight: 120},
    {product: {macronutrients: rice, name: null, favourite: false}, weight: 90}
  ];

  const ingredients2: Ingredient[] = [
    {product: {macronutrients: rice, name: null, favourite: false}, weight: 100},
    {product: {macronutrients: avocado, name: null, favourite: false}, weight: 50},
    {product: {macronutrients: oliveOil, name: null, favourite: false}, weight: 15}
  ];

  const ingredients3: Ingredient[] = [
    {product: {macronutrients: coke, name: null, favourite: false}, weight: 500}
  ];

  const meals1: Meal[] = [
    {name: null, description: null, ingredients: ingredients1},
    {name: null, description: null, ingredients: ingredients3}
  ];
  const meals2: Meal[] = [
    {name: null, description: null, ingredients: ingredients2},
    {name: null, description: null, ingredients: ingredients3}
  ];

  it('should calculate calories number correctly', () => {
    expect(mealsCalories(meals1)).toBe(629.9);
    expect(mealsCalories(meals2)).toBe(548.5);
  });

  it('should calculate proteins number correctly', () => {
    expect(mealsProteins(meals1)).toBe(8.4);
    expect(mealsProteins(meals2)).toBe(4);
  });

  it('should calculate fats number correctly', () => {
    expect(mealsFats(meals1)).toBe(18.3);
    expect(mealsFats(meals2)).toBe(22.5);
  });

  it('should calculate carbohydrates number correctly', () => {
    expect(mealsCarbohydrates(meals1)).toBe(107.89999999999999);
    expect(mealsCarbohydrates(meals2)).toBe(82.5);
  });

  it('should calculate weight correctly', () => {
    expect(mealsWeight(meals1)).toBe(740);
    expect(mealsWeight(meals2)).toBe(665);
  });

});
