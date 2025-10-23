import { MdQrCodeScanner, MdSearch } from "react-icons/md";
import { RoundedFilledButton } from "../../components/Buttons/RoundedButtons";
import { AppLayout } from "../../Layouts/AppLayout";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { OverviewEvent } from "../../modules/scaner/components/OverviewEvent";
import { useCheckTicketMutation } from "../../modules/scaner/hooks/useCheckTicketMutation";

const OverviewValidatorPage = () => {
  const navigate = useNavigate();
  const { sessionData } = useSelector(
    (state: RootState) => state.accessCodeAuth
  );
  const checkTicketMutation = useCheckTicketMutation();
  const [eticketToSearch, setEticketToSearch] = useState<string>("");

  const handleSearchEticket = async () => {
    await checkTicketMutation.mutateAsync(eticketToSearch);
  };
  return (
    <AppLayout>
      <div className="md:flex justify-center items-center lg:m-10 ">
        {/* Ventana de resumen de ingresos */}
        {sessionData && sessionData.data && (
          <div className="md:w-1/2 sm:w-full md:shadow-xl ">
            <OverviewEvent eventData={sessionData.data} />

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
                  onChange={(e) =>
                    setEticketToSearch(e.target.value.toUpperCase())
                  }
                  maxLength={10}
                />

                <span className="absolute right-4 top-4">
                  <MdSearch size={25} />
                </span>
              </div>

              <div className="flex w-full justify-center mt-10">
                {eticketToSearch.length > 0 ? (
                  <RoundedFilledButton
                    text="Buscar E-Ticket"
                    type="button"
                    onClick={handleSearchEticket}
                    icon={<MdSearch size={25} />}
                    disabled={eticketToSearch.length < 10}
                    isLoading={checkTicketMutation.isPending}
                  />
                ) : (
                  <RoundedFilledButton
                    text="Escanear E-Tickets"
                    type="button"
                    onClick={() => navigate("/scan-qr")}
                    icon={<MdQrCodeScanner size={25} />}
                  />
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export { OverviewValidatorPage };
