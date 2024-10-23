// import { Activity, Option, Turn } from "@/models";

// interface ResTurn {
//   activity: Activity;
//   priority: Option;
// }

// interface Respond {
//   score: number;
//   turns: ResTurn[];
// }

// // Función para verificar si dos turnos son compatibles en cuanto a día y horas.
// function isCompatible(a: Turn, b: Turn): boolean {
//   const dayA = a.day;
//   const startA = a.start;
//   const endA = a.end;

//   const dayB = b.day;
//   const startB = b.start;
//   const endB = b.end;

//   // Si los turnos son en días diferentes, no hay problema.
//   if (dayA != dayB) {
//     return true;
//   }

//   // Verificamos si los turnos se solapan en el mismo día.
//   if (
//     endA.hour < startB.hour ||
//     (endA.hour == startB.hour && endA.minute <= startB.minute)
//   ) {
//     return true;
//   }

//   return false;
// }

// // Función que compara dos opciones de turnos y devuelve el puntaje si son compatibles.
// function compareOptions(optionA: Option, optionB: Option): number {
//   // Verificamos todas las combinaciones de turnos entre dos opciones.
//   for (let turnA of optionA.turns) {
//     for (let turnB of optionB.turns) {
//       // Si algún turno no es compatible, devolvemos -1.
//       if (!isCompatible(turnA, turnB)) {
//         return -1;
//       }
//     }
//   }

//   // Si son compatibles, sumamos las prioridades.
//   return optionA.priority + optionB.priority;
// }

// export async function getCalendar(activities: Array<Activity>) {
//   console.log(activities);
//   let responses: Respond[] = [];
//   const clonedActivities = [...activities];

//   const firstAct = clonedActivities.shift(); // Sacamos la primera actividad del array clonado
//   const lenRemainActs = clonedActivities.length;

//   // Si no hay actividades o la primera no tiene opciones, devolvemos vacío.
//   if (!firstAct || firstAct.options.length === 0) return [];

//   // Recorremos las opciones de la primera actividad.
//   for (let option of firstAct.options) {
//     let mainScore = option.priority;
//     let resTurns: ResTurn[] = [{ activity: firstAct, priority: option }];
//     let validSchedule = true; // Flag para verificar si la combinación es válida

//     // Recorremos las actividades restantes.
//     for (let act of activities) {
//       let bestScore = -1;
//       let bestOption: Option | null = null;

//       // Buscamos la mejor opción compatible con la actividad actual.
//       for (let actOption of act.options) {
//         const score = compareOptions(option, actOption);
//         if (score !== -1 && (bestScore === -1 || score < bestScore)) {
//           bestScore = score;
//           bestOption = actOption;
//         }
//       }

//       // Si encontramos una opción compatible, la agregamos.
//       if (bestOption) {
//         mainScore += bestScore;
//         resTurns.push({ activity: act, priority: bestOption });
//       } else {
//         // Si no encontramos opción compatible, marcamos como inválido este horario.
//         validSchedule = false;
//         break;
//       }
//     }

//     // Si encontramos una combinación válida, la agregamos a los resultados.
//     if (validSchedule) {
//       responses.push({
//         score: mainScore,
//         turns: resTurns,
//       });
//     }
//   }

//   // Ordenamos los resultados por el puntaje total (menor es mejor).
//   responses.sort((a, b) => a.score - b.score);

//   console.log(responses);
//   // Retornamos las 3 mejores combinaciones.
//   return responses.slice(0, 3);
// }

import { Activity, Option, Turn } from "@/models";

interface ResTurn {
  activity: Activity;
  priority: Option;
}

interface Respond {
  score: number;
  turns: ResTurn[];
}

function isCompatible(a: Turn, b: Turn): boolean {
  const dayA = a.day;
  const startA = a.start;
  const endA = a.end;

  const dayB = b.day;
  const startB = b.start;
  const endB = b.end;

  if (dayA != dayB) {
    return true;
  }

  if (endA.hour < startB.hour) {
    return true;
  } else {
    if (endA.hour == startB.hour) {
      if (endA.minute <= startB.minute) {
        return true;
      }
    }
  }

  return false;
}

function compareOptions(a: Option, b: Option): number {
  let i = 0;
  let res = true;
  let len = a.turns.length;
  const turnsA = a.turns;
  const turnsB = b.turns;
  while (i < len && res) {
    let turnA = turnsA[i];

    turnsB.forEach((turnB) => {
      res = isCompatible(turnA, turnB);
    });

    i++;
  }

  if (res) {
    return a.priority + b.priority;
  } else {
    return -1;
  }
}

export async function getCalendar(activities: Array<Activity>) {
  console.log("Acts", activities);
  let responses: Respond[] = [];
  const auxActs = [...activities];
  const firstAct = auxActs.shift();
  const lenRemainActs = auxActs.length;
  const len = firstAct?.options.length;
  let i = 0;
  if (len) {
    while (i < len) {
      let option = firstAct.options[i];
      let j = 0;
      let mainScore = 0;
      let resTurns: ResTurn[] = [{ activity: firstAct, priority: option }];
      while (j < lenRemainActs) {
        const act = activities[j];
        const lenActOptions = act.options.length;
        let score = -1;
        let k = 0;
        while (score == -1 && k < lenActOptions) {
          score = compareOptions(option, act.options[k]);
          k++;
        }
        if (score > 0) {
          mainScore += score;
          resTurns.push({
            activity: act,
            priority: act.options[k - 1],
          });
        }
        j++;
      }
      responses.push({
        score: mainScore,
        turns: resTurns,
      });
      i++;
    }
  }

  responses.sort((a, b) => (a.score < b.score ? -1 : 1));
  responses.slice(0, 3);

  return responses;
}
