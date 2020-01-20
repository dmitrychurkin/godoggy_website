import { AxiosResponse, AxiosError } from "axios";
import { Store } from "vuex";
import { App } from "admin/store/state";

export const enum NotificationLevel {
  ERROR,
  WARN,
  INFO,
  SUCCESS
}

export interface INotification {
  readonly id?: string | number;
  readonly type: NotificationLevel;
  readonly text: string;
}

export class Notification implements INotification {
  constructor(
    public readonly type: NotificationLevel,
    public readonly text: string,
    public readonly id?: string | number
  ) {}
}

export type RemoveNotificationArgs = {
  readonly store?: Store<App>;
  readonly id: string | number;
};

export type SetNotificationArgs = {
  readonly id?: string;
  readonly subject: string | AxiosResponse | AxiosError;
  readonly formatter?: (res: AxiosResponse) => string;
  readonly store?: Store<App>;
  readonly type: NotificationLevel;
};
