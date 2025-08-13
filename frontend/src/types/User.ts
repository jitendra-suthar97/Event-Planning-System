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
  id: string;
  profileImage: string;
}

export interface AuthStore {
  token: string | null;
  isLoading: boolean;
  loggedInUser: IUser | null;
  signup: (data: ISignup) => Promise<string>;
  login: (data: ILogin) => Promise<string>;
  verifyEmail: (code: number, id: string) => Promise<string>;
  resendCode: (id: string) => Promise<string>;
  logout: () => Promise<void>;
  getLoggedInUser: () => Promise<void>;
}
