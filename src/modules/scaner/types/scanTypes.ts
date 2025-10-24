export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface TicketsDataByScan {
  message: string;
  data?: TicketScanedDetail;
}

interface TicketScanedDetail {
  personName: "string";
  eventName: "string";
  personDni: "string";
  ticket: TicketTypeScaned;
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

interface dataTickets {
  personName: string;
  personDni: string;
  eventName: string;
  ticket: {
    id: number;
    code: string;
    ticketTypeName: string;
    state: string;
  };
}

export interface ScanData {
  message: string;
  data: dataTickets;
}
