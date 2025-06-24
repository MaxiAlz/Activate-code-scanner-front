import { useEffect } from "react";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

interface ValidationAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  status: "success" | "error" | "loading" | null;
  title?: string;
  message?: string;
  validatedCount?: number;
  onGoHome?: () => void;
  onScanAgain?: () => void;
}

const ValidationAlertModal = ({
  isOpen,
  title,
  message,
  validatedCount,
  onClose,
  onGoHome,
  onScanAgain,
  status,
}: ValidationAlertModalProps) => {
  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const getStatusConfig = () => {
    switch (status) {
      case "success":
        return {
          icon: <FaCheckCircle className="h-12 w-12 text-green-500" />,
          title: title || "¡Validación Exitosa!",
          message:
            message ||
            `${validatedCount} ticket${
              validatedCount !== 1 ? "s" : ""
            } validado${validatedCount !== 1 ? "s" : ""} correctamente`,
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
        };
      case "error":
        return {
          icon: <FaExclamationTriangle className="h-12 w-12 text-red-500" />,
          title: title || "Error en la Validación",
          message:
            message ||
            "Hubo un problema al validar los tickets. Por favor, inténtalo de nuevo.",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
        };
      case "loading":
        return {
          icon: (
            <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          ),
          title: title || "Validando Tickets...",
          message:
            message || "Por favor espera mientras procesamos la validación",
          bgColor: "bg-blue-50",
          borderColor: "border-blue-200",
        };
      default:
        return {
          icon: <FaCheckCircle className="h-12 w-12 text-gray-500" />,
          title: title || "Información",
          message: message || "",
          bgColor: "bg-gray-50",
          borderColor: "border-gray-200",
        };
    }
  };

  const config = getStatusConfig();
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={status !== "loading" ? onClose : undefined}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div
          className={`
      relative w-full max-w-md transform overflow-hidden rounded-lg bg-white 
      shadow-xl transition-all ${config.bgColor} border ${config.borderColor}
    `}
        >
          <div className="p-6 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center">
              {config.icon}
            </div>

            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              {config.title}
            </h3>

            <p className="mb-6 text-sm text-gray-600">{config.message}</p>

            {/* Actions - solo si no está cargando */}
            {status !== "loading" && (
              <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                {status === "success" && (
                  <>
                    {onGoHome && (
                      <button
                        onClick={onGoHome}
                        className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors"
                      >
                        Ir al Inicio
                      </button>
                    )}
                    {onScanAgain && (
                      <button
                        onClick={onScanAgain}
                        className="w-full border sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Escanear Otro
                      </button>
                    )}
                  </>
                )}

                {status === "error" && (
                  <>
                    <button
                      onClick={onClose}
                      className="w-full sm:w-auto px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Intentar de Nuevo
                    </button>
                    <button
                      onClick={onScanAgain}
                      className="w-full border sm:w-auto px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                    >
                      Escanear Otro
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { ValidationAlertModal };
