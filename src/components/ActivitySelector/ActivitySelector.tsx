import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  selectActivities,
  removeActivity,
  editActivity,
  addActivity,
} from "../../store/slices";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Section } from "../Common";
import Selector from "../Common/Selector";
import { Button } from "@mui/base";
import { useEffect, useState } from "react";

const ActivitySelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();
  const [disabled, setDisabled] = useState(false);

  const deleteActivity = (e: any, id: number) => {
    e.preventDefault();
    dispatch(removeActivity({ id }));
  };

  const updateActivity = (e: any, name: string, id: number) => {
    e.preventDefault();
    dispatch(editActivity({ name: name.toUpperCase(), id }));
  };

  const appendActivity = () => {
    console.log(activities);
    dispatch(addActivity());
  };

  const checkLast = () => {
    const l = activities.length - 1;
    const last = activities[l];
    const st = last.name.length > 1;
    if (st == disabled) {
      setDisabled(!disabled);
    }
  };

  useEffect(() => {
    checkLast();
  }, [activities]);

  return (
    <Section id="activity" next="options" disable={disabled}>
      <Selector>
        <div className="w-96 flex flex-col place-items-center">
          <h4 className="text-center text-fandango text-2xl font-medium">
            {" "}
            Ingresa tus actividades de la semana{" "}
          </h4>
          <form className="mt-4">
            {activities.map((act, i) => {
              return (
                <div key={"" + i} className="flex space-x-2 justify-between">
                  <input
                    value={act.name}
                    className="bg-white border border-darkpurple rounded shadow mt-2 h-12 w-full p-2"
                    onChange={(e) => updateActivity(e, e.target.value, i)}
                    autoFocus
                  />
                  <button
                    className="text-center"
                    onClick={(e) => deleteActivity(e, i)}
                  >
                    <RemoveCircleOutlinedIcon className="text-darkpurple" />
                  </button>
                </div>
              );
            })}
          </form>
          <Button
            className="m-6"
            onClick={() => appendActivity()}
            disabled={disabled}
          >
            {" "}
            <AddCircleOutlinedIcon
              className="text-darkpurple"
              color={disabled ? "disabled" : "inherit"}
            />{" "}
          </Button>
        </div>
      </Selector>
    </Section>
  );
};

export default ActivitySelector;
