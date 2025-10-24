import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scanRepository } from "../repositories/scanRepository";
import { useNavigate } from "react-router";
import { AxiosError } from "axios";

export const useCheckTicketMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (ticketCode: string) => {
      const response = await scanRepository.checkTickets(ticketCode);
      return response.data;
    },
    retry: false,
    onSuccess: (response) => {
      navigate(`/scan-result`, { state: response });
      console.log("response", response);
      //TODO: Validar cando responda {message: 'TICKET_NOT_FOUND'}
      queryClient.setQueryData(
        ["ticketScan", "last-scanned-ticket"],
        response
      );
    },
    onError: (err) => {
      const error = err as AxiosError;
      navigate("/scan/error", {
        replace: true,
        state: {
          message:
            error.message ||
            "Error al validar el ticket. Por favor, intentá nuevamente.",
        },
      });
      // alert("Error al validar el ticket. Por favor, intente nuevamente.");
    },
  });
};

export const useValidateTicketMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ticketsCodes: string[]) => {
      const response = await scanRepository.validateTicket(ticketsCodes);
      return response.data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["ticketScan"] });
    },
  });
};
