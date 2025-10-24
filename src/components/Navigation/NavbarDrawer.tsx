import React, { useState } from "react";
import { MdClose, MdLogout, MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState, store } from "../../redux/store";
import { logoutUser } from "../../redux/slices/auth/authThunks";
import logoAppblanco from "../../assets/LOGO-TAKILLERO-WHITE.svg";
import faviconApp from "../../assets/TAKILLERO-FAVICON-NARANJA.svg";
import { RoundedOutlineButton } from "../Buttons/RoundedButtons";
const NavbarDrawer: React.FC = () => {
  const { sessionData } = useSelector(
    (state: RootState) => state.accessCodeAuth
  );
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<typeof store.dispatch>();
  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <nav className="bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex n">
              <button
                onClick={toggleNavbar}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">Abrir menú principal</span>
                {isNavbarOpen ? <MdClose size={25} /> : <MdMenu size={30} />}
              </button>
            </div>

            <div className="flex items-center text-2xl">
              <img src={logoAppblanco} alt="Logo" className="w-45" />
            </div>
          </div>
        </div>
      </nav>
      {/* Drawer y Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ease-in-out ${
          isNavbarOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Fondo Oscuro */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={toggleNavbar}
        ></div>

        {/* Drawer */}
        <div
          className={`fixed top-0 left-0 bottom-0 bg-slate-100 text-black shadow-lg transition-transform duration-300 ease-in-out w-4/5 max-w-sm ${
            isNavbarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center px-4 py-2 border-b">
            <img src={faviconApp} alt="Logo" className="w-10" />
            <h2 className="text-lg font-semibold ">Menú</h2>
            <button
              onClick={toggleNavbar}
              className="text-gray-500  focus:outline-none"
            >
              <span className="sr-only">Cerrar menú</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Contenido del Drawer */}
          <section className=" ">
            <div>
              <div className="p-4 rounded-lg shadow-md my-4 mx-2 bg-white">
                <div className="flex flex-col space-y-2">
                  <div className="border-b pb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Información del Evento
                    </h3>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-700 font-medium">
                      Evento: {sessionData?.data.eventName}
                    </p>
                    <p className="text-gray-600">
                      Código de Acceso: {sessionData?.data.nameAccessCode}
                    </p>
                    <p className="text-gray-600">
                      Total de Tickets:{" "}
                      <span className="font-bold">
                        {sessionData?.data.totalTickets}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Faltantes:{" "}
                      <span className="font-bold">
                        {sessionData?.data.remainingTickets}
                      </span>
                    </p>
                    <p className="text-gray-600">
                      Ingresos:{" "}
                      <span className="font-bold">
                        {sessionData?.data.scannedTickets}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mx-2">
              <RoundedOutlineButton
                onClick={handleLogout}
                text="Salir del sistema"
                icon={MdLogout}
                className="mt-4  w-full text-primary "
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export { NavbarDrawer };
