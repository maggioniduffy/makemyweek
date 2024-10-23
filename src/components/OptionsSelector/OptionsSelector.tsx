import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  selectActivities,
  addOption,
  removeOption,
  addTurn,
  removeTurn,
} from "../../store/slices";
import { Section } from "../Common";
import Selector from "../Common/Selector";
import Button from "@mui/material/Button";
import OptionsTimeSelector from "./OptionsTime";
import OptionsDay from "./OptionsDay";
import { useState } from "react";
import Link from "next/link";
import { getCalendar } from "@/utils/getSchedule";

const OptionsSelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();
  console.log(activities);
  const [comment, setComment] = useState<string | undefined>();

  if (
    activities.length <= 0 ||
    activities[activities.length - 1].name.length < 2
  ) {
    return null;
  }

  const appendOption = (e: any, id: number) => {
    e.preventDefault();
    const options = activities[id].options!;
    dispatch(
      addOption({
        activityId: id,
        option: {
          priority: options.length + 1,
          turns: [
            {
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
          ],
          comment,
        },
      })
    );
    setComment(undefined);
  };

  const deleteOption = (activityId: number, priority: number) => {
    dispatch(removeOption({ activityId, priority }));
  };

  const appendTurn = (activityId: number, priority: number) => {
    dispatch(addTurn({ activityId, priority }));
  };

  const deleteTurn = (activityId: number, priority: number, ix: number) => {
    dispatch(removeTurn({ activityId, priority, ix }));
  };

  return (
    <Section id="options">
      <>
        <div className="flex flex-wrap mt-20 mx-auto justify-center align-center overflow-auto">
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
                        return (
                          <div
                            key={a.id + o.priority + ""}
                            className="flex w-full p-2 border place-items-center justify-between space-y-2 p-1 rounded border-gray"
                          >
                            <div className="h-full w-full flex flex-col place-items-center justify-start my-4">
                              <h5 className="text-darkpurple rounded p-1 text-center flex flex-col">
                                {" "}
                                Opcion {o.priority}
                                <p
                                  contentEditable
                                  className="text-xs w-full border rounded border-gray"
                                  onChange={(e) => appendOption(e, a.id)}
                                >
                                  {o?.comment}
                                </p>
                              </h5>
                              <div className="my-2 flex flex-col">
                                <Button
                                  onClick={() => deleteOption(a.id, o.priority)}
                                  size="small"
                                  color="secondary"
                                  variant="contained"
                                >
                                  Borrar opcion
                                </Button>
                              </div>
                            </div>
                            <div className="flex flex-col space-y-4">
                              <div className="flex flex-col w-full place-items-center">
                                {o.turns.map((t, i) => {
                                  return (
                                    <div
                                      className="flex m-1 shadow rounded p-2"
                                      key={a.id + o.priority + i + ""}
                                    >
                                      <OptionsDay
                                        id={a.id}
                                        priority={o.priority}
                                        index={i}
                                      />
                                      <OptionsTimeSelector
                                        id={a.id}
                                        priority={o.priority}
                                        start
                                        index={i}
                                      />
                                      <OptionsTimeSelector
                                        id={a.id}
                                        priority={o.priority}
                                        index={i}
                                      />
                                      <Button
                                        size="small"
                                        color="secondary"
                                        onClick={() =>
                                          deleteTurn(a.id, o.priority, i)
                                        }
                                      >
                                        Borrar horario
                                      </Button>
                                    </div>
                                  );
                                })}
                              </div>

                              <Button
                                onClick={() => appendTurn(a.id, o.priority)}
                                size="small"
                                color="secondary"
                              >
                                Agregar horario
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </form>
                    <form
                      className="flex"
                      onSubmit={(e) => appendOption(e, a.id)}
                    >
                      <Button
                        className="basis-1/3"
                        size="small"
                        color="secondary"
                        variant="contained"
                        onClick={(e) => appendOption(e, a.id)}
                      >
                        {" "}
                        Agregar opcion
                      </Button>
                      <input
                        className="w-full h-full mx-2 p-1 text-sm"
                        placeholder="Comentario para la opcion, ejemplo: catedra, profesor, aula. (Opcional) "
                        value={comment ? comment : ""}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </form>
                  </div>
                </Selector>
              );
            })}
        </div>
        <Link className="p-4" href={"/result"}>
          <Button
            className="w-fit mb-10"
            color="secondary"
            variant="contained"
            href="/result"
            //onClick={getCalendar}
          >
            {" "}
            Ver calendario semanal{" "}
          </Button>
        </Link>
      </>
    </Section>
  );
};

export default OptionsSelector;
