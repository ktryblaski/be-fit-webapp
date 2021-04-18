import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MealFormHandler } from '../meal-form/meal-form-handler';
import { MealCreateService } from './meal-create.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal-create',
  templateUrl: './meal-create.component.html',
  styleUrls: ['./meal-create.component.scss'],
  providers: [MealCreateService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealCreateComponent implements OnInit {
  formHandler: MealFormHandler = new MealFormHandler();

  saving$: Observable<boolean>;

  constructor(private service: MealCreateService, private router: Router) {}

  ngOnInit(): void {
    this.saving$ = this.service.saving$;
  }

  handleCreate(): void {
    this.service.save(this.formHandler);
  }

  handleCancel(): void {
    this.router.navigate(['meal']);
  }
}
