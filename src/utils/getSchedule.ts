import { Activity, Option, Turn } from "@/models";

interface Respond {
  score: number;
  turns: { activity: Activity; priority: Option }[];
}

function isCompatible(a: Turn, b: Turn) {
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
        return true
      }
    }
  }

  return false;
}

export async function getCalendar(activities: Array<Activity>) {
  console.log("Acts", activities);
  let responses: Respond[] = []
  let maxScoreAllowed = 999;
  let firstAct = activities[0]
  firstAct.options.forEach((o) => {
    activities.slice(1).forEach((a) => {
      o.turns.forEach((t) => {
        a.options.forEach((ao) => {
          let flag = true;
          ao.turns.forEach((aot) => {
            if (!isCompatible(aot,t)) {
              flag = false;
            }
          })
          if (flag) {
            let score = o.priority + ao.priority
            if (score < maxScoreAllowed) {
              responses.push({
                score,
                turns: []
              })
            }
          }
        })
      })
    })
  })
}
