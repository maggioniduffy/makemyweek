import React from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });

const WhiteSpace = () => <div className="bg-transparent h-full w-full"></div>;

const heights = ["12", "16", "20", "24"];
const GraySpace = () => {
  const i = Math.floor(Math.random() * 4);
  const h = heights[i];
  return (
    <div className={`bg-gray rounded-lg h-${h} m-2 bg-opacity-50 w-full`}></div>
  );
};

const result = () => {
  return (
    <div>
      <Head>
        <title>MakeMyWeek | Arma tus horarios en 3 simples pasos</title>
        <meta name="Creador de calendario semanal. Organiza tus clases, entrenamientos, cursos o lo que necesites" />
      </Head>
      <header className="fixed py-4 z-50 bg h-fit text-center w-full">
        <Link
          className="text-2xl text-lightpink font-medium text-shadow"
          href={"/"}
        >
          {" "}
          Make My Week{" "}
        </Link>
      </header>
      <main
        className={`flex h-screen w-screen flex-col items-center justify-between ${inter.className}`}
      >
        <table className="table-fixed bg-white w-10/12 rounded-xl shadow h-full m-48 p-4">
          <thead className="">
            {/* <tr className="text-gray">
              <th>Lunes</th>
              <th>Martes</th>
              <th>Miercoles</th>
              <th>Jueves</th>
              <th>Viernes</th>
              <th>Sabado</th>
            </tr> */}
          </thead>
          <tbody>
            <tr>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
            </tr>
            <tr>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
            </tr>
            <tr>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
            </tr>
            <tr>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
              <td>
                <GraySpace />
              </td>
              <td>
                <WhiteSpace />
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default result;
