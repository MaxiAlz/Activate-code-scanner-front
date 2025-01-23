
import { ScreenAlert } from "../../components/ScreenAlerts/ScreenAlert";
import { useNavigate } from "react-router";

const ScanResultPage = () => {
  const navigate = useNavigate();

  return (
    <ScreenAlert
      scanResult="result"
      status="success"
      handleScanAgain={() => navigate("/scan-qr")}
    />
  );
};

export default ScanResultPage;
