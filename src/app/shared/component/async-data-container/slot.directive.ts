import { Directive } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: `
    app-slot[title],
    app-slot[actions],
    app-slot[data]
  `
})
export class SlotDirective { }
