import { FooterLogo } from "../components/Navigation/FooterLogo";
import { NavbarDrawer } from "../components/Navigation/NavbarDrawer";
import { ValidationAlertModal } from "../components/ScreenAlerts/ValidationAlertModal";

const Test = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarDrawer />
      <main className="flex-grow">
        <ValidationAlertModal
          isOpen={true}
          onClose={() => {}}
          status="success"
          onGoHome={() => {}}
          message="Se ha registrado correctamente"
          title="Registro exitoso"
          onScanAgain={() => {}}
        />
      </main>
      <FooterLogo />
    </div>
  );
};

export { Test };
