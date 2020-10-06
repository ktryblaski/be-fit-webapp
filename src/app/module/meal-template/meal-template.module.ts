import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealTemplatesListComponent } from './meal-templates-list/meal-templates-list.component';
import { MealTemplatesListUiComponent } from './meal-templates-list/meal-templates-list-ui/meal-templates-list-ui.component';
import { SpinnerModule } from '../../shared/component/spinner/spinner.module';
import { MatButtonModule } from '@angular/material/button';
import { CalculatorModule } from '../../shared/pipe/calculator/calculator.module';
import { NoTableDataModule } from '../../shared/component/no-table-data/no-table-data.module';
import { HelperModule } from '../../shared/helper/helper.module';
import { MealTemplateRoutingModule } from './meal-template-routing.module';
import { MealTemplateDetailsComponent } from './meal-template-details/meal-template-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MealTemplateFormModule } from './meal-template-form/meal-template-form.module';
import { MealTemplateCreateComponent } from './meal-template-create/meal-template-create.component';
import { MealTemplateEditComponent } from './meal-template-edit/meal-template-edit.component';
import { AsyncDataContainerModule } from '../../shared/component/async-data-container/async-data-container.module';
import { MealTemplateViewModule } from '../../shared/component/meal-template/meal-template-view/meal-template-view.module';

@NgModule({
  imports: [
    CommonModule,
    MealTemplateRoutingModule,
    SpinnerModule,
    MatButtonModule,
    CalculatorModule,
    NoTableDataModule,
    HelperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MealTemplateFormModule,
    AsyncDataContainerModule,
    MealTemplateViewModule
  ],
  declarations: [
    MealTemplatesListComponent,
    MealTemplatesListUiComponent,
    MealTemplateDetailsComponent,
    MealTemplateCreateComponent,
    MealTemplateEditComponent
  ]
})
export class MealTemplateModule { }
