export interface ILogin {
  identifier: string;
  password: string;
}

export interface ISignup {
  userName: string;
  email: string;
  password: string;
}

export interface IUser extends ISignup {
  _id: string;
  profileImage: string;
  isAdmin?: boolean;
}

export interface AuthStore {
  isAdmin: boolean;
  token: string | null;
  isLoading: boolean;
  loggedInUser: IUser | null;
  signup: (data: ISignup) => Promise<string>;
  login: (data: ILogin) => Promise<string>;
  verifyEmail: (code: number, id: string) => Promise<string>;
  resendCode: (id: string) => Promise<string>;
  logout: () => Promise<void>;
  getLoggedInUser: (userId: string) => Promise<void>;
}
