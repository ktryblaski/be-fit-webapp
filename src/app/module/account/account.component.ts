import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountComponent implements OnInit {

  constructor(private a: OAuthService) { }

  ngOnInit(): void {

    console.log(this.a.getIdToken());
    console.log(this.a.scope);
    // this.a.loadUserProfile().then(a => {
    //   console.log(a);
    // });
  }

}
