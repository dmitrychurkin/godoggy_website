import { getAuthToken } from "admin/lib/auth-adapter";

const auth = {
  authToken: "",
  localStorageToken: getAuthToken(),
  email: ""
};

type Auth = typeof auth;

export { auth as default, Auth };
