import { MdQrCodeScanner, MdRocketLaunch } from "react-icons/md";
import { Link } from "react-router";
import { LoginForm } from "../../modules/auth/LoginForm";

const AuthPage = () => {
  return (
    <div>
      <div className="flex items-center text-primary dark:text-white justify-center py-6">
        <MdRocketLaunch size={30} />
        <h2 className="text-3xl font-bold uppercase sm:text-title-xl2">
          Activate!
        </h2>
      </div>
      <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2  ">
        <div className="flex flex-col items-center justify-center my-4">
          <MdQrCodeScanner size={80} />
          <h3 className="text-xl font-bold sm:text-title-xl2 text-slate-500">
            QR Validator
          </h3>
        </div>
        <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
          <LoginForm />
        </div>

        <div className="mt-6 text-center">
          <p>
            ¿No sabes como generar tu codigo de acceso?{" "}
            <Link to="/" className="text-primary">
              Documentacion aqui
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export { AuthPage };
