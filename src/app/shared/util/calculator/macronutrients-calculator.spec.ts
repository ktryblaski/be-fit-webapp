import { Macronutrients } from '../../model/domain/macronutrients';
import {
  macronutrientsCalories,
  macronutrientsCaloriesForWeight, macronutrientsCarbohydratesForWeight,
  macronutrientsFatsForWeight,
  macronutrientsProteinsForWeight
} from './macronutrients-calculator';

describe('macronutrients-calculator', () => {

  const nuts: Macronutrients = {proteins: 15, fats: 61, carbohydrates: 17};
  const banana: Macronutrients = {proteins: 1, fats: 0, carbohydrates: 23};
  const rice: Macronutrients = {proteins: 3, fats: 0, carbohydrates: 28};
  const coke: Macronutrients = {proteins: 0, fats: 0, carbohydrates: 10};
  const avocado: Macronutrients = {proteins: 2, fats: 15, carbohydrates: 9};
  const oliveOil: Macronutrients = {proteins: 0, fats: 100, carbohydrates: 0};

  it('should calculate calories number correctly', () => {
    expect(macronutrientsCalories(nuts)).toBe(677);
    expect(macronutrientsCalories(banana)).toBe(96);
    expect(macronutrientsCalories(rice)).toBe(124);
    expect(macronutrientsCalories(coke)).toBe(40);
    expect(macronutrientsCalories(avocado)).toBe(179);
    expect(macronutrientsCalories(oliveOil)).toBe(900);
  });

  it('should calculate calories number for weight correctly', () => {
    expect(macronutrientsCaloriesForWeight(nuts, 50)).toBe(338.5);
    expect(macronutrientsCaloriesForWeight(banana)).toBe(96);
    expect(macronutrientsCaloriesForWeight(rice, 0)).toBe(0);
    expect(macronutrientsCaloriesForWeight(coke, 100)).toBe(40);
    expect(macronutrientsCaloriesForWeight(avocado, 23)).toBe(41.17);
    expect(macronutrientsCaloriesForWeight(oliveOil, 1)).toBe(9);
  });

  it('should calculate proteins number for weight correctly', () => {
    expect(macronutrientsProteinsForWeight(nuts, 50)).toBe(7.5);
    expect(macronutrientsProteinsForWeight(banana)).toBe(1);
    expect(macronutrientsProteinsForWeight(rice, 0)).toBe(0);
    expect(macronutrientsProteinsForWeight(coke, 100)).toBe(0);
    expect(macronutrientsProteinsForWeight(avocado, 23)).toBe(0.46);
    expect(macronutrientsProteinsForWeight(oliveOil, 1)).toBe(0);
  });

  it('should calculate fats number for weight correctly', () => {
    expect(macronutrientsFatsForWeight(nuts, 50)).toBe(30.5);
    expect(macronutrientsFatsForWeight(banana)).toBe(0);
    expect(macronutrientsFatsForWeight(rice, 0)).toBe(0);
    expect(macronutrientsFatsForWeight(coke, 100)).toBe(0);
    expect(macronutrientsFatsForWeight(avocado, 23)).toBe(3.45);
    expect(macronutrientsFatsForWeight(oliveOil, 1)).toBe(1);
  });

  it('should calculate carbohydrates number for weight correctly', () => {
    expect(macronutrientsCarbohydratesForWeight(nuts, 50)).toBe(8.5);
    expect(macronutrientsCarbohydratesForWeight(banana)).toBe(23);
    expect(macronutrientsCarbohydratesForWeight(rice, 0)).toBe(0);
    expect(macronutrientsCarbohydratesForWeight(coke, 100)).toBe(10);
    expect(macronutrientsCarbohydratesForWeight(avocado, 23)).toBe(2.0700000000000003);
    expect(macronutrientsCarbohydratesForWeight(oliveOil, 1)).toBe(0);
  });

});
