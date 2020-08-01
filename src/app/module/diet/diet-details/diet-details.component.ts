import { Component, OnInit } from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DietDetailsService} from "./diet-details.service";
import {Diet} from "../../../shared/model/domain/diet";

@Component({
  selector: 'app-diet-details',
  templateUrl: './diet-details.component.html',
  styleUrls: ['./diet-details.component.scss'],
  providers: [DietDetailsService]
})
export class DietDetailsComponent implements OnInit {

  private subscription: Subscription;

  public diet$: Observable<Diet>;
  public loaded$: Observable<boolean>;
  public loading$: Observable<boolean>;

  constructor(private service: DietDetailsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.diet$ = this.service.diet$;
    this.loaded$ = this.service.loaded$;
    this.loading$ = this.service.loading$;

    this.subscription = this.route.paramMap.subscribe(paramMap => {
      this.service.load(+paramMap.get('id'));
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
