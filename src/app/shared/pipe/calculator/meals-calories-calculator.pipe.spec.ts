import { MealsCaloriesCalculatorPipe } from './meals-calories-calculator.pipe';

describe('MealsCaloriesCalculatorPipe', () => {
  it('create an instance', () => {
    const pipe = new MealsCaloriesCalculatorPipe();
    expect(pipe).toBeTruthy();
  });
});
