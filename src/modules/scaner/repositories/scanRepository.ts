import { AxiosResponse } from "axios";
import { apiService } from "../../../services/apiService";
import { ApiResponse, TicketsDataByScan } from "../types/scanTypes";

const scanRepository = {
  validateTicket: async (ticketsCodes: string[]) => {
    const response = await apiService.post("/Scan/validate", {
      ticketsCode: ticketsCodes,
    });
    return response;
  },

  checkTickets: async (
    code: string
  ): Promise<AxiosResponse<ApiResponse<TicketsDataByScan>>> => {
    console.log("code", code);
    return await apiService.get<ApiResponse<TicketsDataByScan>>(
      `/Scan/check/${code}`
    );
  },
};

export { scanRepository };
