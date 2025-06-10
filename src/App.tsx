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

  return status === AuthStatus.CHECKING ? (
    <Loader />
  ) : (
    <Routes>
      {/* RUTAS PROTEGIDAS */}
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

      {/* RUTAS publicas */}
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
