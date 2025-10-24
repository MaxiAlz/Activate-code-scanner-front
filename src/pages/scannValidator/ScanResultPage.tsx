import { useQueryClient } from "@tanstack/react-query";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { useValidateTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";
import { TicketNotFound } from "../../modules/scaner/components/TicketNotFound";
import { ScanedTicketInfo } from "../../modules/scaner/components/ScanedTicketInfo";
import { ScanData } from "../../modules/scaner/types/scanTypes";
import { Navigate } from "react-router";

const ScanResultPage = () => {
  const queryClient = useQueryClient();
  const { isPending } = useValidateTicketMutation();

  const scanData = queryClient.getQueryData<ScanData>([
    "ticketScan",
    "last-scanned-ticket",
  ]);

  if (!scanData?.data && !scanData?.message) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen ">
      {scanData?.message === "TICKET_NOT_FOUND" && (
        <TicketNotFound message={scanData?.message} />
      )}

      {scanData?.data && (
        <ScanedTicketInfo scanData={scanData.data} isPending={isPending} />
      )}

      <FooterLogo />
    </div>
  );
};

export default ScanResultPage;
