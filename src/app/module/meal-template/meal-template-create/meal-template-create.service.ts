import {Injectable} from '@angular/core';
import {BehaviorSubject, EMPTY, merge, noop, Observable, Subject, Subscription} from 'rxjs';
import {catchError, distinctUntilChanged, finalize, ignoreElements, switchMap, tap} from 'rxjs/operators';
import {NotificationSeverity} from '../../../shared/component/notification/notification';
import {NotificationService} from '../../../shared/component/notification/notification.service';
import {Router} from '@angular/router';
import {MealTemplateFormValue} from '../meal-template-form/-model/meal-template-form-value';
import {MealTemplateRestService} from '../../../shared/service/rest/meal-template-rest.service';
import {ProductRestService} from '../../../shared/service/rest/product-rest.service';
import {MealTemplateFormDataSource} from '../meal-template-form/-model/meal-template-form-data-source';
import {MealTemplateCU} from '../../../shared/model/domain/meal-template';

@Injectable()
export class MealTemplateCreateService {

  private readonly saveAction = new Subject<MealTemplateFormValue>();
  private readonly loadAction = new Subject<void>();

  private readonly saving = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly dataSource = new BehaviorSubject<MealTemplateFormDataSource>(null);

  private subscription: Subscription;

  readonly saving$: Observable<boolean> = this.saving.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly dataSource$: Observable<MealTemplateFormDataSource> = this.dataSource.pipe(distinctUntilChanged());


  constructor(private restService: MealTemplateRestService,
              private productRestService: ProductRestService,
              private notificationService: NotificationService,
              private router: Router) {

    this.subscription = merge(
      this.loadEffect(),
      this.saveEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  save(formValue: MealTemplateFormValue): void {
    this.saveAction.next(formValue);
  }

  private saveEffect(): Observable<never> {
    return this.saveAction.pipe(
      tap(() => {
        this.saving.next(true);
      }),
      switchMap((formValue) => this.restService.create(this.mapToCreate(formValue)).pipe(
        tap((id) => {
          this.router.navigate(['meal-template', id]);
          this.notificationService.show({
            message: 'New meal has been added',
            severity: NotificationSeverity.SUCCESS
          });
        }),
        catchError(error => {
          console.error(error);
          this.saving.next(false);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          });
          return EMPTY;
        }),
        finalize(() => {
          this.saving.next(false);
        })
      )),
      ignoreElements()
    );
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loading.next(true);
      }),
      switchMap(() => this.productRestService.getProducts().pipe(
        tap((products) => {
          this.dataSource.next({products});
          this.loaded.next(true);
        }),
        catchError(error => {
          console.error(error);
          this.notificationService.show({
            message: 'An error has occurred',
            severity: NotificationSeverity.DANGER
          });
          return EMPTY;
        }),
        finalize(() => {
          this.loading.next(false);
        })
      )),
      ignoreElements()
    );
  }

  private mapToCreate(formValue: MealTemplateFormValue): MealTemplateCU {
    return {
      id: null,
      name: formValue.name,
      description: formValue.description,
      ingredients: formValue.ingredients.map(i => ({productId: i.product.id, weight: i.weight}))
    };
  }

}
