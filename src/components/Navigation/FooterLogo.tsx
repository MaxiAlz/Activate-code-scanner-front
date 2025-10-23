import logoAppNegro from "../../assets/LOGO-TAKILLERO-NEGRO.svg";

const FooterLogo = () => {
  return (
    <footer className="my-4 w-full flex justify-center items-center">
      <div className="flex items-center text-2xl">
        <img src={logoAppNegro} alt="Logo" className="w-45" />
      </div>
    </footer>
  );
};

export { FooterLogo };
