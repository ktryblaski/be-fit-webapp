import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractTemplateDirective } from '../abstract-template-directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appForLandscapeMobile]'
})
export class ForLandscapeMobileDirective extends AbstractTemplateDirective implements OnInit, OnDestroy {

  private subscription: Subscription;

  constructor(templateRef: TemplateRef<any>,
              viewContainerRef: ViewContainerRef,
              private breakpointObserver: BreakpointObserver) {
    super(templateRef, viewContainerRef);
  }

  ngOnInit(): void {
    this.subscription = this.breakpointObserver.observe(Breakpoints.HandsetLandscape)
      .subscribe(state => super.renderWhen(state.matches));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
