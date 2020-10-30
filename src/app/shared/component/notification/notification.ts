export enum NotificationSeverity {
  SUCCESS = 'success',
  INFO = 'info',
  WARNING = 'warning',
  DANGER = 'danger',
}

export interface Notification {
  message: string;
  severity: NotificationSeverity;
}
