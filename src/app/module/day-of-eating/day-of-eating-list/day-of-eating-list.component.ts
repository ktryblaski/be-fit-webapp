import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DayOfEatingLite } from '../../../shared/model/domain/day-of-eating';
import { DayOfEatingListService } from './day-of-eating-list.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DayOfEatingBeginDialogComponent } from '../day-of-eating-begin-dialog/day-of-eating-begin-dialog.component';
import { DayOfEatingBeginDTO } from '../../../shared/model/dto/day-of-eating-begin-dto';

@Component({
  selector: 'app-day-of-eating-list',
  templateUrl: './day-of-eating-list.component.html',
  styleUrls: ['./day-of-eating-list.component.scss'],
  providers: [DayOfEatingListService]
})
export class DayOfEatingListComponent implements OnInit {

  loading$: Observable<boolean>;
  loaded$: Observable<boolean>;
  daysOfEating$: Observable<DayOfEatingLite[]>;
  canBeginDayOfEating$: Observable<boolean>;
  saving$: Observable<boolean>;

  constructor(private service: DayOfEatingListService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;
    this.daysOfEating$ = this.service.daysOfEating$;
    this.canBeginDayOfEating$ = this.service.canBeginDayOfEating$;
    this.saving$ = this.service.saving$;

    this.service.load();
  }

  handleClick(dayOfEating: DayOfEatingLite): void {
    this.router.navigate(['day-of-eating', dayOfEating.id]);
  }

  handleBeginDayOfEating(): void {
    this.dialog.open(DayOfEatingBeginDialogComponent, {
      width: '400px'
    }).afterClosed().subscribe((dayOfEatingBegin: DayOfEatingBeginDTO) => {
      if (dayOfEatingBegin) {
        this.service.save(dayOfEatingBegin);
      }
    });
  }

}
