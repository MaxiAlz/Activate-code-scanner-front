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

      // Preparar manualmente la data para guardar en el estado
      const dataAuthenticated = {
        code: response.data,
        userName: userData.userName,
      };

      if (response.status === 200) {
        dispatch(setUserAuthenticated(dataAuthenticated));
        return response;
      }
    } catch (error) {
      console.log("error", error);
      // dispatch(setError(`Failed to login ${error}`));
      dispatch(setLogoutUser());
    }
  };

const checkUserSession =
  (): ThunkAction<void, RootState, unknown, Action<string>> =>
  async (dispatch: Dispatch) => {
    try {
      const response = await apiService.get("/Auth/profile");
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

export { loginUser, checkUserSession };
