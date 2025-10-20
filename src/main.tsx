// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { TanStackProvider } from "./plugins/TanStackProvider.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <TanStackProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </TanStackProvider>
  // </StrictMode>
);
