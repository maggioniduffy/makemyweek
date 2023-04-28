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
    <Section id="activity" next="options">
      <Selector>
        <>
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
                    className="bg-white border-darkpurple rounded shadow mt-2 h-12 w-full p-2"
                    onChange={(e) => updateActivity(e, e.target.value, i)}
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
          <button className="m-6" onClick={() => appendActivity()}>
            {" "}
            <AddCircleOutlinedIcon className="text-darkpurple" />{" "}
          </button>
        </>
      </Selector>
    </Section>
  );
};

export default ActivitySelector;
