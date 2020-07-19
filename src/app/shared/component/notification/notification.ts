export interface Notification {
  message: string
  severity: NotificationSeverity
}

export enum NotificationSeverity {
  SUCCESS = "success",
  INFO = "info",
  WARNING = "warning",
  DANGER = "danger"
}
