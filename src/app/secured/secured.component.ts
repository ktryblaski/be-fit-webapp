import {Component, ChangeDetectionStrategy} from '@angular/core';
import {SecuredService} from './secured.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-secured',
  templateUrl: './secured.component.html',
  styleUrls: ['./secured.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SecuredService]
})
export class SecuredComponent {

  logouting$: Observable<boolean>;

  constructor(private service: SecuredService) {
    this.logouting$ = this.service.logouting$;
  }

}
