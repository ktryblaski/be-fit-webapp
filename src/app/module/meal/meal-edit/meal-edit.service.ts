import {Injectable} from "@angular/core";
import {BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription} from "rxjs";
import {MealFormHandler} from "../meal-form/meal.form-handler";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";
import {NotificationSeverity} from "../../../shared/component/notification/notification";
import {MealRestService} from "../../../shared/service/rest/meal-rest.service";
import {NotificationService} from "../../../shared/component/notification/notification.service";
import {MealMapperService} from "../meal-form/meal-mapper.service";
import {Router} from "@angular/router";
import {Meal} from "../../../shared/model/domain/meal";

@Injectable()
export class MealEditService {

  private readonly saveAction = new Subject<MealFormHandler>();
  private readonly loadAction = new Subject<number>();

  private readonly meal = new BehaviorSubject<Meal>(null);
  private readonly mealFormHandler = new BehaviorSubject<MealFormHandler>(null);
  private readonly pending = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);

  readonly mealFormHandler$: Observable<MealFormHandler> = this.mealFormHandler.pipe(distinctUntilChanged());
  readonly pending$: Observable<boolean> = this.pending.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: MealRestService,
              private notificationService: NotificationService,
              private mapper: MealMapperService,
              private router: Router) {
    this.subscription = merge(
      this.loadEffect(),
      this.saveEffect()
    ).subscribe(noop);
  }

  load(id: number): void {
    this.loadAction.next(id);
  }

  save(formHandler: MealFormHandler): void {
    this.saveAction.next(formHandler);
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.pending.next(true);
      }),
      switchMap((id) => this.restService.getMeal(id).pipe(
        tap((meal) => {
          this.meal.next(meal);
          this.mealFormHandler.next(new MealFormHandler(meal));
          this.pending.next(false);
          this.loaded.next(true);
        }),
        catchError((error) => {
          console.error(error);
          this.pending.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          })
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.pending.next(true);
      }),
      switchMap((meal) => this.restService.update(this.mapper.map(meal), this.meal.value.id).pipe(
        tap((meal) => {
          this.router.navigate(['meal', meal.id]);
          this.notificationService.show({
            message: 'The meal has been saved',
            severity: NotificationSeverity.SUCCESS
          })

        }),
        catchError((error) => {
          console.error(error);
          this.pending.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          })
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  };

}
