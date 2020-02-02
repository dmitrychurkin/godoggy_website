const enum NotificationLevel {
  ERROR,
  WARN,
  INFO,
  SUCCESS
}

interface INotification {
  readonly id?: string | number;
  readonly text?: string;
  readonly type: NotificationLevel;
}

const notifications: Array<INotification> = [];
const state = {
  notifications
};

type Notifications = typeof state;

export { state as default, INotification, Notifications, NotificationLevel };
