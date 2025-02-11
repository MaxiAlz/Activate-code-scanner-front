import {
  MdLogin,
  MdOutlineNoEncryption,
  MdPersonOutline,
} from "react-icons/md";
import { RoundedFilledButton } from "../../../components/Buttons/RoundedButtons";
import { useLoginFormik } from "../useLoginFormik";

const LoginForm = () => {
  const loginFormik = useLoginFormik();
  return (
    <form onSubmit={loginFormik.handleSubmit}>
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white text-start">
          Nombre:
        </label>
        <div className="relative">
          <input
            type="text"
            name="userName"
            id="userName"
            placeholder="Ingrese su Nombre"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.userName}
          />
          {loginFormik.touched.userName && loginFormik.errors.userName && (
            <span className="text-red-600">{loginFormik.errors.userName}</span>
          )}

          <span className="absolute right-4 top-4">
            <MdPersonOutline size={25} />
          </span>
        </div>
      </div>

      <div className="mb-6">
        <label className="mb-2.5 block font-medium text-black dark:text-white text-start">
          Codigo de Acceso:
        </label>

        <div className="relative">
          <input
            type="text"
            id="code"
            name="code"
            placeholder="Ingrese contraseña"
            className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10  text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
            onChange={loginFormik.handleChange}
            onBlur={loginFormik.handleBlur}
            value={loginFormik.values.code}
          />
          {loginFormik.touched.code && loginFormik.errors.code && (
            <span className="text-red-600">{loginFormik.errors.code}</span>
          )}

          <span className="absolute right-4 top-4">
            {/* <MdOutlineEnhancedEncryption size={25} /> */}
            <MdOutlineNoEncryption size={25} />
          </span>
        </div>
        <p className="text-sm text-start mb-2 text-strokedark">
          Ingresa o pega el codigo generado desde el panel de tu evento.
        </p>
      </div>

      <div className="mb-5">
        <RoundedFilledButton
          className="w-full"
          text="Validar mi Identidad"
          type="submit"
          icon={<MdLogin size={25} />}
          disabled={loginFormik.isSubmitting}
          isLoading={loginFormik.isSubmitting}
        />
      </div>
    </form>
  );
};

export { LoginForm };
