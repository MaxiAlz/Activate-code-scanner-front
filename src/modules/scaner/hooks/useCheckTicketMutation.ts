import { useMutation, useQueryClient } from "@tanstack/react-query";
import { scanRepository } from "../repositories/scanRepository";
import { useNavigate } from "react-router";

export const useCheckTicketMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (ticketCode: string) => {
      const response = await scanRepository.checkTickets(ticketCode);
      return response.data; // asumimos que response tiene .data con la estructura de tu backend
    },
    retry: false, // no reintenta porque no queremos múltiples escaneos fallidos
    onSuccess: (data) => {
      console.log("data", data);
      navigate(`/scan-result`);
      queryClient.setQueryData(["ticketScan", "last-scanned-ticket"], data);
    },
    onError: (error) => {
      console.log("error", error);
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
      // Limpia la cache relacionada con el escaneo previo
      queryClient.removeQueries({ queryKey: ["ticketScan"] });
    },
  });
};
