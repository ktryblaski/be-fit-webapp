import { Attribute, Directive } from '@angular/core';

@Directive({
  selector: 'table[appTable]'
})
export class TableDirective {

  constructor(@Attribute('selectable') selectable: any) { }

}
