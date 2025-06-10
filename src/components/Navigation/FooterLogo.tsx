import { MdRocketLaunch } from "react-icons/md";

const FooterLogo = () => {
  return (
    <footer className="my-4 w-full flex justify-center items-center">
      <div className="flex items-center text-2xl">
        <MdRocketLaunch size={25} />
        <span className=" font-semibold">Takillero!</span>
      </div>
    </footer>
  );
};

export { FooterLogo };
