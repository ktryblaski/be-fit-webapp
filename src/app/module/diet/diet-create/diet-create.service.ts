import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {NotificationSeverity} from '../../../shared/component/notification/notification';
import {NotificationService} from '../../../shared/component/notification/notification.service';
import {Router} from '@angular/router';
import {DietFormHandler} from '../diet-form/diet-form-handler';
import {DietRestService} from '../../../shared/service/rest/diet-rest.service';
import {DietMapperService} from '../diet-form/diet-mapper.service';

@Injectable()
export class DietCreateService {

  private readonly saveAction = new Subject<DietFormHandler>();

  private readonly saving = new BehaviorSubject<boolean>(false);

  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: DietRestService,
              private notificationService: NotificationService,
              private mapper: DietMapperService,
              private router: Router) {
    this.subscription = this.saveEffect().subscribe(noop);
  }

  save(formHandler: DietFormHandler): void {
    this.saveAction.next(formHandler);
  }

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap((diet) => this.restService.create(this.mapper.map(diet)).pipe(
        tap((id) => {
          this.router.navigate(['diet', id]);
          this.notificationService.show({
            message: 'New diet has been added',
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
