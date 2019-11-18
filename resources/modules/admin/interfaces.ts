import { NotificationLevel, Locales } from "./constants";

export interface ILoginForm {
  readonly email: string;
  readonly password: string;
  readonly remember: boolean;
}

export interface IPasswordResetEmailForm {
  readonly email: string;
}

export interface IPasswordResetForm {
  readonly email: string;
  readonly password: string;
  readonly password_confirmation: string;
  readonly token: string;
}

export interface INotification {
  readonly id?: string | number;
  readonly type: NotificationLevel;
  readonly text: string;
}

export interface IRouteMeta {
  readonly requiresAuth?: boolean;
  readonly redirectIfTokenExists?: boolean;
}
