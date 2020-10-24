import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-no-table-data',
  templateUrl: './no-table-data.component.html',
  styleUrls: ['./no-table-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoTableDataComponent {}
