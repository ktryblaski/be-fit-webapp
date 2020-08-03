import { Component, OnInit } from '@angular/core';
import {MealEditService} from "./meal-edit.service";
import {Observable, Subscription} from "rxjs";
import {MealFormHandler} from "../meal-form/meal.form-handler";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-meal-edit',
  templateUrl: './meal-edit.component.html',
  styleUrls: ['./meal-edit.component.scss'],
  providers: [MealEditService]
})
export class MealEditComponent implements OnInit {

  mealFormHandler$: Observable<MealFormHandler>;
  pending$: Observable<boolean>;
  loaded$: Observable<boolean>;

  private subscription: Subscription;

  constructor(private service: MealEditService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.mealFormHandler$ = this.service.mealFormHandler$;
    this.pending$ = this.service.pending$;
    this.loaded$ = this.service.loaded$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    })
  }

  handleUpdate(mealFormHandler: MealFormHandler): void {
    this.service.save(mealFormHandler);
  }

  handleCancel(): void {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
