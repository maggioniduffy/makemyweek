import { Activity, Option, Turn } from "@/models";

interface ResTurn {
  activity: Activity;
  priority: Option;
}

interface Respond {
  score: number;
  turns: ResTurn[];
}

function isCompatible(a: Turn, b: Turn):boolean {
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

function compareOptions(a: Option, b: Option):number {
  let i = 0;
  let res = true;
  let len = a.turns.length;
  const turnsA = a.turns
  const turnsB = b.turns
  while (i<len && res) {
    let turnA = turnsA[i];

    turnsB.forEach((turnB) => {
      res = isCompatible(turnA,turnB);
    })

    i++;
  }

  if (res) {
    return a.priority + b.priority
  } else {
    return -1;
  }
}



export async function getCalendar(activities: Array<Activity>) {
  console.log("Acts", activities);
  let responses: Respond[] = []
  const firstAct = activities.shift()
  const lenRemainActs = activities.length;
  const len = firstAct?.options.length;
  let i = 0
  if (len){
    while (i<len) {
      let option = firstAct.options[i]
      let j = 0;
      let mainScore = 0;
      let resTurns: ResTurn[] = [{activity: firstAct,priority: option}]
      while (j<lenRemainActs){
        const act = activities[j]
        const lenActOptions = act.options.length
        let score = -1;
        let k = 0;
        while (score == -1 && k < lenActOptions) {
          score = compareOptions(option,act.options[k])
          k++
        }
        if (score > 0) {
          mainScore += score;
          resTurns.push({
            activity: act,
            priority: act.options[k-1]
          })
        }
        j++
      }
      responses.push({
        score: mainScore,
        turns: resTurns
      })
      i++
    }
  }

  responses.sort((a,b) => a.score < b.score ? -1:1);
  responses.slice(0,3)

  return responses
}
