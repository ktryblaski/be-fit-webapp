import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recipe } from '../../../model/domain/recipe';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeViewComponent {
  @Input() recipe: Recipe;
}
