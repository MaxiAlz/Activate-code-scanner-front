export enum AuthStatus {
  "CHECKING",
  "NOT-AUTHENTICATED",
  "AUTHENTICATED",
}
export interface LoginState {
  sessionData: UserAuthenticatedData | null;
  status: AuthStatus;
  error: string;
}

export interface UserLoginData {
  userName: string;
  code: string;
}

export interface UserAuthenticatedData {
  nameAccessCode: string;
  eventName: string;
  totalTickets: number;
  scannedTickets: number;
  remainingTickets: number;
}
