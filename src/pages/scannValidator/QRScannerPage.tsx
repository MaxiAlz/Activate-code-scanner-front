import { useEffect, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "./qrScannerStyles.css";
import { ScreenAlert } from "../../components/ScreenAlerts/ScreenAlert";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { NavbarDrawer } from "../../components/Navigation/NavbarDrawer";
import { useNavigate } from "react-router";

const QRScannerPage = () => {
  const navigate = useNavigate();
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [scanner, setScanner] = useState<Html5Qrcode | null>(null);

  console.log("scanResult", scanResult);

  useEffect(() => {
    console.log("errorMessage", errorMessage);
    const startScanner = async () => {
      try {
        const hasPermission = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        localStorage.setItem("cameraPermissionGranted", "true");
        console.log("hasPermission", hasPermission);

        const qrScanner = new Html5Qrcode("qr-reader");
        setScanner(qrScanner);

        qrScanner.start(
          { facingMode: "environment" }, // Usa la cámara trasera si está disponible
          {
            fps: 25,
            qrbox: { width: 250, height: 250 },
            disableFlip: false,
          },
          (decodedText) => {
            setScanResult(decodedText);
            navigate("/scan-result");
            qrScanner.stop();
          },
          (error) => console.warn("Error de escaneo:", error)
        );
      } catch (error) {
        console.warn("Permiso de cámara denegado", error);
        setErrorMessage("No se pudo acceder a la cámara. Revisa los permisos.");
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

  const handleScanAgain = () => {
    setScanResult(null);
    setErrorMessage(null);

    if (scanner) {
      scanner
        .start(
          { facingMode: "environment" }, // Selecciona la cámara trasera si está disponible
          {
            fps: 25,
            qrbox: { width: 300, height: 300 },
            disableFlip: false,
          },
          (decodedText) => {
            setScanResult(decodedText);
            scanner.stop();
          },
          (error) => console.warn("Error de escaneo:", error)
        )
        .catch((error) => {
          setErrorMessage("No se pudo reiniciar el escaneo.");
          console.error("Error al reiniciar el escáner:", error);
        });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`${scanResult && "hidden"}`}>
        <NavbarDrawer />
      </header>
      <main className="flex-grow">
        {scanResult ? (
          <ScreenAlert
            status="success"
            handleScanAgain={handleScanAgain}
            scanResult={scanResult}
          />
        ) : (
          <div className="md:flex justify-center items-center lg:m-10">
            <section className="md:w-1/3 sm:w-full md:shadow-xl ">
              <div className="">
                <div
                  id="qr-reader"
                  className="w-full h-full"
                  style={{
                    objectFit: "cover",
                    maxWidth: "100vw",
                    maxHeight: "100vh",
                  }}
                ></div>
              </div>
              <h1 className="text-center font-semibold text-xl mt-3">
                Escanea E-Ticket:
              </h1>
              <p className="p-5">
                Acerca el codigo qr de la entrada a la zona de muestra, si no se
                detecta por malas impresiones o una gama de colores que no es
                optima, pruba desde el buscador con el codigo que se encuentra
                debajo del qr
              </p>
            </section>
          </div>
        )}
      </main>
      <FooterLogo />
    </div>
  );
};

export { QRScannerPage };
