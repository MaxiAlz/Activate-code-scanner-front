export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface TicketsDataByScan {
  personName: string;
  eventName: string;
  personDni: string;
  tickets: TicketTypeScaned[];
}

export interface TicketTypeScaned {
  id: number;
  code: string;
  ticketTypeName: string;
  state: string;
}

export enum TicketStatesEnum {
  USED = "USED",
  BUYED = "BUYED",
  EXPIRED = "EXPIRED",
}
