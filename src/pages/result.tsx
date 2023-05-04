import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const result = () => {
  return (
    <div>
      <Head>
        <title>MakeMyWeek | Arma tus horarios en 3 simples pasos</title>
        <meta name="Creador de calendario semanal. Organiza tus clases, entrenamientos, cursos o lo que necesites" />
      </Head>
      <header className="fixed py-4 z-50 bg h-fit text-center w-full">
        <h1 className="text-2xl text-lightpink font-medium text-shadow">
          {" "}
          Make My Week{" "}
        </h1>
      </header>
      <main
        className={`flex h-screen w-screen flex-col items-center justify-between ${inter.className}`}
      >
        <table className="bg-white w-10/12 rounded-xl shadow h-full m-48">
          {" "}
        </table>
      </main>
    </div>
  );
};

export default result;
