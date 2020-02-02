import { IUser } from "admin/store/modules/auth/state";
import { IResourceResponse } from "./base";

export type UserResponse = IResourceResponse<IUser, undefined>;
export type EmailPasswordResponse = IResourceResponse<
  IUser,
  { messages: Array<string> }
>;
export type ResetPasswordResponse = IResourceResponse<IUser, undefined>;
export type LogoutResponse = IResourceResponse<undefined, undefined>;
