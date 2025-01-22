import { useEffect, useState } from "react";
import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import "./qrScannerStyles.css";
import { ScreenAlert } from "../../components/ScreenAlerts/ScreenAlert";
import { NavbarDrawer } from "../../components/Navigation/NavbarDrawer";
import { FooterLogo } from "../../components/Navigation/FooterLogo";

const QRScannerPage = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scannerKey, setScannerKey] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let scanner: Html5QrcodeScanner | null = null;

    const initializeScanner = () => {
      scanner = new Html5QrcodeScanner(
        "qr-reader",
        {
          qrbox: { width: 300, height: 300 }, // Tamaño del área de escaneo
          fps: 25, // Cuadros por segundo
          disableFlip: false, // Evita el volteo automático en cámaras frontales
          rememberLastUsedCamera: true, // Recordar última cámara seleccionada
          aspectRatio: 1.0, // Relación de aspecto de la cámara
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // Tipo de escaneo permitido
        },
        false
      );

      scanner.render(
        (result) => {
          setScanResult(result);
          scanner?.clear();
        },
        (error) => console.warn("Escaneo fallido:", error)
      );
    };

    const requestCameraPermission = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          localStorage.setItem("cameraPermissionGranted", "true");
          initializeScanner();
        })
        .catch((error) => {
          console.warn("Permiso de cámara denegado", error);
          setErrorMessage(
            "No se pudo acceder a la cámara. Revisa los permisos."
          );
        });
    };

    const checkCameraPermission = async () => {
      try {
        const result = await navigator.permissions.query({
          name: "camera" as any,
        });
        if (result.state === "granted") {
          initializeScanner();
        } else {
          requestCameraPermission();
        }
      } catch (error) {
        console.warn("Error al verificar permisos de cámara:", error);
        setErrorMessage("Error al verificar permisos de la cámara.");
      }
    };

    checkCameraPermission();

    return () => {
      if (scanner) {
        scanner
          .clear()
          .catch((error) => console.error("Error al limpiar escáner:", error));
      }
    };
  }, [scannerKey]);

  const handleScanAgain = () => {
    setScanResult(null);
    setScannerKey((prevKey) => prevKey + 1);
    setErrorMessage(null);
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

    // </AppLayout>
  );
};

export { QRScannerPage };
