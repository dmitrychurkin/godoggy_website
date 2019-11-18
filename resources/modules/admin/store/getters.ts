import { App } from './state';

export default {
  redirect: ({ redirect }: App) => redirect,
  requests: ({ requests }: App) => requests,
  request: ({ requests }: App) => (id: string) => requests.find(req => req.id === id),
  notifications: ({ notifications }: App) => notifications,
  isShowAppLoader: ({ isShowAppLoader }: App) => isShowAppLoader
};