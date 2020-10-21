import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[header],[title],[actions]'
})
export class HeaderDirective { }
