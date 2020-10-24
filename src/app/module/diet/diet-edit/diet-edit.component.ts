import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diet-edit',
  templateUrl: './diet-edit.component.html',
  styleUrls: ['./diet-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DietEditComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
