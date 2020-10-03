import { Component } from '@angular/core';
import {NotificationService} from './notification.service';
import {Observable} from 'rxjs';
import {Notification} from './notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent {

  readonly notifications$: Observable<Notification[]>;

  constructor(private service: NotificationService) {
    this.notifications$ = this.service.notifications$;
  }

}
