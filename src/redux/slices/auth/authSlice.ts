import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthStatus,
  LoginState,
  UserLoginData,
} from "../../../modules/auth/auth.types";

const initialState: LoginState = {
  accessCodeName: "",
  userName: "",
  status: AuthStatus.CHECKING,
  // error: "",
};

export const accessCodeAuthSlice = createSlice({
  name: "accessCodeAuth",
  initialState,
  reducers: {
    setUserAuthenticated: (state, action: PayloadAction<UserLoginData>) => {
      state.accessCodeName = action.payload.code;
      state.userName = action.payload.userName;
      state.status = AuthStatus.AUTHENTICATED;
    },
    setLogoutUser(state: LoginState) {
      state.accessCodeName = "";
      state.userName = "";
      state.status = AuthStatus["NOT-AUTHENTICATED"];
    },
    // setError: (state, action: PayloadAction<string>) => {
    //   state.error = action.payload;
    // },
  },
});
export const { setUserAuthenticated, setLogoutUser } =
  accessCodeAuthSlice.actions;

// Exporta el reducer para incluirlo en el store
export default accessCodeAuthSlice.reducer;
