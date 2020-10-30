import { Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AbstractTemplateDirective } from '../abstract-template-directive';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appForMobile]',
})
export class ForMobileDirective extends AbstractTemplateDirective implements OnInit, OnDestroy {
  private subscription: Subscription;

  constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, private breakpointObserver: BreakpointObserver) {
    super(templateRef, viewContainerRef);
  }

  ngOnInit(): void {
    this.subscription = this.breakpointObserver.observe(Breakpoints.Handset).subscribe(state => super.renderWhen(state.matches));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
