import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { GiTicket } from "react-icons/gi";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { scanRepository } from "../../modules/scaner/repositories/scanRepository";

interface dataTickets {
  personName: string;
  personDni: string;
  eventName: string;
  ticket: {
    id: number;
    code: string;
    ticketTypeName: string;
    state: string;
  };
}

interface ScanData {
  message: string;
  data: dataTickets;
}

const ScanResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scanData: ScanData | undefined = location.state;

  console.log("scanData", scanData);

  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
    null
  );
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!scanData) {
      navigate("/scan-qr");
    }
  }, [scanData, navigate]);

  if (!scanData) {
    return <p>Cargando...</p>;
  }

  const handleValidateTicket = async () => {
    setStatus("loading");
    setMessage("Validando ticket...");
    try {
      const response = await scanRepository.validateTicket([
        scanData.data.ticket.code,
      ]);
      if (response.status === 200) {
        setStatus("success");
        setMessage(
          `Ticket validado correctamente para ${scanData.data.personName}`
        );
      } else {
        setStatus("error");
        setMessage(response.data?.message || "Error al validar el ticket");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Error al validar el ticket");
      console.error(error);
    }
  };

  const onScanAgain = () => navigate("/scan-qr", { replace: true });
  const onGoHome = () => navigate("/", { replace: true });

  const getStatusClasses = () => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800 border-green-300";
      case "error":
        return "bg-red-100 text-red-800 border-red-300";
      case "loading":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "";
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}

      {scanData.data && (
        <header className="bg-primary text-white shadow p-4 sticky top-0 z-10">
          <div className="max-w-md mx-auto">
            <h1 className="text-xl font-bold text-gray-800">
              {scanData.data.personName}
            </h1>
            <p className="text-sm text-gray-600">
              DNI: {scanData.data.personDni}
            </p>
          </div>
        </header>
      )}

      {/* Ticket Info */}
      {scanData && (
        <section className="flex-1 p-4 max-w-md mx-auto">
          <h2 className="text-lg font-semibold mb-2">
            {scanData.data.eventName}
          </h2>
          <div className="rounded-lg border p-4 flex items-center space-x-4 bg-white shadow-sm">
            <GiTicket className="h-8 w-8 text-gray-600" />
            <div className="flex-1">
              <h3 className="font-semibold">
                {/* {scanData.ticket?.ticketTypeName} */}
              </h3>
              <p className="text-sm text-gray-500">
                ID: {scanData.data.ticket.id}
              </p>
              <p className="text-sm text-gray-500">
                Código: {scanData.data.ticket.code}
              </p>
              <p className="text-sm mt-1">
                Estado:{" "}
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${
                    scanData.data.ticket.state === "BUYED"
                      ? "bg-green-100 text-green-800 border-green-200"
                      : scanData.data.ticket.state === "USED"
                      ? "bg-gray-100 text-gray-800 border-gray-200"
                      : "bg-red-100 text-red-800 border-red-200"
                  }`}
                >
                  {scanData.data.ticket.state === "BUYED"
                    ? "Disponible"
                    : scanData.data.ticket.state === "USED"
                    ? "Usado"
                    : "Expirado"}
                </span>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Validation / Result */}
      {status && (
        <section
          className={`max-w-md mx-auto mt-4 p-4 rounded-lg border ${getStatusClasses()} shadow`}
        >
          <div className="flex items-center space-x-2">
            {status === "success" && <FaCheckCircle className="h-6 w-6" />}
            {status === "error" && <FaTimesCircle className="h-6 w-6" />}
            {status === "loading" && (
              <div className="animate-spin h-5 w-5 border-2 border-yellow-500 rounded-full"></div>
            )}
            <span className="font-medium">{message}</span>
          </div>

          {(status === "success" || status === "error") && (
            <div className="mt-4 flex space-x-2">
              <button
                onClick={onScanAgain}
                className="flex-1 py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-500"
              >
                Escanear otro
              </button>
              <button
                onClick={onGoHome}
                className="flex-1 py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
              >
                Volver al inicio
              </button>
            </div>
          )}
        </section>
      )}

      {/* Validate Button */}
      {!status && (
        <div className="max-w-md mx-auto p-4">
          <button
            onClick={handleValidateTicket}
            className="w-full py-3 px-4 rounded-lg font-medium text-white bg-primary hover:bg-primary-500"
          >
            Validar Ticket
          </button>
        </div>
      )}
    </main>
  );
};

export default ScanResultPage;
