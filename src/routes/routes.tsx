import { AuthPage, OverviewValidatorPage, QRScannerPage } from "../pages";
import ScanConfirmPage from "../pages/scannValidator/ScanConfirmPage";
import { ScanErrorPage } from "../pages/scannValidator/ScanErrorPage";
import ScanResultPage from "../pages/scannValidator/ScanResultPage";
import { Test } from "../pages/Test";

export const notAuthenticatedRoutes = [{ path: "/", component: AuthPage }];

export const protectedRoutes = [
  { path: "/overview", component: OverviewValidatorPage },
  { path: "/scan-qr", component: QRScannerPage },
  { path: "/scan-result", component: ScanResultPage },
  { path: "/scan-confirm/:ticketCode", component: ScanConfirmPage },
  { path: "/scan/error", component: ScanErrorPage },
  { path: "/*", component: Test },
];
