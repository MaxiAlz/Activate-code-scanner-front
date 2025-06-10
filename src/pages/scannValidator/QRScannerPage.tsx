import { MdErrorOutline } from "react-icons/md";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { Loader } from "../../Loader/Loader";
import { NavbarDrawer } from "../../components/Navigation/NavbarDrawer";
import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { scanActions } from "../../modules/scaner/actions/scanActions";

const QRScannerPage = () => {
  const navigate = useNavigate();
  // const [scanResult, setScanResult] = useState<string | null>(null);
  const qrCodeRef = useRef<Html5Qrcode | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCheckTicketsByQrCode = async (ticketCode: string) => {
    setIsLoading(true);
    try {
      const response = await scanActions.checkTickets(ticketCode);

      if (response?.status === 200) {
        navigate("/scan-result", { state: response.data });
      }
      return response;
    } catch (error) {
      alert(`Error al validar el ticket: ${error}`);
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const initQrScanner = async () => {
      if (!Html5Qrcode.getCameras) {
        alert("La cámara no es compatible en este navegador.");
        setErrorMessage("Tu navegador no soporta el acceso a la cámara.");
        return;
      }

      try {
        // Obtener lista de cámaras disponibles
        const devices = await Html5Qrcode.getCameras();
        // setDevices(devices);
        if (devices.length > 0) {
          qrCodeRef.current = new Html5Qrcode("qr-scanner-container");

          await qrCodeRef.current.start(
            { facingMode: "environment" }, // Usa la cámara trasera por defecto
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              handleCheckTicketsByQrCode(decodedText);
            },
            (errorMessage) => {
              console.warn("No se pudo leer el código:", errorMessage);
            }
          );
        } else {
          alert("No se encontraron cámaras disponibles.");
          setErrorMessage("No se encontraron cámaras disponibles.");
        }
      } catch (error) {
        alert(`Error al iniciar la cámara: ${error}`);
        setErrorMessage("No se encontraron cámaras disponibles.");
      } finally {
        setIsLoading(false);
      }
    };

    initQrScanner();

    return () => {
      stopScanner();
    };
  }, []);

  const stopScanner = () => {
    qrCodeRef.current
      ?.stop()
      .catch((error) => alert(`Error al iniciar la cámara: ${error}`));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarDrawer />
      </header>
      <main className="flex-grow">
        <div className="md:flex justify-center items-center lg:m-10">
          <section className="md:w-1/3 sm:w-full md:shadow-xl ">
            {errorMessage ? (
              <div className="flex flex-col items-center justify-center w-full min-h-48  rounded-xl bg-slate-200">
                <MdErrorOutline size={40} className="text-error" />
                <p className="text-2xl text-slate-500 font-semibold">
                  Oops! :(
                </p>
                <p className="text-error  m-4 text-center">{errorMessage}</p>
              </div>
            ) : (
              <div
                id="qr-scanner-container"
                className="w-full h-full"
                style={{
                  objectFit: "cover",
                  maxWidth: "100vw",
                  maxHeight: "100vh",
                }}
              ></div>
            )}
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <h1 className="text-center font-semibold text-xl mt-3">
                  Escanea E-Ticket:
                </h1>
                <p className="p-5">
                  Acerca el codigo QR, si tienes problemas para escanear, pruba
                  desde el buscador con el E-Ticket ID
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
