import { Activity } from "@/models";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  selectActivities,
  removeActivity,
  editActivity,
  addActivity,
} from "../../store/slices";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const ActivitySelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  const deleteActivity = (e: any, id: number) => {
    e.preventDefault();
    dispatch(removeActivity({ id }));
  };

  const updateActivity = (e: any, name: string, id: number) => {
    e.preventDefault();
    dispatch(editActivity({ name, id }));
  };

  const appendActivity = () => {
    console.log(activities);
    dispatch(addActivity());
  };

  return (
    <div
      id="activity"
      className="h-screen flex flex-col place-items-center justify-center"
    >
      <div className="bg-white h-4/6 w-96 rounded-xl shadow shadow-xl p-4 flex flex-col place-items-center">
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
                  className="bg-lightpink rounded shadow mt-2 h-12 w-full p-2"
                  onChange={(e) => updateActivity(e, e.target.value, i)}
                />
                <button
                  className="text-center"
                  onClick={(e) => deleteActivity(e, i)}
                >
                  <RemoveCircleOutlinedIcon />
                </button>
              </div>
            );
          })}
        </form>
        <button className="m-6" onClick={() => appendActivity()}>
          {" "}
          <AddCircleOutlinedIcon />{" "}
        </button>
      </div>
      <a
        href="#options"
        className="mt-8 animate__animated animate__bounce animate__delay-2s hover:bg-pink rounded-full"
      >
        <ArrowDownwardIcon fontSize="large" htmlColor="white" />
      </a>
    </div>
  );
};

export default ActivitySelector;
