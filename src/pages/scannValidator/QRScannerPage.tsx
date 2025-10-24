import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { useNavigate } from "react-router";
import { useCheckTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";
import { RoundedOutlineButton } from "../../components/Buttons/RoundedButtons";
import { AxiosError } from "axios";
import { TicketLoader } from "../../Loader/TicketLoader";
import { useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

const QRScannerPage = () => {
  const navigate = useNavigate();
  const isScanning = useRef(true);
  const checkTicketMutation = useCheckTicketMutation();

  const handleCheckTicketsByQrCode = async (
    detectedCodes: Array<{ rawValue: string }>
  ) => {
    const qrCodeValue = detectedCodes[0]?.rawValue;

    if (!isScanning.current) return;
    isScanning.current = false;

    try {
      await checkTicketMutation.mutateAsync(qrCodeValue);
      navigate("/scan-result");
    } catch (err) {
      const error = err as AxiosError;
      navigate("/scan/error", {
        replace: true,
        state: {
          message:
            error.message ||
            "Error al validar el ticket. Por favor, intentá nuevamente.",
        },
      });

      if (error.response?.status === 500) {
        navigate("/scan/error", {
          replace: true,
          state: { message: "Error interno del servidor" },
        });
      }
    } finally {
      isScanning.current = true;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main>
        <div className="md:flex justify-center items-center lg:m-10">
          <section className="md:w-1/3 sm:w-full md:shadow-xl">
            <div className="relative w-full aspect-square bg-black flex items-center justify-center overflow-hidden">
              <Scanner
                onScan={(result) => handleCheckTicketsByQrCode(result)}
                onError={(error) => console.error(error)}
              />
            </div>

            {checkTicketMutation.isPending && <TicketLoader />}

            <>
              <h1 className="text-center font-semibold text-xl mt-3">
                Escaneá tu E-Ticket:
              </h1>
              <p className="p-5 text-center text-sm text-gray-600">
                Acercá el código QR. Si tenés problemas para escanearlo, probá
                buscarlo manualmente con el ID del E-Ticket.
              </p>
              <div className="flex justify-center gap-4 mb-6">
                <RoundedOutlineButton
                  className="w-full mx-8"
                  onClick={() => navigate("/")}
                  text="Cancelar"
                />
              </div>
              <FooterLogo />
            </>
          </section>
        </div>
      </main>
    </div>
  );
};
export { QRScannerPage };
