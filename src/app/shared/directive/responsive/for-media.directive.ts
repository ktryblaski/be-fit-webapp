import { Directive, Input, OnChanges, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractTemplateDirective } from '../abstract-template-directive';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appForMedia]'
})
export class ForMediaDirective extends AbstractTemplateDirective implements OnChanges, OnDestroy {

  @Input('appForMedia') mediaQuery: string | string[];

  private subscription: Subscription;

  constructor(templateRef: TemplateRef<any>,
              viewContainerRef: ViewContainerRef,
              private breakpointObserver: BreakpointObserver) {
    super(templateRef, viewContainerRef);
  }

  ngOnChanges(): void {
    this.ngOnDestroy();

    this.subscription = this.breakpointObserver.observe(this.mediaQuery)
      .subscribe(state => super.renderWhen(state.matches));
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
