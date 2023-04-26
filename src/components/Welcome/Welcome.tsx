import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Welcome = () => {
  return (
    <div className="h-screen w-full flex flex-col place-items-center justify-center">
      <h3 className="text-white text-left text-3xl"> Bienvenido </h3>
      <h5 className="text-white text-ligthpink my-4">
        {" "}
        Comienza a preparar tu semana <b> desde ahora </b>
      </h5>
      <a
        href="#activity"
        className="mt-4 animate__animated animate__bounce animate__delay-1s hover:bg-pink rounded-full"
      >
        <ArrowDownwardIcon fontSize="large" htmlColor="white" />
      </a>
    </div>
  );
};

export default Welcome;
