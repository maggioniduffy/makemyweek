import { Activity, Option } from "@/models";

interface Respond {
  score: number;
  turns: { activity: Activity; priority: Option }[];
}

export async function getCalendar(activities: Array<Activity>) {
  console.log(activities);
}
