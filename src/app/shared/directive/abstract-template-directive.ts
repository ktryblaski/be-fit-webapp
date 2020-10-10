import { EmbeddedViewRef, TemplateRef, ViewContainerRef } from '@angular/core';

export abstract class AbstractTemplateDirective {

  protected constructor(private templateRef: TemplateRef<any>,
                        private viewContainerRef: ViewContainerRef) { }

  protected viewRef: EmbeddedViewRef<any> | null;

  protected renderWhen(condition: boolean): void {
    if (condition) {
      this.renderView();
    } else {
      this.destroyView();
    }
  }

  protected renderView(): void {
    if (!this.viewRef) {
      this.viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef);
    }
  }

  protected destroyView(): void {
    if (this.viewRef) {
      this.viewRef.destroy();
      this.viewRef = null;
    }
  }

}
