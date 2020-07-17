import { Component, OnInit } from '@angular/core';
import {MealsListService} from "./meals-list.service";
import {MatDialog} from "@angular/material/dialog";
import {Observable} from "rxjs";
import {MealView} from "../../../shared/model/domain/meal";

@Component({
  selector: 'app-meals-list',
  templateUrl: './meals-list.component.html',
  styleUrls: ['./meals-list.component.scss'],
  providers: [MealsListService]
})
export class MealsListComponent implements OnInit {

  public meals$: Observable<MealView[]>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: MealsListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.meals$ = this.service.meals$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.service.load();
  }

  handleClickId(id: number): void {
    // this.dialog.open(MealDialogComponent, {
    //   data: {
    //     productId: id
    //   },
    //   width: '400px'
    // });
  }

  handleAddNewMeal(): void {
    // this.dialog.open(MealDialogComponent, {
    //   width: '400px'
    // });
  }

}
