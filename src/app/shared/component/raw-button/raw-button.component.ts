import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'button[rawButton]',
  templateUrl: './raw-button.component.html',
  styleUrls: ['./raw-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RawButtonComponent {}
