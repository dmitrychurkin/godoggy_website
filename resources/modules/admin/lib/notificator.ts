import vuex from 'admin/plugins/vuex';
import { Store } from 'vuex';
import { App } from 'admin/store/state';
import { INotification } from 'admin/interfaces';
import { NotificationLevel } from 'admin/constants';
import { AxiosResponse, AxiosError } from 'axios';
import { SET_NOTIFICATION, UNSET_NOTIFICATION } from 'admin/store/mutation-types';
import { idRequestEncoder } from './api';


class Notification implements INotification {
  constructor(
    public readonly type: NotificationLevel,
    public readonly text: string,
    public readonly id?: string | number
  ) { }
}

const defaultFormatter = ({
  data: { message = '', status: supportedText = '', errors = {} } = {},
  statusText = ''
}: AxiosResponse) => {
  let notificationText = (supportedText || message || statusText);
  const errTextDescription = Object.values(errors); // (<Array<string[]>>Object.values(errors)).map((e: string[]) => e.join(' '));
  if (errTextDescription.length > 0) {
    notificationText += ` - ${errTextDescription}`;
  }
  return notificationText;
};

function parser(res: AxiosResponse | AxiosError, formatter: Function): string {
  const { response } = res as AxiosError;
  if (response) {
    return parser(response, formatter);
  }
  return formatter(res);
}

export function setNotification({
  subject,
  type,
  id,
  formatter = defaultFormatter,
  store = vuex
}: SetNotificationArgs) {
  let notificationRestArgs: [string, string | undefined] = (typeof subject === 'string') ?
    [subject, id] :
    [parser(subject, formatter), (id || idRequestEncoder(subject.config))]
  store.commit(SET_NOTIFICATION, new Notification(type, ...notificationRestArgs));
}

export function removeNotification({ id, store = vuex }: RemoveNotificationArgs) {
  store.commit(UNSET_NOTIFICATION, id);
}

type RemoveNotificationArgs = {
  readonly store?: Store<App>;
  readonly id: string | number
};

type SetNotificationArgs = {
  readonly id?: string;
  readonly subject: string | AxiosResponse | AxiosError;
  readonly formatter?: (res: AxiosResponse) => string;
  readonly store?: Store<App>;
  readonly type: NotificationLevel;
};

