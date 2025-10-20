import { IoTicket } from "react-icons/io5";

const Loader = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white w-full dark:bg-boxdark-2">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
      <div className="flex my-4 font-bold uppercase text-primary text-2xl text-center justify-center">
        <IoTicket size={20} />
        <h2 className="">Takillero!</h2>
      </div>
    </div>
  );
};

export { Loader };
