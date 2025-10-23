import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { FooterLogo } from "../../components/Navigation/FooterLogo";
import { IoTicket } from "react-icons/io5";
import {
  RoundedFilledButton,
  RoundedOutlineButton,
} from "../../components/Buttons/RoundedButtons";
import { MdArrowBack } from "react-icons/md";
import { useValidateTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";

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
  const queryClient = useQueryClient();
  const { isPending } = useValidateTicketMutation();

  const scanData = queryClient.getQueryData<ScanData>([
    "ticketScan",
    "last-scanned-ticket",
  ]);

  if (!scanData?.data) {
    navigate("/");
    return null;
  }

  const { personName, personDni, eventName, ticket } = scanData.data;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-slate-500 text-white shadow-lg ">
        <div className="m-4 w-full">
          <button
            className="flex items-center gap-2 font-semibold"
            onClick={() => navigate("/")}
          >
            <MdArrowBack size={30} /> <p>Volver</p>
          </button>
        </div>

        <div className="flex flex-col items-center text-center  gap-2 px-10 py-5">
          <IoTicket size={50} />
          <p className="text-xl font-bold">¡TICKET ENCONTRADO!</p>

          {ticket.state === "USED" && (
            <div className="text-center my-4">
              <p
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold  bg-error text-white `}
              >
                ¡YA FUE UTILIZADO!
              </p>

              <p className="text-md ">
                No puedes validar este ticket, ya fue utilizado previamente.
              </p>
            </div>
          )}

          {ticket.state === "BUYED" && (
            <div className="text-center my-2 ">
              <p
                className={`inline-block px-4 py-2 rounded-full text-sm font-semibold  bg-success text-white `}
              >
                INGRESO PERMITIDO
              </p>
              <p className="text-md mt-4">
                Verifica los datos y validá el ingreso de la persona
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="text-center my-4 text-lg text-primary font-bold uppercase">
        <p>{eventName}</p>
      </div>
      <div className=" space-y-2 mx-10  ">
        <p className=" ">
          Nombre: <span className="font-semibold">{personName}</span>
        </p>
        <p className="">
          DNI: <span className="font-semibold">{personDni}</span>
        </p>

        <p className="">
          Codigo: <span className="font-semibold">{ticket.code}</span>
        </p>
        <p className="">
          Ticket: <span className="font-semibold">{ticket.ticketTypeName}</span>
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-8 mx-4">
        <RoundedFilledButton
          disabled={ticket.state === "USED"}
          onClick={() => navigate(`/scan-confirm/${ticket.code}`)}
          text="Validar y confirmar Ingreso"
          isLoading={isPending}
        />
        <RoundedOutlineButton text="Cancelar" onClick={() => navigate("/")} />
      </div>

      <FooterLogo />
    </div>
  );
};

export default ScanResultPage;
