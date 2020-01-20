import vuex from "admin/plugins/vuex";
import { AxiosResponse, AxiosError } from "axios";
import {
  SET_NOTIFICATION,
  UNSET_NOTIFICATION
} from "admin/store/mutation-types";
import { idRequestEncoder } from "admin/lib/api";
import {
  Notification,
  SetNotificationArgs,
  RemoveNotificationArgs
} from "./types";

const defaultFormatter = ({
  data: { message = "", status: supportedText = "", errors = {} } = {},
  statusText = ""
}: AxiosResponse) => {
  let notificationText = supportedText || message || statusText;
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
  let notificationRestArgs: [string, string | undefined] =
    typeof subject === "string"
      ? [subject, id]
      : [parser(subject, formatter), id || idRequestEncoder(subject.config)];
  store.commit(
    SET_NOTIFICATION,
    new Notification(type, ...notificationRestArgs)
  );
}

export function removeNotification({
  id,
  store = vuex
}: RemoveNotificationArgs) {
  store.commit(UNSET_NOTIFICATION, id);
}
