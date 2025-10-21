import { MdErrorOutline } from "react-icons/md";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useCheckTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";
import { RoundedOutlineButton } from "../../components/Buttons/RoundedButtons";
import { AxiosError } from "axios";
import { TicketLoader } from "../../Loader/TicketLoader";

const QRScannerPage = () => {
  const navigate = useNavigate();
  const qrCodeRef = useRef<Html5Qrcode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCameraLoading, setIsCameraLoading] = useState(true);
  const isScanning = useRef(true); // Evita múltiples escaneos

  const checkTicketMutation = useCheckTicketMutation();

  const handleCheckTicketsByQrCode = async (ticketCode: string) => {
    if (!isScanning.current) return; // Evita llamadas múltiples
    isScanning.current = false;

    try {
      await qrCodeRef.current?.pause(); // Pausa el escáner mientras se valida
      await checkTicketMutation.mutateAsync(ticketCode);
      navigate("/scan-result");
    } catch (err) {
      const error = err as AxiosError;
      setErrorMessage(
        "Error al validar el ticket. Por favor, intentá nuevamente."
      );
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

  const stopScanner = () => {
    if (qrCodeRef.current) {
      qrCodeRef.current
        .stop()
        .catch((error) => alert(`Error al detener el escáner: ${error}`));
    }
  };

  useEffect(() => {
    const initQrScanner = async () => {
      setIsCameraLoading(true);
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length > 0) {
          qrCodeRef.current = new Html5Qrcode("qr-scanner-container");

          const container = document.getElementById("qr-scanner-container")!;
          const qrBoxSize =
            Math.min(container.offsetWidth, container.offsetHeight) * 0.8;

          await qrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 10, qrbox: { width: qrBoxSize, height: qrBoxSize } },
            (decodedText) => handleCheckTicketsByQrCode(decodedText),
            (errorMsg) => console.warn("No se pudo leer el código:", errorMsg)
          );
        } else {
          setErrorMessage("No se encontraron cámaras disponibles.");
        }
      } catch (error) {
        alert(`Error al iniciar la cámara: ${error}`);
        setErrorMessage("No se pudo acceder a la cámara.");
      } finally {
        setIsCameraLoading(false);
      }
    };

    initQrScanner();
    return stopScanner;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isValidating = checkTicketMutation.isPending || isCameraLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="">
        <div className="md:flex justify-center items-center lg:m-10">
          <section className="md:w-1/3 sm:w-full md:shadow-xl">
            {errorMessage ? (
              <div className="flex flex-col items-center justify-center w-full min-h-48 rounded-xl bg-slate-200">
                <MdErrorOutline size={40} className="text-error" />
                <p className="text-2xl text-slate-500 font-semibold">
                  Oops! :(
                </p>
                <p className="text-error m-4 text-center">{errorMessage}</p>
              </div>
            ) : (
              <div
                id="qr-scanner-container"
                className="w-full h-full flex justify-center items-center bg-black"
                style={{ maxWidth: "100vw", maxHeight: "100vh" }}
              />
            )}

            {isValidating && !errorMessage ? (
              <TicketLoader />
            ) : (
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
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export { QRScannerPage };
