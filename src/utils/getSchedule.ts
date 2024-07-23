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
  activities.forEach((a) => {
    a.options.forEach((o) => {
      o.
    })
  })
}
