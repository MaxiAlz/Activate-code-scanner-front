import { MdRocketLaunch } from "react-icons/md";
import "./RocketLoader.css";

const RocketLoader = () => {
  return (
    <div className="loader-container text-primary">
      <MdRocketLaunch className="rocket-icon" />
      <div className="exhaust-flame"></div>
    </div>
  );
};

export { RocketLoader };
