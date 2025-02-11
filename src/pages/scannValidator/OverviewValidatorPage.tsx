import {
  MdClose,
  MdPeopleAlt,
  MdQrCodeScanner,
  MdSearch,
} from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { RoundedFilledButton } from "../../components/Buttons/RoundedButtons";
import { AppLayout } from "../../Layouts/AppLayout";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const OverviewValidatorPage = () => {
  const navigate = useNavigate();
  const { sessionData } = useSelector(
    (state: RootState) => state.accessCodeAuth
  );
  return (
    <AppLayout>
      <div className="md:flex justify-center items-center lg:m-10 ">
        {/* Ventana de resumen de ingresos */}
        <div className="md:w-1/2 sm:w-full md:shadow-xl ">
          <section className="bg-primary  ">
            <div className="pt-4 mx-2 text-white ">
              <p className="text-2xl font-semibold">{sessionData?.eventName}</p>
              <p className="text-lg ">Viernes 7 Agosto 2025 - 21:30Hs</p>
            </div>

            <div className="grid grid-cols-3 gap-4 py-5">
              <div className="flex flex-col items-center">
                <span className="font-semibold text-white text-center">
                  Total Tickets
                </span>
                <div className="flex items-center text-white text-xl ">
                  <IoTicketSharp /> <span>{sessionData?.totalTickets}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-white text-center">
                  ingresos
                </span>
                <div className="flex items-center text-white text-xl ">
                  <MdPeopleAlt /> <span>{sessionData?.scannedTickets}</span>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <span className="font-semibold text-white text-center">
                  Resantes
                </span>
                <div className="flex items-center text-white text-xl ">
                  <MdClose />
                  <span>{sessionData?.remainingTickets}</span>
                </div>
              </div>
            </div>
          </section>
          <section className="mb-4 p-4">
            <label className="mb-2.5 block font-medium ">
              Busca los E-tickets por codigo:
            </label>
            <div className="relative">
              <input
                type="text"
                name="eticketId"
                placeholder="Ingresa un E-ticket ID"
                className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                // onChange={loginFormik.handleChange}
                // onBlur={loginFormik.handleBlur}
                // value={loginFormik.values.email}
              />

              <span className="absolute right-4 top-4">
                <MdSearch size={25} />
              </span>
            </div>

            <div className="flex w-full justify-center mt-10">
              <RoundedFilledButton
                className=""
                text="Escanear E-Tickets"
                type="button"
                onClick={() => navigate("/scan-qr")}
                icon={<MdQrCodeScanner size={25} />}
              />
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
};

export { OverviewValidatorPage };
