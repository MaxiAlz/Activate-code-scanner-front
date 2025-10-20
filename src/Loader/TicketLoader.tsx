import "./RocketLoader.css";
import { IoTicket } from "react-icons/io5";

const TicketLoader = () => {
  return (
    <div className="loader-container text-primary">
      <IoTicket className="rocket-icon" />
      <div className="exhaust-flame"></div>
    </div>
  );
};

export { TicketLoader };
