import { MdQrCodeScanner, MdRocketLaunch } from "react-icons/md";
import { Link, useNavigate } from "react-router";
import { LoginForm } from "../../modules/auth/LoginForm";
import { RoundedOutlineButton } from "../../components/Buttons/RoundedButtons";

const AuthPage = () => {
  const navigator = useNavigate();
  return (
    <div className="flex w-full items-center justify-center  h-screen">
      <div className="w-full border-stroke  xl:w-1/2 xl:shadow-1  lg:border p-4">
        <div className="flex flex-col items-center justify-center my-4">
          <MdQrCodeScanner size={80} />
          <h3 className="text-xl font-bold sm:text-title-xl2 text-slate-500">
            QR Validator
          </h3>
        </div>
        <div className="w-full lg:px-10 ">
          <LoginForm />
        </div>

        <div className=" text-center my-5">
          <p>
            ¿No sabes como generar tu codigo de acceso?{" "}
            <Link to="/" className="text-primary">
              Documentacion aqui
            </Link>
          </p>
          <RoundedOutlineButton
            onClick={() => navigator("/overview")}
            text="Ir al panel"
          />
        </div>
        <div className="flex items-center text-primary  justify-center">
          <MdRocketLaunch size={20} />
          <h2 className="text-xl font-bold uppercase">Activate!</h2>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
