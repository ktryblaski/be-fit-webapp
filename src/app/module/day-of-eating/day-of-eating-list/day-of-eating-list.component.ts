import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { DayOfEatingLite } from '../../../shared/model/domain/day-of-eating';
import { DayOfEatingListService } from './day-of-eating-list.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DayOfEatingBeginDialogComponent } from '../day-of-eating-begin-dialog/day-of-eating-begin-dialog.component';
import { DayOfEatingBeginDTO } from '../../../shared/model/dto/day-of-eating-begin-dto';
import { map } from 'rxjs/operators';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';

@Component({
  selector: 'app-day-of-eating-list',
  templateUrl: './day-of-eating-list.component.html',
  styleUrls: ['./day-of-eating-list.component.scss'],
  providers: [DayOfEatingListService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DayOfEatingListComponent implements OnInit {

  daysOfEating$: Observable<DayOfEatingLite[]>;
  loaded$: Observable<boolean>;
  pending$: Observable<boolean>;
  canBeginDayOfEating$: Observable<boolean>;

  constructor(private service: DayOfEatingListService,
              private dialog: MatDialog,
              private router: Router) { }

  ngOnInit(): void {
    this.daysOfEating$ = this.service.daysOfEating$;
    this.loaded$ = this.service.loaded$;
    this.pending$ = combineLatest([
      this.service.loading$,
      this.service.saving$
    ]).pipe(
      map(([loading, saving]) => loading || saving)
    );
    this.canBeginDayOfEating$ = this.service.canBeginDayOfEating$;

    this.service.load();
  }

  handleClick(dayOfEating: DayOfEatingLite): void {
    this.router.navigate(['day-of-eating', dayOfEating.id]);
  }

  handleBeginDayOfEating(): void {
    const dialogConfig: MatDialogConfig = {
      width: '400px',
    };

    this.dialog.open(DayOfEatingBeginDialogComponent, dialogConfig).afterClosed().subscribe((dayOfEatingBegin: DayOfEatingBeginDTO) => {
      if (dayOfEatingBegin) {
        this.service.save(dayOfEatingBegin);
      }
    });
  }
}
