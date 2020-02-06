import store from "admin/plugins/vuex";
import { SHOW_NOTIFICATION } from "admin/store/modules/notifications/mutation-types";
import {
  INotification,
  NotificationLevel
} from "admin/store/modules/notifications/state";
import axios, { AxiosError, AxiosResponse } from "axios";

export function showNotification(
  config = {},
  r?: AxiosError | AxiosResponse,
  $store = store
) {
  const show = (notification: INotification) => {
    if (notification.text) {
      $store.commit(SHOW_NOTIFICATION, notification);
    }
  };
  const notification: INotification = {
    type: NotificationLevel.ERROR,
    ...config
  };
  if (!r) {
    return show(notification);
  }
  if (axios.isCancel(r)) {
    return;
  }
  if ("response" in r) {
    for (const { detail: text } of r.response?.data.errors ?? []) {
      show({ text, ...notification });
    }
  } else if ("data" in r) {
    for (const text of r.data?.meta?.messages ?? []) {
      show({ text, ...notification });
    }
  } else {
    show(notification);
  }
}
