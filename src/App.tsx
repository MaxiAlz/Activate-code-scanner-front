import { Route, Routes } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "./redux/store";
import { checkUserSession } from "./redux/slices/auth/authThunks";
import { useEffect } from "react";
import { Loader } from "./Loader/Loader";
import { AuthStatus } from "./modules/auth/auth.types";
import { RootState } from "./redux/store";
import { RoutesForNotAuthenticated } from "./routes/RoutesForNotAuthenticated";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { notAuthenticatedRoutes, protectedRoutes } from "./routes/routes";

function App() {
  const dispatch: AppDispatch = useDispatch();
  const { status } = useSelector((state: RootState) => state.accessCodeAuth);

  useEffect(() => {
    const verifySession = async () => {
      dispatch(checkUserSession());
    };

    verifySession();
  }, [dispatch]);
  // const dispatch: AppDispatch = useDispatch();
  // const { status, userName } = useSelector(
  //   (state: RootState) => state.accessCodeAuth
  // );

  // const verifySession = async () => {
  //   dispatch(checkUserSession());
  // };

  // 9EDD75869D

  /* TODO:

  Cuando se escanea un codigo recibir informacion del tiket, evento, titular y elresultado del escaneo (success, denegado, advertencia,)
  Secion del usuario debe traer informacion del evento:
        - Total de tickets que se van a escanear
        - ingresos realizados
        - ingresos restantes ( o no, los calculo por front)
  Buscador de tickets: buscar por E-ticket ID o DNI
  Recibir el nombre de la persona que escanea los tickets:
  */

  return status === AuthStatus.CHECKING ? (
    <Loader />
  ) : (
    <Routes>
      {/* RUTAS PUBLICAS */}
      {protectedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <ProtectedRoutes>
              <route.component />
            </ProtectedRoutes>
          }
        />
      ))}

      {/* RUTAS PROTEGIDAS */}
      {notAuthenticatedRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <RoutesForNotAuthenticated>
              <route.component />
            </RoutesForNotAuthenticated>
          }
        />
      ))}
    </Routes>
  );
}

export default App;
