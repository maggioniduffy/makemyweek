import React, { useState } from "react";
import { DownButton } from "../Common";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";

const Welcome = () => {
  const [show, setShow] = useState(false);

  const showHow = () => {
    setShow(true);
    console.log(show);
  };
  const hide = () => setShow(false);

  return (
    <div className="h-screen w-full flex flex-col place-items-center justify-center">
      <Button
        sx={{
          position: "absolute",
          top: 80,
          right: 25,
          width: "fit-content",
          height: "2rem",
        }}
        variant="contained"
        color="secondary"
        onClick={showHow}
        className="relative"
      >
        {" "}
        Como funciona?{" "}
      </Button>
      {show && (
        <div className="place-items-center absolute border border-white text-md text-left flex flex-col space-y-1 top-5 w-72 p-5 text-white z-50 h-fit w-fit rounded-2xl bg-darkpurple2 bg-opacity-90 overflow-hidden right-5">
          <h3> 1- Ingresa tus actividades semanales </h3>
          <h3>
            {" "}
            2- Para cada actividad, indica su horarios, ordenanos por prioridad.
            Primero el que mas te guste y ultimo el que menos prefieras ;){" "}
          </h3>
          <h3>
            {" "}
            3- Elegi cual de los horarios semanales que creamos para vos te
            gusta mas y listo!{" "}
          </h3>
          <Button
            onClick={hide}
            variant="contained"
            color="secondary"
            className="w-24 mt-2"
          >
            {" "}
            <ClearIcon />{" "}
          </Button>
        </div>
      )}
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
      <DownButton next="activity" />
    </div>
  );
};

export default Welcome;
