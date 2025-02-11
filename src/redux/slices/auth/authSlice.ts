import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AuthStatus,
  LoginState,
  UserAuthenticatedData,
} from "../../../modules/auth/auth.types";

const initialState: LoginState = {
  sessionData: null,
  status: AuthStatus.CHECKING,
  error: "",
};

export const accessCodeAuthSlice = createSlice({
  name: "accessCodeAuth",
  initialState,
  reducers: {
    setUserAuthenticated: (
      state,
      action: PayloadAction<UserAuthenticatedData>
    ) => {
      state.sessionData = action.payload;
      state.status = AuthStatus.AUTHENTICATED;
    },
    setLogoutUser(state) {
      state.sessionData = null;
      state.status = AuthStatus["NOT-AUTHENTICATED"];
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});
export const { setUserAuthenticated, setLogoutUser } =
  accessCodeAuthSlice.actions;

// Exporta el reducer para incluirlo en el store
export default accessCodeAuthSlice.reducer;
