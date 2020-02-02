import { Auth } from "./state";

export default {
  verified: ({ verified }: Auth) => verified,
  redirect: ({ redirect }: Auth) => redirect,
  user: ({ user }: Auth) => user,
  email: ({ email }: Auth) => email
};
