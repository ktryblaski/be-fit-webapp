import {Component, OnInit} from '@angular/core';
import {Breakpoints} from "@angular/cdk/layout";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  private readonly mediaQuery_1 = '(max-width: 1000px)';
  private readonly mediaQuery_2 = '(max-width: 2000px)';

  readonly Breakpoints = Breakpoints;

  mediaQuery: string = this.mediaQuery_2;

  ngOnInit(): void {
    setInterval(() => {
      this.mediaQuery = this.mediaQuery === this.mediaQuery_1 ? this.mediaQuery_2 : this.mediaQuery_1;
    }, 5000);
  }

}
