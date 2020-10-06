import { Component, Input } from '@angular/core';
import { Ingredient } from '../../../model/domain/ingredient';

@Component({
  selector: 'app-ingredients-table',
  templateUrl: './ingredients-table.component.html',
  styleUrls: ['./ingredients-table.component.scss']
})
export class IngredientsTableComponent {

  @Input() ingredients: Ingredient[];

}
