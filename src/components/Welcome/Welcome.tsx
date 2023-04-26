import React from "react";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Welcome = () => {
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
      <a
        href="#activity"
        className="mt-4 animate__animated animate__bounce animate__delay-2s hover:bg-pink rounded-full"
      >
        <ArrowDownwardIcon fontSize="large" htmlColor="white" />
      </a>
    </div>
  );
};

export default Welcome;
