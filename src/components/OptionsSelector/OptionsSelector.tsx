import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  selectActivities,
  removeActivity,
  editActivity,
  addActivity,
  updateDay,
  addOption,
  removeOption,
  updateStartTime,
  updateEndTime,
} from "../../store/slices";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Section } from "../Common";
import Selector from "../Common/Selector";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { StaticTimePicker } from "@mui/x-date-pickers/StaticTimePicker";
import { Day, Option, weekDays } from "../../models";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import Button from "@mui/material/Button";
import dayjs from "dayjs";
import { useEffect } from "react";

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
const OptionsSelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  useEffect(() => {}, [activities]);

  const appendOption = (id: number) => {
    const options = activities[id].options!;
    dispatch(
      addOption({
        activityId: id,
        option: {
          priority: options.length + 1,
          start: {
            hour: 8,
            minute: 0,
          },
          end: {
            hour: 9,
            minute: 0,
          },
          day: 0,
        },
      })
    );
  };

  const editDay = (id: number, priority: number, e: any) => {
    e.preventDefault();
    const day = e.target.value as Day;
    console.log("dia: ", day);
    dispatch(updateDay({ activityId: id, priority, day }));
    console.log("editday", activities);
  };

  const deleteOption = (activityId: number, priority: number) => {
    dispatch(removeOption({ activityId, priority }));
  };

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
    console.log(aux);
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
    } else {
      alert("error");
    }
    console.log(activities[activityId].options);
  };

  return (
    <Section id="options">
      <div className="flex h-full w-fit m-auto place-items-center p-6 space-x-4 justify-start align-start">
        {activities
          .filter((a) => a.name.length > 2)
          .map((a) => {
            return (
              <Selector key={a.id}>
                <div className="flex flex-col space-y-2 w-full">
                  <h4 className="text-2xl">
                    {" "}
                    Ingresa los distintos horarios que tenes para{" "}
                    <b className="text-darkpurple"> {a.name}</b>
                  </h4>
                  <form className="flex flex-col place-items-center justify-center w-full">
                    {a.options?.map((o) => {
                      let endHour = 9;
                      let endMinute = 0;
                      let startHour = 8;
                      let startMinute = 0;
                      if (activities[a.id]?.options[o.priority - 1]?.end) {
                        endHour =
                          activities[a.id].options[o.priority - 1].end.hour;
                        endMinute =
                          activities[a.id].options[o.priority - 1].end.minute;
                        startHour =
                          activities[a.id].options[o.priority - 1].start.hour;
                        startMinute =
                          activities[a.id].options[o.priority - 1].start.minute;
                      }

                      return (
                        <div
                          key={a.id + o.priority + ""}
                          className="flex w-full p-2 border place-items-center justify-between space-x-2 p-1 rounded border-gray shadow"
                        >
                          <div className="h-full w-10 flex flex-col place-items-center justify-center space-y-2">
                            <p className="font-bold bg-darkpurple rounded-full p-1 text-white text-center flex flex-col">
                              {" "}
                              {o.priority}
                            </p>
                          </div>
                          <select
                            name="Dia"
                            id="days"
                            placeholder="Dia"
                            className="bg-white w-fit text-darkpurple p-1 border-none rounded h-full my-1"
                            onChange={(e) => editDay(a.id, o.priority, e)}
                            value={weekDays.get(
                              activities[a.id]?.options[o.priority - 1]?.day
                            )}
                          >
                            {days.map(({ label, value }) => (
                              <option key={label} value={value}>
                                {label}
                              </option>
                            ))}
                          </select>
                          <div className="w-fit flex flex-col">
                            <TimePicker
                              ampm={false}
                              closeOnSelect={true}
                              className="w-28"
                              label="Hora Inicio"
                              views={["hours", "minutes"]}
                              onChange={(newValue) =>
                                updateInitTime(a.id, o.priority, newValue)
                              }
                              value={dayjs(
                                `2022-04-17T${startHour}:${startMinute}`
                              )}
                              maxTime={dayjs(
                                `2022-04-17T${endHour}:${endMinute}`
                              )}
                            />
                          </div>
                          <div className="w-fit lex flex-col">
                            <TimePicker
                              ampm={false}
                              closeOnSelect={true}
                              className="w-28"
                              views={["hours", "minutes"]}
                              label="Hora Fin"
                              onChange={(newValue) =>
                                updateFinishTime(a.id, o.priority, newValue)
                              }
                              value={dayjs(
                                `2022-04-17T${endHour}:${endMinute}`
                              )}
                              minTime={dayjs(
                                `2022-04-17T${startHour}:${startMinute + 1}`
                              )}
                            />
                          </div>
                          <Button
                            onClick={() => deleteOption(a.id, o.priority)}
                            className="w-8"
                          >
                            <RemoveCircleOutlinedIcon className="text-darkpurple" />
                          </Button>
                        </div>
                      );
                    })}
                  </form>
                  <Button className="m-6" onClick={() => appendOption(a.id)}>
                    {" "}
                    <AddCircleOutlinedIcon className="text-darkpurple" />{" "}
                  </Button>
                </div>
              </Selector>
            );
          })}
      </div>
    </Section>
  );
};

export default OptionsSelector;
