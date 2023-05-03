import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectActivities, addOption, removeOption } from "../../store/slices";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Section } from "../Common";
import Selector from "../Common/Selector";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import OptionsTimeSelector from "./OptionsTime";
import OptionsDay from "./OptionsDay";

const OptionsSelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  if (
    activities.length <= 0 ||
    activities[activities.length - 1].name.length < 2
  ) {
    return null;
  }

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

  const deleteOption = (activityId: number, priority: number) => {
    dispatch(removeOption({ activityId, priority }));
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
                          <OptionsDay id={a.id} priority={o.priority} />
                          <OptionsTimeSelector
                            id={a.id}
                            priority={o.priority}
                            start
                          />
                          <OptionsTimeSelector
                            id={a.id}
                            priority={o.priority}
                          />
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
