import { HIDE_NOTIFICATION, SHOW_NOTIFICATION } from "./mutation-types";
import { INotification, Notifications } from "./state";

export default {
  [SHOW_NOTIFICATION]: (state: Notifications, notification: INotification) => {
    state.notifications = [...state.notifications, notification];
  },
  [HIDE_NOTIFICATION]: (state: Notifications, id: string | number) => {
    state.notifications = state.notifications.filter(
      (n: INotification, i: number) => {
        if (typeof id === "number") {
          return id !== i;
        }
        return n.id !== id;
      }
    );
  }
};
