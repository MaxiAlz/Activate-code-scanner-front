export enum AuthStatus {
  "CHECKING",
  "NOT-AUTHENTICATED",
  "AUTHENTICATED",
}
export interface LoginState {
  sessionData: userAuthenticatedResponse | null;
  status: AuthStatus;
  error: string;
}

export interface UserLoginData {
  userName: string;
  code: string;
}

interface userAuthenticatedResponse {
  message: string;
  data: UserAuthenticatedData;
}

interface UserAuthenticatedData {
  nameAccessCode: string;
  eventName: string;
  totalTickets: number;
  scannedTickets: number;
  remainingTickets: number;
}
