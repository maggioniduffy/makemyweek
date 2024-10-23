import { Activity, Option, Turn } from "@/models";
import React from "react";

interface ResTurn {
  activity: Activity;
  priority: Option;
}

interface Respond {
  score: number;
  turns: ResTurn[];
}

interface Props {
  acts: Respond[];
}

// Generar una fila por cada hora del día.
const hours = Array.from({ length: 17 }, (_, i) => `${i + 7}:00`);

const Calendar = ({ acts }: Props) => {
  // Inicializamos una estructura para almacenar las actividades por día y hora.
  const calendarMatrix: { [day: number]: { [hour: number]: ResTurn | null } } =
    {
      0: {}, // Lunes
      1: {}, // Martes
      2: {}, // Miércoles
      3: {}, // Jueves
      4: {}, // Viernes
      5: {}, // Sábado
    };

  // Ubicamos las actividades en la matriz según su día y hora.
  acts.forEach((act) => {
    act.turns.forEach((turn) => {
      turn.priority.turns.forEach((turnDetails: Turn) => {
        const day = turnDetails.day; // Día de la actividad
        const startHour = turnDetails.start.hour; // Hora de inicio
        const endHour = turnDetails.end.hour; // Hora de fin

        for (let hour = startHour; hour < endHour; hour++) {
          calendarMatrix[day][hour] = turn; // Colocamos la actividad en la hora correspondiente.
        }
      });
    });
  });

  // Generamos la tabla del calendario con los días y horas.
  return (
    <table className="table-fixed bg-white w-10/12 rounded-xl shadow h-full m-48 p-8">
      <thead className="h-12">
        <tr>
          <th>Lunes</th>
          <th>Martes</th>
          <th>Miércoles</th>
          <th>Jueves</th>
          <th>Viernes</th>
          <th>Sábado</th>
        </tr>
      </thead>
      <tbody className="m-4">
        {hours.map((hour, idx) => (
          <tr key={idx}>
            {/* Generar columnas para cada día */}
            {[0, 1, 2, 3, 4, 5].map((day) => (
              <td key={day} className="">
                {calendarMatrix[day][idx] ? (
                  <div className="bg-blue-200 p-1 rounded">
                    {/* Renderizamos el nombre de la actividad */}
                    {calendarMatrix[day][idx]?.activity.name}
                    {hour}
                  </div>
                ) : (
                  ""
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Calendar;
