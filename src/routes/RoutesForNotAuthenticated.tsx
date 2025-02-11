import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AuthStatus } from "../modules/auth/auth.types";
import { Navigate } from "react-router";

interface LoginRouterProps {
  children: ReactNode;
}

const RoutesForNotAuthenticated = ({ children }: LoginRouterProps) => {
  const { status } = useSelector((state: RootState) => state.accessCodeAuth);
  console.log("status", status);

  if (status === AuthStatus.AUTHENTICATED) {
    return <Navigate to="/overview" />;
  }

  return <>{children}</>;
};

export { RoutesForNotAuthenticated };
