import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DietView } from '../../../shared/model/domain/diet';
import { DietsListService } from './diets-list.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-diets-list',
  templateUrl: './diets-list.component.html',
  styleUrls: ['./diets-list.component.scss'],
  providers: [DietsListService],
})
export class DietsListComponent implements OnInit {
  public diets$: Observable<DietView[]>;
  public loading$: Observable<boolean>;
  public loaded$: Observable<boolean>;

  constructor(private service: DietsListService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.diets$ = this.service.diets$;
    this.loading$ = this.service.loading$;
    this.loaded$ = this.service.loaded$;

    this.service.load();
  }

  handleAddNewDiet(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  handleClick(diet: DietView): void {
    this.router.navigate([diet.id], { relativeTo: this.route });
  }
}
