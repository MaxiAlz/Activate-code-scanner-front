import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AuthStatus } from "../modules/auth/auth.types";
import { Navigate } from "react-router";

interface ProtectedRouterProps {
  children: ReactNode;
}

const ProtectedRoutes = ({ children }: ProtectedRouterProps) => {
  const { status, sessionData } = useSelector(
    (state: RootState) => state.accessCodeAuth
  );

  if (!sessionData?.eventName && status !== AuthStatus.AUTHENTICATED) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoutes;
