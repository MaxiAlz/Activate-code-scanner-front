import { FooterLogo } from "../components/Navigation/FooterLogo";
import { NavbarDrawer } from "../components/Navigation/NavbarDrawer";

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <NavbarDrawer />
      </header>
      <main className="flex-grow ">
        {/* <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10"> */}
        {children}
        {/* </div> */}
      </main>

      <FooterLogo />
    </div>
  );
};

export { AppLayout };
