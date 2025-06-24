// import {
//   MdArrowBack,
//   MdCheckCircleOutline,
//   MdErrorOutline,
//   MdInfoOutline,
//   MdNotes,
//   MdQrCodeScanner,
//   MdWarningAmber,
// } from "react-icons/md";
// import {
//   RoundedFilledButton,
//   RoundedOutlineButton,
// } from "../Buttons/RoundedButtons";
// import { useNavigate } from "react-router";

// interface ScreenAlertProps {
//   status: "success" | "denied" | "warning" | "info";
//   sanMessage: string;
//   handleScanAgain: () => void;
//   codeResultData: ScanResult;
// }

// interface ScanResult {
//   code: string;
//   dni: string;
//   name: string;
//   timeOfEntry: string;
// }

// const statusConfig = {
//   success: {
//     color: "bg-success",
//     icon: <MdCheckCircleOutline size={100} />,
//     message: "Ingreso Permitido",
//   },
//   denied: {
//     color: "bg-error",
//     icon: <MdErrorOutline size={100} />,
//     message: "Ingreso Denegado",
//   },
//   warning: {
//     color: "bg-warning",
//     icon: <MdWarningAmber size={100} />,
//     message: "Advertencia",
//   },
//   info: {
//     color: "bg-secondary",
//     icon: <MdInfoOutline size={100} />,
//     message: "Información",
//   },
// };

// // esta pantalla recibira las props para , acceso permitido, denegado o ya se escaneo
// const ScreenAlert = ({
//   status,
//   sanMessage,
//   handleScanAgain,
//   codeResultData,
// }: ScreenAlertProps) => {
//   const { color, icon, message } = statusConfig[status];
//   const navigate = useNavigate();
//   return (
//     <main className="">
//       <div className={`${color}`}>
//         <button className="p-4 text-white" onClick={() => navigate(-1)}>
//           <MdArrowBack size={30} />
//         </button>
//       </div>
//       <div
//         className={`${color} pb-4 text-white items-center flex justify-center flex-col`}
//       >
//         {icon}
//         <p className="text-2xl">{sanMessage}</p>
//         <p>{message}</p>
//       </div>
//       <div className="flex w-full justify-center">
//         <section className="lg:w-1/3 shadow-xl p-5">
//           <div className="m-4">
//             <p>
//               E-Ticket ID:
//               <span className="font-bold mx-1"> {codeResultData.code}</span>
//             </p>
//             <p>
//               Titular:
//               <span className="font-bold mx-1"> {codeResultData.name}</span>
//             </p>
//             <p>
//               DNI:
//               <span className="font-bold mx-1"> {codeResultData.dni}</span>
//             </p>
         
//             <p>
//               Ingreso:
//               <span className="font-bold mx-1">
//                 {" "}
//                 {codeResultData.timeOfEntry}
//               </span>
//             </p>
//           </div>
//           <div className="flex justify-around mt-10">
//             <RoundedOutlineButton text="Agregar algo" icon={MdNotes} />
//             <RoundedFilledButton
//               onClick={handleScanAgain}
//               text="Escanear otro"
//               icon={<MdQrCodeScanner />}
//             />
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// };

// export { ScreenAlert };
