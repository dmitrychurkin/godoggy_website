import { SEND_REQUEST, RESOLVE_REQUEST, SET_REDIRECT, SET_NOTIFICATION, UNSET_NOTIFICATION, UPDATE_RETRY_COUNTER, IS_SHOW_APP_LOADER } from './mutation-types';
import { App } from './state';
import { IRequestEntity } from 'admin/lib/api';
import { INotification } from 'admin/interfaces';

export default {
  [SEND_REQUEST]: (state: App, requestEntity: IRequestEntity) => {
    state.requests = [...state.requests, requestEntity];
  },
  [RESOLVE_REQUEST]: (state: App, id = '') => {
    if (id) {
      state.requests = state.requests.filter(req => (id !== req.id));
    }
  },
  [UPDATE_RETRY_COUNTER]: (state: App, { id = '', timerId = 0 }) => {
    if (id) {
      state.requests = state.requests.map(req => {
        if ((id === req.id) && req.isRetry) {
          req.timerId = timerId;
        }
        return req;
      });
    }
  },
  [SET_NOTIFICATION]: (state: App, notification: INotification) => {
    state.notifications = [...state.notifications, notification];
  },
  [UNSET_NOTIFICATION]: (state: App, id: string | number) => {
    state.notifications = state.notifications.filter((n: INotification, i: number) => {
      if (typeof id === 'number') {
        return id !== i;
      }
      return n.id !== id;
    });
  },
  [SET_REDIRECT]: (state: App, redirectTo = '') => {
    state.redirect = redirectTo.trim();
  },
  [IS_SHOW_APP_LOADER]: (state: App, isShow = false) => {
    state.isShowAppLoader = isShow;
  }
};