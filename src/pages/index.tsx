import Head from "next/head";
import { Inter } from "next/font/google";
import { ActivitySelector, Welcome } from "@/components";
import "animate.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>MakeMyWeek | Arma tus horarios en 3 simples pasos</title>
        <meta name="Creador de calendario semanal. Organiza tus clases, entrenamientos, cursos o lo que necesites" />
      </Head>
      <header className="fixed py-4 z-50 bg h-fit text-center w-full">
        <h1 className="text-4xl text-pink font-medium text-shadow">
          {" "}
          Make My Week{" "}
        </h1>
      </header>
      <main
        className={`flex h-full flex-col items-center justify-between ${inter.className}`}
      >
        <Welcome />
        <ActivitySelector />
      </main>
    </div>
  );
}
