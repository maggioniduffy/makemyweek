import React, { useState } from "react";
import { DownButton } from "../Common";
import Button from "@mui/material/Button";
import VisibilityOffRoundedIcon from "@mui/icons-material/VisibilityOffRounded";
import VisibilityRoundedIcon from "@mui/icons-material/VisibilityRounded";

interface HowProps {
  order: string;
  text: string;
}

const HowCard = ({ order, text }: HowProps) => {
  return (
    <div className="w-56 m-2 flex flex-col bg-black bg-opacity-10 text-lightpink rounded shadow p-3">
      <h3 className="text-center font-bold mb-1"> {order} </h3>
      <hr className="border-0.5 border-gray"></hr>
      <p className="mt-2 p-4"> {text} </p>
    </div>
  );
};
const Welcome = () => {
  const [show, setShow] = useState(false);

  const showHow = () => {
    setShow(true);
    console.log(show);
  };
  const hide = () => setShow(false);

  return (
    <div className="h-screen w-full flex flex-col place-items-center justify-center">
      <h3 className="animate__animated animate__fadeInDown text-white text-left text-5xl">
        {" "}
        Bienvenido!{" "}
      </h3>
      <div className="bg-lightpink m-10 rounded-xl shadow animate__animated animate__pulse animate__delay-1s">
        <h5 className="text-darkpurple m-4 text-xl">
          {" "}
          Comienza a preparar tu semana <b> desde ahora </b>
        </h5>
      </div>

      {!show ? (
        <Button
          color="secondary"
          onClick={showHow}
          className="m-3 text-white"
          endIcon={<VisibilityRoundedIcon />}
        >
          {" "}
          Como funciona?
        </Button>
      ) : (
        <Button color="secondary" onClick={hide} className="m-3 text-white">
          <VisibilityOffRoundedIcon />
        </Button>
      )}
      {show && (
        <div className="flex w-full overflow-x-auto">
          <HowCard
            order={"Primero"}
            text={"Ingresa tus actividades semanales"}
          />
          <HowCard
            order={"Segundo"}
            text={
              "Para cada actividad, indica su horarios, ordenanos por" +
              "prioridad. Primero el que mas te guste y ultimo el que menos" +
              "prefieras"
            }
          />
          <HowCard
            order={"Tercero"}
            text={
              "Nosotros organizaremos las actividades de las maneras mas conveniente y te mostraremos los resultados para que elijas el que te quede mas comodo"
            }
          />
        </div>
      )}
      <DownButton next="activity" />
    </div>
  );
};

export default Welcome;
