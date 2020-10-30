import { Component, OnInit } from '@angular/core';
import { DayOfEatingBeginFormValue } from './day-of-eating-begin-form/-shared/day-of-eating-begin-form-value';
import { DayOfEatingBeginDialogService } from './day-of-eating-begin-dialog.service';
import { DayOfEatingBeginFormDataSource } from './day-of-eating-begin-form/-shared/day-of-eating-begin-form-data-source';
import { Observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-day-of-eating-begin-dialog',
  templateUrl: './day-of-eating-begin-dialog.component.html',
  styleUrls: ['./day-of-eating-begin-dialog.component.scss'],
  providers: [DayOfEatingBeginDialogService],
})
export class DayOfEatingBeginDialogComponent implements OnInit {
  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  dataSource$: Observable<DayOfEatingBeginFormDataSource>;

  constructor(private service: DayOfEatingBeginDialogService, private dialogRef: MatDialogRef<DayOfEatingBeginDialogComponent>) {}

  ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.dataSource$ = this.service.dataSource$;

    this.service.load();
  }

  handleSave(formValue: DayOfEatingBeginFormValue): void {
    this.dialogRef.close(this.service.mapDayOfEatingBegin(formValue));
  }

  handleCancel(): void {
    this.dialogRef.close();
  }
}
