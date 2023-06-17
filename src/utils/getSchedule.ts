import { Activity, Option } from "@/models";

interface Respond {
  score: number;
  turns: { activity: Activity; priority: Option }[];
}

export async function getCalendar(activities: Array<Activity>) {
  const MIN = activities.length;
  let res: Respond[] = [];
  activities.forEach((a) => {
    let aux: Respond = {
      score: 0,
      turns: [],
    };
    const temp = { activity: a, priority: a.options[0] };
    aux.turns.push(temp);
  });
}
