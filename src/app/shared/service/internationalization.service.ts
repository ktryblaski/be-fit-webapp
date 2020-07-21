import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InternationalizationService {

  readonly MEAL_TYPE = {
    'BREAKFAST': 'Breakfast',
    'LUNCH': 'Lunch',
    'DINNER': 'Dinner',
    'SUPPER': 'Supper',
    'BEFORE_WORKOUT': 'Before Workout',
    'AFTER_WORKOUT': 'After Workout'
  };

}
