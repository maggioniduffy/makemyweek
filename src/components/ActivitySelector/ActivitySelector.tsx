import { Activity } from "@/models";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { selectActivities, removeActivity } from "../../store/slices";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";

const ActivitySelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  const deleteNote = () => {
    dispatch(removeActivity());
  };

  return (
    <div id="activity" className="h-screen flex place-items-center">
      <div className="bg-white h-4/6 w-96 rounded-xl shadow shadow-xl m-auto p-4 flex flex-col place-items-center">
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
                  className="bg-lightpink rounded shadow mt-2 h-12 w-full"
                />
                <button className="text-center" onClick={() => deleteNote()}>
                  <RemoveCircleOutlinedIcon />
                </button>
              </div>
            );
          })}
        </form>
        <button className="m-6">
          {" "}
          <AddCircleOutlinedIcon />{" "}
        </button>
      </div>
    </div>
  );
};

export default ActivitySelector;
