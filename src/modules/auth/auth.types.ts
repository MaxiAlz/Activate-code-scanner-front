export enum AuthStatus {
  "CHECKING",
  "NOT-AUTHENTICATED",
  "AUTHENTICATED",
}
export interface LoginState {
  accessCodeName: string;
  status: AuthStatus;
  userName: string;
}

export interface UserLoginData {
  userName: string;
  code: string;
}
