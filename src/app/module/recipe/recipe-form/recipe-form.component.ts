import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { RecipeFormHandler } from './recipe-form-handler';
import { RecipeFormValue } from './-shared/recipe-form-value';
import { RecipeFormDataSource } from './-shared/recipe-form-data-source';
import { Recipe } from '../-model/recipe';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
  providers: [RecipeFormHandler],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeFormComponent implements OnChanges {

  @Input() recipe: Recipe | null;
  @Input() dataSource: RecipeFormDataSource;
  @Output() save = new EventEmitter<RecipeFormValue>();
  @Output() cancel = new EventEmitter();

  constructor(public formHandler: RecipeFormHandler) { }

  handleSubmit(): void {
    this.save.emit(this.formHandler.getValue());
  }

  handleCancel(): void {
    this.cancel.emit();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.recipe) {
      this.formHandler.setValue(this.recipe);
    }
  }
}
