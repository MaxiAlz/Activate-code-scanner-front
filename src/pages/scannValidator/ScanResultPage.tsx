import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import {
  TicketStatesEnum,
  TicketTypeScaned,
} from "../../modules/scaner/types/scanTypes";
import { scanActions } from "../../modules/scaner/actions/scanActions";
import { GiTicket } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";
import { ValidationAlertModal } from "../../components/ScreenAlerts/ValidationAlertModal";

const ScanResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const scanData = location.state;

  console.log("scanData", scanData);
  const [selectedTickets, setSelectedTickets] = useState<number[]>([]);
  const [openAlertModal, setOpenAlertModal] = useState<boolean>(false);
  const [messageAlert, setMessageAlert] = useState<string>("");
  const [statusScaner, setSetstatusScaner] = useState<
    "success" | "error" | "loading" | null
  >(null);

  useEffect(() => {
    if (!scanData) {
      navigate("/scan-qr");
    }
  }, [scanData, navigate]);

  if (!scanData) {
    return <p>Cargando...</p>;
  }

  const toggleTicketSelection = (ticketId: number) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId)
        ? prev.filter((id) => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const clearStates = () => {
    setSelectedTickets([]);
    setOpenAlertModal(false);
    setMessageAlert("");
    setSetstatusScaner(null);
  };
  const onCloseAlertModal = () => {
    clearStates();
  };

  const onScanAgain = () => {
    clearStates();
    navigate("/scan-qr", { replace: true });
  };

  const onGoHome = () => {
    clearStates();
    navigate("/");
  };

  /* TODO: CUANDO SE VALIDE UN TICKET
   - LIMPIAR EL ESTADO DEL SCANNER
   - MOSTRAR MENSAJE DE ESCANEO EXITOSO
   - ENVIAR AL USUARIO A LA PANTALLA DE INICIO
  
  */
  const handleValidateTickets = async () => {
    if (selectedTickets.length === 0) {
      alert("Por favor seleccione al menos un ticket para validar");
      return;
    }
    setOpenAlertModal(true);
    setSetstatusScaner("loading");
    setMessageAlert(
      `Validando ${selectedTickets.length} ticket(s): ${selectedTickets.join(
        ", "
      )}`
    );
    try {
      const response = await scanActions.validateTicket(selectedTickets);
      console.log("response validator ticket", response);
      if (response.status === 200) {
        setSetstatusScaner("success");
        setMessageAlert(
          `Validación exitosa. ${response.data.validatedCount} ticket${
            response.data.validatedCount !== 1 ? "s" : ""
          } validado${
            response.data.validatedCount !== 1 ? "s" : ""
          } correctamente`
        );
      }
      if (response.status === 400) {
        setSetstatusScaner("error");
      }
    } catch (error) {
      setSetstatusScaner("error");
      setMessageAlert(`Error al validar los tickets: ${error}`);
    }
    setSelectedTickets([]);
  };

  const getStateBadgeClasses = (state: TicketStatesEnum) => {
    const baseClasses =
      "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (state) {
      case TicketStatesEnum.BUYED:
        return `${baseClasses} bg-green-100 text-green-800 border border-green-200`;
      case TicketStatesEnum.USED:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
      case TicketStatesEnum.EXPIRED:
        return `${baseClasses} bg-red-100 text-red-800 border border-red-200`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800 border border-gray-200`;
    }
  };

  const getStateLabel = (state: TicketStatesEnum) => {
    switch (state) {
      case TicketStatesEnum.BUYED:
        return "Disponible";
      case TicketStatesEnum.USED:
        return "Usado";
      case TicketStatesEnum.EXPIRED:
        return "Expirado";
      default:
        return state;
    }
  };

  return (
    <>
      <ValidationAlertModal
        isOpen={openAlertModal}
        onClose={onCloseAlertModal}
        validatedCount={selectedTickets.length}
        status={statusScaner}
        message={messageAlert}
        onScanAgain={onScanAgain}
        onGoHome={onGoHome}
      />
      <main className="flex flex-col min-h-screen">
        <div className="flex flex-col min-h-screen bg-gray-50">
          {/* Header with user info */}
          <header className="bg-primary text-white shadow p-4 sticky top-0 z-10">
            <div className="max-w-md mx-auto">
              <h1 className="text-xl font-bold text-gray-800">
                {scanData.personName}
              </h1>
              <p className="text-sm text-gray-600">DNI: {scanData.personDni}</p>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 p-4">
            <div className="max-w-md mx-auto">
              <h2 className="text-lg font-semibold">Tickets Disponibles</h2>
              <p className="text-sm text-gray-600 mb-4">{scanData.eventName}</p>

              {/* Tickets list */}
              <div className="space-y-2 sm:space-y-3 mb-6 px-2 sm:px-0">
                {scanData.tickets.map((ticket: TicketTypeScaned) => {
                  const isUsed = ticket.state === TicketStatesEnum.USED;
                  const isExpired = ticket.state === TicketStatesEnum.EXPIRED;
                  const isDisabled = isUsed || isExpired;
                  const isSelected =
                    selectedTickets.includes(ticket.id) && !isDisabled;

                  return (
                    <div
                      key={ticket.id}
                      className={`
              relative rounded-lg border transition-all duration-200 shadow-sm
              ${
                isDisabled
                  ? "opacity-50 cursor-not-allowed bg-gray-50 border-gray-200"
                  : "cursor-pointer hover:shadow-md bg-white border-gray-200 hover:border-gray-300"
              }
              ${
                isSelected
                  ? "ring-2 ring-primary bg-orange-100 border-orange-300"
                  : ""
              }
            `}
                    >
                      <button
                        disabled={isDisabled}
                        onClick={() =>
                          !isDisabled && toggleTicketSelection(ticket.id)
                        }
                        className="w-full p-3 sm:p-4 text-left disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-primary focus:primary rounded-lg"
                      >
                        {/* Layout para móvil */}
                        <div className="block sm:hidden">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-start space-x-2 flex-1 min-w-0">
                              <div
                                className={`mt-0.5 flex-shrink-0 ${
                                  isDisabled ? "text-gray-400" : "text-gray-600"
                                }`}
                              >
                                <GiTicket className="h-4 w-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3
                                  className={`font-semibold text-sm leading-tight ${
                                    isDisabled
                                      ? "text-gray-500"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {ticket.ticketTypeName}
                                </h3>
                              </div>
                            </div>

                            {/* Checkbox/Estado en móvil */}
                            <div className="flex-shrink-0 ml-2">
                              {!isDisabled && (
                                <div
                                  className={`
                        h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
                        ${
                          isSelected
                            ? "border-primary bg-orange-200"
                            : "border-gray-300"
                        }
                      `}
                                >
                                  {isSelected && (
                                    <FaCheckCircle className="h-3 w-3 text-primary" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            <p
                              className={`text-xs ${
                                isDisabled ? "text-gray-400" : "text-gray-500"
                              }`}
                            >
                              ID: {ticket.id}-{ticket.code}
                            </p>
                            <span
                              className={getStateBadgeClasses(
                                ticket.state as TicketStatesEnum
                              )}
                            >
                              {getStateLabel(ticket.state as TicketStatesEnum)}
                            </span>
                          </div>
                        </div>

                        {/* Layout para tablet/desktop */}
                        <div className="hidden sm:flex sm:items-start sm:justify-between">
                          <div className="flex items-start space-x-3 flex-1 min-w-0">
                            <div
                              className={`mt-1 flex-shrink-0 ${
                                isDisabled ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              <GiTicket className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`font-semibold text-base ${
                                  isDisabled ? "text-gray-500" : "text-gray-900"
                                }`}
                              >
                                {ticket.ticketTypeName}
                              </h3>
                              <p
                                className={`text-sm mt-1 ${
                                  isDisabled ? "text-gray-400" : "text-gray-500"
                                }`}
                              >
                                ID: {ticket.id}-{ticket.code}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center space-x-3 flex-shrink-0">
                            <span
                              className={getStateBadgeClasses(
                                ticket.state as TicketStatesEnum
                              )}
                            >
                              {getStateLabel(ticket.state as TicketStatesEnum)}
                            </span>

                            {!isDisabled && (
                              <div
                                className={`
                      h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors
                      ${
                        isSelected
                          ? "border-orange-500 bg-orange-500"
                          : "border-gray-300"
                      }
                    `}
                              >
                                {isSelected && (
                                  <FaCheckCircle className="h-3 w-3 text-white" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Selected tickets count */}
              {selectedTickets.length > 0 && (
                <div className="mb-4 text-sm font-medium text-primary">
                  {selectedTickets.length} ticket
                  {selectedTickets.length !== 1 ? "s" : ""} seleccionado
                  {selectedTickets.length !== 1 ? "s" : ""}
                </div>
              )}
            </div>
          </main>

          {/* Footer with validation button */}

          <div className="w-full mx-auto p-4">
            <button
              onClick={handleValidateTickets}
              disabled={selectedTickets.length === 0}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
                selectedTickets.length > 0
                  ? "bg-primary hover:bg-primary-500"
                  : "bg-slate-400 cursor-not-allowed"
              }`}
            >
              Validar Tickets
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ScanResultPage;

// <ScreenAlert
//   codeResultData={scanData.data}
//   sanMessage={scanData.message}
//   status="success"
//   handleScanAgain={() => navigate("/scan-qr")}
// />
