import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChanges } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

type Classes = string | string[];

@Directive({
  selector: '[appClassForMedia]',
})
export class ClassForMediaDirective implements OnChanges, OnDestroy {
  @Input('appClassForMedia') mediaQuery: Classes;
  @Input() classes: Classes;

  private subscription: Subscription;

  constructor(private renderer: Renderer2, private hostElement: ElementRef, private breakpointObserver: BreakpointObserver) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.classes && !changes.classes.isFirstChange()) {
      this.adjustClasses(changes.classes.previousValue, false);
      this.adjustClasses(changes.classes.currentValue, this.breakpointObserver.isMatched(this.mediaQuery));
    }

    if (changes.mediaQuery) {
      this.ngOnDestroy();

      if (changes.mediaQuery.currentValue) {
        this.subscription = this.breakpointObserver.observe(changes.mediaQuery.currentValue).subscribe(state => {
          this.adjustClasses(this.classes, state.matches);
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private adjustClasses(classes: Classes, matches: boolean): void {
    const classesArray = this.getClassesAsArray(classes);

    if (matches) {
      classesArray.forEach(clazz => {
        this.renderer.addClass(this.hostElement.nativeElement, clazz);
      });
    } else {
      classesArray.forEach(clazz => {
        this.renderer.removeClass(this.hostElement.nativeElement, clazz);
      });
    }
  }

  private getClassesAsArray(classes: Classes): string[] {
    if (Array.isArray(classes)) {
      return classes;
    }

    if (typeof classes === 'string') {
      return [classes];
    }

    return [];
  }
}
