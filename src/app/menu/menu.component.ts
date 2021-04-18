import {ChangeDetectionStrategy, Component} from '@angular/core';
import {OAuthService} from 'angular-oauth2-oidc';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  constructor(private oAuthService: OAuthService) { }


  handleLogout(): void {
    this.oAuthService.logOut({returnTo: environment.auth.redirectUri});
  }

}
