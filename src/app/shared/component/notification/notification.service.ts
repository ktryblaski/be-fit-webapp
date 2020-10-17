import { Injectable } from '@angular/core';
import { Notification } from './notification';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly NOTIFICATION_LIFE_TIME = 7;
  private readonly MAX_NOTIFICATIONS_NUMBER = 5;

  private readonly notifications = new BehaviorSubject([]);

  readonly notifications$: Observable<Notification[]> = this.notifications.pipe(distinctUntilChanged());

  show(notification: Notification): void {
    const notifications = [
      ...(this.notifications.value.length === this.MAX_NOTIFICATIONS_NUMBER ? this.notifications.value.slice(1) : this.notifications.value),
      notification
    ];

    setTimeout(() => {
      this.close(notification);
    }, this.NOTIFICATION_LIFE_TIME * 1000);

    this.notifications.next(notifications);
  }

  private close(notification: Notification) {
    this.notifications.next(
      this.notifications.value.filter(n => n !== notification)
    );
  }

}
