import {Injectable} from '@angular/core';
import {MealRestService} from '../../../shared/service/rest/meal-rest.service';
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {NotificationSeverity} from '../../../shared/component/notification/notification';
import {NotificationService} from '../../../shared/component/notification/notification.service';
import {Router} from '@angular/router';
import {MealFormHandler} from '../meal-form/meal-form-handler';
import {MealMapperService} from '../meal-form/meal-mapper.service';

@Injectable()
export class MealCreateService {

  private readonly saveAction = new Subject<MealFormHandler>();

  private readonly saving = new BehaviorSubject<boolean>(false);

  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: MealRestService,
              private notificationService: NotificationService,
              private mapper: MealMapperService,
              private router: Router) {
    this.subscription = this.saveEffect().subscribe(noop);
  }

  save(formHandler: MealFormHandler): void {
    this.saveAction.next(formHandler);
  }

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap((meal) => this.restService.create(this.mapper.map(meal)).pipe(
        tap((id) => {
          this.router.navigate(['meal', id]);
          this.notificationService.show({
            message: 'New meal has been added',
            severity: NotificationSeverity.SUCCESS
          });
        }),
        catchError((error) => {
          console.error(error);
          this.saving.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          });
          return EMPTY;
        })
      )),
      ignoreElements()
    );
  }

}
