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

  // Obtiene la información del/los ticket(s) escaneado(s) por código QR
  checkTickets: async (
    code: string
  ): Promise<AxiosResponse<ApiResponse<TicketsDataByScan>>> => {
    return await apiService.get<ApiResponse<TicketsDataByScan>>(
      `/Scan/check/${code}`
    );
  },
};

export { scanRepository };
