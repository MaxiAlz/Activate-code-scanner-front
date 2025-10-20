import { IoTicketSharp } from "react-icons/io5";
import { MdClose, MdPeopleAlt } from "react-icons/md";

interface OeventData {
  eventName: string;
  nameAccessCode: string;
  totalTickets: number;
  scannedTickets: number;
  remainingTickets: number;
}
interface OverviewEventProps {
  eventData: OeventData;
}

const OverviewEvent = ({
  eventData: {
    eventName,
    nameAccessCode,
    totalTickets,
    scannedTickets,
    remainingTickets,
  },
}: OverviewEventProps) => {
  return (
    <section className="bg-primary  ">
      <div className="pt-4 mx-2 text-white ">
        <p className="text-2xl font-semibold">{eventName}</p>
        {/* <p className="text-lg ">Viernes 7 Agosto 2025 - 21:30Hs</p> */}
        <p className="text-lg">{nameAccessCode}</p>
      </div>

      <div className="grid grid-cols-3 gap-4 py-5">
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white text-center">
            Total Tickets
          </span>
          <div className="flex items-center text-white text-xl ">
            <IoTicketSharp /> <span>{totalTickets}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white text-center">ingresos</span>
          <div className="flex items-center text-white text-xl ">
            <MdPeopleAlt /> <span>{scannedTickets}</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-white text-center">Resantes</span>
          <div className="flex items-center text-white text-xl ">
            <MdClose />
            <span>{remainingTickets}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export { OverviewEvent };
