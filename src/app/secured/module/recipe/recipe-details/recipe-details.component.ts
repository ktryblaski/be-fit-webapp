import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { RecipeDetailsService } from './recipe-details.service';
import { Recipe } from '../-model/recipe';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  providers: [RecipeDetailsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;


  public recipe$: Observable<Recipe>;
  public loaded$: Observable<boolean>;
  public pending$: Observable<boolean>;

  constructor(private service: RecipeDetailsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipe$ = this.service.recipe$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([
      this.service.loading$,
      this.service.saving$
    ]).pipe(map(([loading, saving]) => loading || saving));

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    });
  }

  handleActivate(): void {
    this.service.activate();
  }

  handleDeactivate(): void {
    this.service.deactivate();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
