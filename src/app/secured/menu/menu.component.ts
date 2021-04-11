import {ChangeDetectionStrategy, Component} from '@angular/core';
import {SecuredService} from '../secured.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  constructor(private securedService: SecuredService) { }


  handleLogout(): void {
    this.securedService.logout();
  }

}
