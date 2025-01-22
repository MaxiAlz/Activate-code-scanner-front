import { configureStore } from "@reduxjs/toolkit";
import accessCodeAuthReducer from "./slices/auth/authSlice";

const store = configureStore({
  reducer: {
    accessCodeAuth: accessCodeAuthReducer,
  },
});
// Tipos para `useSelector` y `useDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
