import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-async-data-container',
  templateUrl: './async-data-container.component.html',
  styleUrls: ['./async-data-container.component.scss']
})
export class AsyncDataContainerComponent {

  @Input() loaded = false;
  @Input() pending = false;


}
