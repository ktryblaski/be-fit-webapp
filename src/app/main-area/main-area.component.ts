import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-main-area',
  templateUrl: './main-area.component.html',
  styleUrls: ['./main-area.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainAreaComponent { }
