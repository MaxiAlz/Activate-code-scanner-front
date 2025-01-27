import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./qrScannerStyles.css";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { NavbarDrawer } from "../../components/Navigation/NavbarDrawer";
import { useNavigate } from "react-router";
import { MdErrorOutline } from "react-icons/md";
import { Loader } from "../../Loader/Loader";

const QRScannerPage = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  useEffect(() => {
    const startScanner = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setErrorMessage(
          "La función de escaneo de QR no es compatible con este navegador"
        );
        setIsLoading(false);
        return;
      }

      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        localStorage.setItem("cameraPermissionGranted", "true");

        const qrScanner = new Html5Qrcode("qr-reader");
        setScanner(qrScanner);
        qrScanner.start(
          { facingMode: "environment" },
          {
            fps: 25,
            qrbox: { width: 250, height: 250 },
            disableFlip: false,
          },
          (decodedText) => {
            setScanResult(decodedText);
            qrScanner.stop();
            navigate("/scan-result");
          },
          (error) => console.warn("Error de escaneo:", error)
        );
        setIsLoading(false);
      } catch (error) {
        console.warn("Permiso de cámara denegado", error);
        setErrorMessage(
          "No se pudo acceder a la cámara. Revisa los permisos o prueba con otro navegador"
        );
        setIsLoading(false);
      }
    };

    startScanner();

    return () => {
      if (scanner) {
        scanner
          .stop()
          .catch((error) => console.error("Error al detener escáner:", error));
      }
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`${scanResult && "hidden"}`}>
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
                id="qr-reader"
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
                  Acerca el codigo qr de la entrada a la zona de muestra, si no
                  se detecta por malas impresiones o una gama de colores que no
                  es optima, pruba desde el buscador con el codigo que se
                  encuentra debajo del qr
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
