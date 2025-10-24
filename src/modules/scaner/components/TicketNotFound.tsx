import { MdArrowBack, MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import {
  RoundedFilledButton,
  RoundedOutlineButton,
} from "../../../components/Buttons/RoundedButtons";

interface TicketNotFoundProps {
  message?: string;
}
const TicketNotFound = ({ message }: TicketNotFoundProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="bg-error text-white shadow-lg ">
        <div className="m-4 w-full">
          <button
            className="flex items-center gap-2 font-semibold"
            onClick={() => navigate("/scan-qr/")}
          >
            <MdArrowBack size={30} /> <p>Volver</p>
          </button>
        </div>
        <div className="flex flex-col items-center text-center  gap-2 px-10 py-5">
          <MdErrorOutline size={50} />
          <p className="text-xl font-bold">¡TICKET NO ENCONTRADO!</p>

          <div className="text-center my-4"></div>
          <p className={`inline-block px-4 py-2   text-white `}>
            Revisa que el codigo sea correcto e intentá nuevamente.
          </p>
          <p className="text-md mt-4">{message}</p>
        </div>
      </div>
      <div className="flex flex-col gap-4 mt-8 mx-4">
        <RoundedFilledButton
          onClick={() => navigate(`/scan-qr/`)}
          text="Escanear de nuevo"
        />
        <RoundedOutlineButton
          text="Ir al Inicio"
          onClick={() => navigate("/")}
        />
      </div>
    </>
  );
};

export { TicketNotFound };
