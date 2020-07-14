import {Injectable, OnDestroy} from "@angular/core";
import {ComponentRestService} from "../../../shared/rest/component-rest.service";
import {BehaviorSubject, merge, noop, Observable, Subject, Subscription, throwError} from "rxjs";
import {Component} from "../../../shared/model/domain/component";
import {catchError, distinctUntilChanged, ignoreElements, switchMap, tap} from "rxjs/operators";

@Injectable()
export class ComponentsListService implements OnDestroy {

  private readonly loadAction = new Subject();

  private readonly components = new BehaviorSubject<Component[]>(null);
  private readonly loaded = new BehaviorSubject<boolean>(false);
  private readonly loading = new BehaviorSubject<boolean>(false);

  readonly components$: Observable<Component[]> = this.components.pipe(distinctUntilChanged());
  readonly loaded$: Observable<boolean> = this.loaded.pipe(distinctUntilChanged());
  readonly loading$: Observable<boolean> = this.loading.pipe(distinctUntilChanged());

  private subscription: Subscription;

  constructor(private restService: ComponentRestService) {
    this.subscription = merge(
      this.loadEffect()
    ).subscribe(noop);
  }

  load(): void {
    this.loadAction.next();
  }

  private loadEffect(): Observable<never> {
    return this.loadAction.pipe(
      tap(() => {
        this.loaded.next(false);
        this.loading.next(true);
      }),
      switchMap(() => this.restService.getComponents().pipe(
        tap((components: Component[]) => {
          this.components.next(components);
          this.loaded.next(true);
          this.loading.next(false);
        }),
        catchError((error) => {
          console.error(error);
          return throwError(error);
        })
      )),
      ignoreElements()
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
