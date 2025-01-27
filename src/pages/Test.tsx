import { CameraDevice, Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";

const Test = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const qrCodeRef = useRef<Html5Qrcode | null>(null);
  const [devices, setDevices] = useState<CameraDevice[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initQrScanner = async () => {
      if (!Html5Qrcode.getCameras) {
        alert("La cámara no es compatible en este navegador.");
        setError("Tu navegador no soporta el acceso a la cámara.");
        return;
      }

      try {
        // Obtener lista de cámaras disponibles
        const devices = await Html5Qrcode.getCameras();
        setDevices(devices);
        if (devices.length > 0) {
          qrCodeRef.current = new Html5Qrcode("qr-scanner-container");

          await qrCodeRef.current.start(
            { facingMode: "environment" }, // Usa la cámara trasera por defecto
            { fps: 10, qrbox: { width: 250, height: 250 } },
            (decodedText) => {
              setScanResult(decodedText);
              stopScanner();
              alert(`Codigo escaneado: ${decodedText}`);
            },
            (errorMessage) => {
              console.warn("No se pudo leer el código:", errorMessage);
            }
          );
        } else {
          alert("No se encontraron cámaras disponibles.");
          setError("No se encontraron cámaras disponibles.");
        }
      } catch (error) {
        alert(`Error al iniciar la cámara: ${error}`);
        setError("No se encontraron cámaras disponibles.");
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
    <div>
      <div className="text-error">errores: {error}</div>
      <h2>Escáner QR</h2>
      {scanResult ? (
        <p>Resultado: {scanResult}</p>
      ) : (
        <div id="qr-scanner-container" style={{ width: "100%" }}></div>
      )}
      <button
        onClick={stopScanner}
        className="mt-4 bg-red-500 text-white p-2 rounded"
      >
        Detener escaneo
      </button>

      <div>
        {devices.map((dev, indx) => (
          <p>
            {indx + 1}:{dev.label}
          </p>
        ))}
      </div>
    </div>
  );
};

export { Test };
