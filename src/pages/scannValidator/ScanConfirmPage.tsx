import { useNavigate, useParams } from "react-router";
import {
  RoundedFilledButton,
  RoundedOutlineButton,
} from "../../components/Buttons/RoundedButtons";
import { useValidateTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";
import { useEffect } from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdArrowBack } from "react-icons/md";
import { TbFaceIdError } from "react-icons/tb";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { TicketLoader } from "../../Loader/TicketLoader";

const ScanConfirmPage = () => {
  const { ticketCode } = useParams<{ ticketCode: string }>();
  const navigate = useNavigate();
  const {
    mutate,
    data: successData,
    isSuccess,
    isError,
    isPending,
  } = useValidateTicketMutation();
  const handleGoBackToScan = () => navigate("/scan-qr");
  const handleGoHome = () => navigate("/");

  console.log("successData Confirms", successData);

  useEffect(() => {
    if (ticketCode) {
      mutate([ticketCode]);
    }
  }, [mutate, ticketCode]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {isPending && <TicketLoader />}

      {isSuccess && successData && (
        <>
          <div className="bg-success text-white shadow-lg">
            <div className="m-4 w-full">
              <button
                className="flex items-center gap-2 font-semibold"
                onClick={handleGoBackToScan}
              >
                <MdArrowBack size={30} /> <p>Volver</p>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 px-10 py-10">
              <FaRegCheckCircle size={50} />
              <p className="text-xl font-bold">INGRESO PERMITIDO</p>
            </div>
          </div>

          <div className="space-y-2 mx-10 mt-6 text-xl">
            <p>
              Nombre:{" "}
              <span className="font-semibold">{successData.data[0].name}</span>
            </p>
            <p>
              DNI:{" "}
              <span className="font-semibold">{successData.data[0].dni}</span>
            </p>
            <p>
              Ingreso:{" "}
              <span className="font-semibold">
                {new Date(successData.data[0].timeOfEntry).toLocaleTimeString(
                  "es-AR"
                )}{" "}
                Hs
              </span>
            </p>
            <p>
              Codigo: <span className="font-semibold">{ticketCode}</span>
            </p>
          </div>

          <div className="flex flex-col flex-grow justify-end mx-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <RoundedFilledButton
                onClick={handleGoBackToScan}
                text="Escanear otro ticket"
                className="flex-1 sm:flex-auto"
              />
              <RoundedOutlineButton
                onClick={handleGoHome}
                text="Ir al inicio"
                className="flex-1 sm:flex-auto"
              />
            </div>

            <div className="mt-6 flex justify-center">
              <FooterLogo />
            </div>
          </div>
        </>
      )}

      {isError && (
        <>
          <div className="bg-slate-200 text-error text-center shadow-lg">
            <div className="m-4 w-full">
              <button
                className="flex items-center gap-2 font-semibold"
                onClick={handleGoBackToScan}
              >
                <MdArrowBack size={30} /> <p>Volver</p>
              </button>
            </div>
            <div className="flex flex-col items-center gap-4 px-10 py-10">
              <TbFaceIdError size={50} />
              <p className="text-xl font-bold">Oops!</p>
              <p className="text-lg font-semibold">
                Se ha producido un error al confirmar el ticket, por favor
                prueba de nuevo.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 mt-8 mx-4">
            <RoundedFilledButton
              onClick={handleGoBackToScan}
              text="Escanear de nuevo"
            />
            <RoundedOutlineButton onClick={handleGoHome} text="Ir Al inicio" />
          </div>

          <div className="mt-6 flex justify-center">
            <FooterLogo />
          </div>
        </>
      )}
    </div>
  );
};

export default ScanConfirmPage;
