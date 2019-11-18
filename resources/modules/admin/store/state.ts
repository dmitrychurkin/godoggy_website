import { IRequestEntity } from "admin/lib/api";
import { INotification } from "admin/interfaces";

const notifications: Array<INotification> = [];
const requests: Array<IRequestEntity> = [];
const app = {
  requests,
  notifications,
  redirect: '',
  isShowAppLoader: false
};

type App = typeof app;

export {
  app as default,
  App
};