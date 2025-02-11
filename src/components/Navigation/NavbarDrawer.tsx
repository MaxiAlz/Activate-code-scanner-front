import React, { useState } from "react";
import {
  MdClose,
  MdHome,
  MdLogout,
  MdMenu,
  MdPeople,
  MdPerson,
  MdRocketLaunch,
} from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router";
import { RootState, store } from "../../redux/store";
import { logoutUser } from "../../redux/slices/auth/authThunks";

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

            {sessionData?.eventName ? (
              <aside>
                <div className="flex items-center text-2xl">
                  <MdPerson size={25} />
                  <span className=" font-semibold">Activate!</span>
                </div>
                <p className="text-end text-sm text-boxdark-2">Scaner</p>
              </aside>
            ) : (
              <div className="flex items-center text-2xl">
                <MdRocketLaunch size={25} />
                <span className=" font-semibold">Activate!</span>
              </div>
            )}
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
            <MdRocketLaunch size={25} />
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
              <Link
                to="/"
                className="px-3 py-2  rounded-md text-base font-medium flex items-center"
              >
                <MdHome className="mx-1" /> Inicio
              </Link>
              <Link
                to="/"
                className="flex items-center px-3 py-2 rounded-md text-base font-medium "
              >
                <MdPeople className="mx-1" /> Ingresos
              </Link>
            </div>

            <div>
              <button
                onClick={handleLogout}
                className="mt-4  w-full px-3 py-2 text-start rounded-md items-center flex text-primary"
              >
                <MdLogout className="mx-2" />
                Salir del sistema
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export { NavbarDrawer };
