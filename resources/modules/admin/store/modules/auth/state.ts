interface IUser {
  readonly id: string;
  readonly name: string;
  readonly email: string;
}

type Auth = {
  redirect: string;
  user: IUser | null;
  email: string;
  verified: boolean;
};

const auth = {
  verified: false,
  redirect: "",
  user: null,
  email: ""
};

export { auth as default, Auth, IUser };
