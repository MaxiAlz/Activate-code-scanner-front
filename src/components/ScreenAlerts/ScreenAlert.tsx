import {
  MdArrowBack,
  MdCheckCircleOutline,
  MdErrorOutline,
  MdInfoOutline,
  MdNotes,
  MdQrCodeScanner,
  MdWarningAmber,
} from "react-icons/md";
import {
  RoundedFilledButton,
  RoundedOutlineButton,
} from "../Buttons/RoundedButtons";
import { useNavigate } from "react-router";

interface ScreenAlertProps {
  status: "success" | "denied" | "warning" | "info";
  scanResult: string;
  handleScanAgain: () => void;
}

const statusConfig = {
  success: {
    color: "bg-success",
    icon: <MdCheckCircleOutline size={100} />,
    message: "Ingreso Permitido",
  },
  denied: {
    color: "bg-error",
    icon: <MdErrorOutline size={100} />,
    message: "Ingreso Denegado",
  },
  warning: {
    color: "bg-warning",
    icon: <MdWarningAmber size={100} />,
    message: "Advertencia",
  },
  info: {
    color: "bg-secondary",
    icon: <MdInfoOutline size={100} />,
    message: "Información",
  },
};

// esta pantalla recibira las props para , acceso permitido, denegado o ya se escaneo
const ScreenAlert = ({
  status,
  scanResult,
  handleScanAgain,
}: ScreenAlertProps) => {
  const { color, icon, message } = statusConfig[status];
  const navigate = useNavigate();
  return (
    <section className=" ">
      <div className={`${color}`}>
        <button className="p-4 text-white" onClick={() => navigate(-1)}>
          <MdArrowBack size={30} />
        </button>
      </div>
      <div
        className={`${color} pb-4 text-white items-center flex justify-center flex-col`}
      >
        {icon}
        <p className="text-2xl">{message}</p>
        <p>{scanResult}</p>
      </div>

      <div className="m-4">
        <p>
          E-Ticket ID:
          <span className="font-bold mx-1"> ACT123C</span>
        </p>
        <p>
          Titular:
          <span className="font-bold mx-1"> Pollo Pollmendez del Valle</span>
        </p>
        <p>
          DNI:
          <span className="font-bold mx-1"> 25.365.236</span>
        </p>
        <p>
          Transaccion:
          <span className="font-bold mx-1"> #5625</span>
        </p>
        <p>
          Tranferido:
          <span className="font-bold mx-1"> NO</span>
        </p>
        <p>
          Detalles:
          <span className="font-bold mx-1"> Platea techada</span>
        </p>
      </div>
      <div className="flex justify-around mt-10">
        <RoundedOutlineButton text="Agregar algo" icon={MdNotes} />
        <RoundedFilledButton
          onClick={handleScanAgain}
          text="Escanear otro"
          icon={<MdQrCodeScanner />}
        />
      </div>
    </section>
  );
};

export { ScreenAlert };
