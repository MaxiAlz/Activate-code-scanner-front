import { useLocation, useNavigate } from "react-router";
import { RoundedOutlineButton } from "../../components/Buttons/RoundedButtons";
import { MdErrorOutline } from "react-icons/md";

const ScanErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const message = location.state?.message || "Ocurrió un error inesperado.";
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center bg-slate-200">
      <MdErrorOutline size={40} className="text-error" />
      <p className="text-2xl text-slate-500 font-semibold">Oops! :(</p>
      <h1 className="text-xl font-bold text-error mb-4">Error del servidor</h1>
      <p className="text-gray-700 mb-6">{message}</p>

      <div className="flex justify-center w-full gap-4 mb-6">
        <RoundedOutlineButton
          className="w-full mx-8"
          onClick={() => navigate("/")}
          text="Volver al inicio"
        />
      </div>
    </div>
  );
};

export { ScanErrorPage };
