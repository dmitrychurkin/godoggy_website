export interface IPasswordResetForm {
  readonly email: string;
  readonly password: string;
  readonly password_confirmation: string;
  readonly token: string;
}
