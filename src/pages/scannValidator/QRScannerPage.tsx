import { MdErrorOutline } from "react-icons/md";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { Loader } from "../../Loader/Loader";
import { NavbarDrawer } from "../../components/Navigation/NavbarDrawer";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useCheckTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";

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

      // navigate("/scan-result", { state: data });
      navigate("/scan-result");
    } catch (error) {
      console.error("Error validando QR:", error);
      setErrorMessage(
        "Error al validar el ticket. Por favor, intentá nuevamente."
      );
      alert(`Error al validar el ticket: ${error}`);
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
      try {
        const devices = await Html5Qrcode.getCameras();
        if (devices.length > 0) {
          qrCodeRef.current = new Html5Qrcode("qr-scanner-container");

          await qrCodeRef.current.start(
            { facingMode: "environment" },
            { fps: 5, qrbox: { width: 300, height: 300 } },
            (decodedText) => {
              console.log("QR detectado:", decodedText);
              handleCheckTicketsByQrCode(decodedText);
            },
            (errorMsg) => {
              console.warn("No se pudo leer el código:", errorMsg);
            }
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
  }, []);

  const isValidating = checkTicketMutation.isPending || isCameraLoading;

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarDrawer />
      </header>

      <main className="flex-grow">
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
                className="w-full h-[400px]"
                style={{ maxWidth: "100vw", maxHeight: "100vh" }}
              />
            )}

            {isValidating ? (
              <Loader />
            ) : (
              <>
                <h1 className="text-center font-semibold text-xl mt-3">
                  Escaneá tu E-Ticket:
                </h1>
                <p className="p-5 text-center text-sm text-gray-600">
                  Acercá el código QR. Si tenés problemas para escanearlo, probá
                  buscarlo manualmente con el ID del E-Ticket.
                </p>
              </>
            )}
          </section>
        </div>
      </main>

      <FooterLogo />
    </div>
  );
};

export { QRScannerPage };
