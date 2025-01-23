import { Route, Routes } from "react-router";
import { AuthPage, OverviewValidatorPage, QRScannerPage } from "./pages";
import ScanResultPage from "./pages/scannValidator/ScanResultPage";
// import { ScreenAlert } from "./components/ScreenAlerts/ScreenAlert";

// import { useSelector } from "react-redux";
// import { RootState } from "./redux/store";
// import { checkUserSession } from "./redux/slices/auth/authThunks";

function App() {
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

  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path="/overview" element={<OverviewValidatorPage />} />
      <Route path="/scan-qr" element={<QRScannerPage />} />
      <Route path="/scan-result" element={<ScanResultPage />} />
      {/* <Route path="/scan-result" element={<ScreenAlert status="success" />} /> */}
    </Routes>
  );
}

export default App;
