import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Recipe } from '../../../../shared/model/domain/recipe';

@Component({
  selector: 'app-recipes-table',
  templateUrl: './recipes-table.component.html',
  styleUrls: ['./recipes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipesTableComponent {

  @Input() recipes: Recipe[];
  @Output() clickRow = new EventEmitter<Recipe>();

  handleClickRow(recipe: Recipe) {
    this.clickRow.next(recipe);
  }
}
