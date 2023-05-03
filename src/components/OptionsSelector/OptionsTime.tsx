import { useAppDispatch, useAppSelector } from "@/hooks";
import {
  selectActivities,
  updateEndTime,
  updateStartTime,
} from "@/store/slices";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

interface Props {
  id: number;
  priority: number;
  start?: boolean;
}

const OptionsTime = ({ id, priority, start = false }: Props) => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  const updateInitTime = (activityId: number, priority: number, v: any) => {
    dispatch(
      updateStartTime({
        activityId,
        priority,
        time: {
          hour: v.$H,
          minute: v.$m,
        },
      })
    );
  };

  const updateFinishTime = (activityId: number, priority: number, v: any) => {
    const aux = activities[activityId].options.filter(
      (a) => a.priority == priority
    );
    const startTime = activities[activityId].options[priority - 1].start;
    if (
      v.$H > startTime.hour ||
      (v.$H == startTime.hour && v.$m > startTime.minute)
    ) {
      dispatch(
        updateEndTime({
          activityId,
          priority,
          time: {
            hour: v.$H,
            minute: v.$m,
          },
        })
      );
    }
  };

  const getTimes = () => {
    let endHour = 9;
    let endMinute = 0;
    let startHour = 8;
    let startMinute = 0;
    if (activities[id]?.options[priority - 1]?.end) {
      endHour = activities[id].options[priority - 1].end.hour;
      endMinute = activities[id].options[priority - 1].end.minute;
      startHour = activities[id].options[priority - 1].start.hour;
      startMinute = activities[id].options[priority - 1].start.minute;
    }
    return { startHour, startMinute, endHour, endMinute };
  };

  const { startHour, startMinute, endHour, endMinute } = getTimes();

  if (start) {
    return (
      <div className="w-fit flex flex-col">
        <TimePicker
          ampm={false}
          closeOnSelect={true}
          className="w-28"
          label="Hora Inicio"
          views={["hours", "minutes"]}
          onChange={(newValue) => updateInitTime(id, priority, newValue)}
          value={dayjs(`2022-04-17T${startHour}:${startMinute}`)}
          //maxTime={dayjs(`2022-04-17T${endHour}:${endMinute}`)}
        />
      </div>
    );
  }

  return (
    <div className="w-fit lex flex-col">
      <TimePicker
        ampm={false}
        closeOnSelect={true}
        className="w-28"
        views={["hours", "minutes"]}
        label="Hora Fin"
        onChange={(newValue) => updateFinishTime(id, priority, newValue)}
        value={dayjs(`2022-04-17T${endHour}:${endMinute}`)}
        minTime={dayjs(`2022-04-17T${startHour}:${startMinute + 1}`)}
      />
    </div>
  );
};

export default OptionsTime;
