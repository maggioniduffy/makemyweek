import React, { useEffect, useState } from "react";
import Head from "next/head";
import { Inter } from "next/font/google";
import Link from "next/link";
import { AuxCalendar } from "@/components";
import { getCalendar } from "@/utils/getSchedule";
import { useAppSelector } from "@/hooks";
import { selectActivities } from "@/store/slices";
import { Activity, Option, Turn } from "@/models";
import Calendar from "@/components/Calendar";

const inter = Inter({ subsets: ["latin"] });

interface ResTurn {
  activity: Activity;
  priority: Option;
}

interface Respond {
  score: number;
  turns: ResTurn[];
}

const result = () => {
  const activities = useAppSelector(selectActivities);
  const [res, setRes] = useState<Respond[]>();
  useEffect(() => {
    console.log(activities);
    const setter = async () => {
      const response = await getCalendar(activities);
      console.log(response);
      setRes(response);
    };
    setter();
  }, []);
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
        {res ? <Calendar acts={res} /> : <AuxCalendar />}
      </main>
    </div>
  );
};

export default result;
