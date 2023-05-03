import { useAppDispatch, useAppSelector } from "@/hooks";
import { Day, weekDays } from "@/models";
import { selectActivities, updateDay } from "@/store/slices";
import React from "react";

const days = [
  {
    label: "Lunes",
    value: 0,
  },
  {
    label: "Martes",
    value: 1,
  },
  {
    label: "Miercoles",
    value: 2,
  },
  {
    label: "Jueves",
    value: 3,
  },
  {
    label: "Viernes",
    value: 4,
  },
  {
    label: "Sabado",
    value: 5,
  },
];

interface Props {
  id: number;
  priority: number;
  index: number;
}

const OptionsDay = ({ id, priority, index }: Props) => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  const editDay = (e: any) => {
    e.preventDefault();
    const day = e.target.value as Day;
    console.log("dia: ", day);
    dispatch(updateDay({ activityId: id, priority, day, index }));
  };

  return (
    <select
      name="Dia"
      id="days"
      placeholder="Dia"
      className="bg-white w-fit text-darkpurple p-1 border-none rounded h-full my-1"
      onChange={(e) => editDay(e)}
      value={weekDays.get(
        activities[id]?.options[priority - 1]?.turns[index].day
      )}
    >
      {days.map(({ label, value }) => (
        <option key={label} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export default OptionsDay;
