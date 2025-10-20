// src/pages/ScanConfirmPage.tsx

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

  useEffect(() => {
    if (ticketCode) {
      mutate([ticketCode]); 
    }
  }, [mutate, ticketCode]);

  console.log("successData", successData?.data[0]);

  const handleGoBackToScan = () => navigate("/scan-qr");
  const handleGoHome = () => navigate("/");

  return (
    <div className="flex flex-col min-h-screen">
      {isPending && <TicketLoader />}
      {isSuccess && successData && (
        <>
          <div className="bg-success text-white shadow-lg ">
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
              <p className="text-lg font-semibold">Platea General</p>
            </div>
          </div>

          <div className=" space-y-2 mx-10 mt-6 text-xl">
            <p className=" ">
              Nombre:{" "}
              <span className="font-semibold">{successData.data[0].name}</span>
            </p>
            <p className="">
              DNI:{" "}
              <span className="font-semibold">{successData.data[0].dni}</span>
            </p>

            <p className="">
              Ingreso:{" "}
              <span className="font-semibold">
                {new Date(successData.data[0].timeOfEntry).toLocaleTimeString(
                  "es-AR"
                )}
                Hs
              </span>
            </p>
            <p className="">
              Codigo: <span className="font-semibold">{ticketCode}</span>
            </p>
            <p className="">
              Detalle:{" "}
              <span className="font-semibold">Acceso a Meet & Grid</span>
            </p>
          </div>
          <div className="flex flex-col gap-4 mt-8 mx-4">
            <RoundedFilledButton
              onClick={handleGoBackToScan}
              text=" Escanear otro ticket"
            />
            <RoundedOutlineButton onClick={handleGoHome} text="Ir Al inicio" />
          </div>
          <FooterLogo />
        </>
      )}

      {/* <div className="bg-success text-white shadow-lg ">
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
          <p className="text-lg font-semibold">Platea General</p>
        </div>
      </div> */}

      {/* <div className=" space-y-2 mx-10 mt-6 text-xl">
        <p className=" ">
          Nombre: <span className="font-semibold">{mochData.data[0].name}</span>
        </p>
        <p className="">
          DNI: <span className="font-semibold">{mochData.data[0].dni}</span>
        </p>

        <p className="">
          Ingreso:{" "}
          <span className="font-semibold">
            {new Date(mochData.data[0].timeOfEntry).toLocaleTimeString("es-AR")}
            Hs
          </span>
        </p>
        <p className="">
          Codigo: <span className="font-semibold">{ticketCode}</span>
        </p>
        <p className="">
          Detalle: <span className="font-semibold">Acceso a Meet & Grid</span>
        </p>
      </div> */}

      {isError && (
        <>
          <div className="bg-slate-200 text-error text-center shadow-lg ">
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
              <p className="text-xl font-bold">Oops! </p>
              <p className="text-lg font-semibold">
                Se ah producido un error al confirmar el ticket, por favor
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
        </>
      )}
    </div>
  );
};

export default ScanConfirmPage;
