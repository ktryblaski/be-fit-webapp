import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MealsListService } from './meals-list.service';
import { Observable } from 'rxjs';
import { MealView } from '../../../shared/model/domain/meal';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  providers: [MealsListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MealsListComponent implements OnInit {
  public meals$: Observable<MealView[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: MealsListService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.meals$ = this.service.meals$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load();
  }

  handleClick(meal: MealView): void {
    this.router.navigate([meal.id], { relativeTo: this.route });
  }

  handleAddNewMeal(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
