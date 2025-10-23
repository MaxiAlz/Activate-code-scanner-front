import { Action, Dispatch, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { UserLoginData } from "../../../modules/auth/auth.types";
import { apiService } from "../../../services/apiService";
import { setLogoutUser, setUserAuthenticated } from "./authSlice";
import { AxiosResponse } from "axios";

const loginUser =
  (
    userData: UserLoginData
  ): ThunkAction<
    Promise<AxiosResponse | undefined>, // Especificamos el tipo de retorno
    RootState,
    unknown,
    Action<string>
  > =>
  async (dispatch: Dispatch) => {
    try {
      const response = await apiService.post("/Auth/accesscode", userData);

      if (response.status === 200) {
        dispatch(setUserAuthenticated(response.data));
        return response;
      }
    } catch (error) {
      console.log("error", error);
      dispatch(setLogoutUser());
    }
  };

const checkUserSession =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await apiService.get("/Auth/accesscode/profile");
      if (response.status === 200) {
        dispatch(setUserAuthenticated(response.data));
      } else {
        dispatch(setLogoutUser());
      }
    } catch (error) {
      console.error("error", error);
      dispatch(setLogoutUser());
    }
  };

const logoutUser =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await apiService.post("/Auth/logout");
      if (response.status === 200) {
        dispatch(setLogoutUser());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

export { loginUser, checkUserSession, logoutUser };
