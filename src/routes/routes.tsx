import { AuthPage, OverviewValidatorPage, QRScannerPage } from "../pages";
import ScanResultPage from "../pages/scannValidator/ScanResultPage";
import { Test } from "../pages/Test";

export const notAuthenticatedRoutes = [{ path: "/", component: AuthPage }];

export const protectedRoutes = [
  { path: "/overview", component: OverviewValidatorPage },
  { path: "/scan-qr", component: QRScannerPage },
  { path: "/scan-result", component: ScanResultPage },
  { path: "/test", component: Test },
];
