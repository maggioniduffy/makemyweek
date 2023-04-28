import { useAppSelector, useAppDispatch } from "../../hooks";
import {
  selectActivities,
  removeActivity,
  editActivity,
  addActivity,
  addOption,
} from "../../store/slices";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { Section } from "../Common";
import Selector from "../Common/Selector";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Option } from "../../models";

const OptionsSelector = () => {
  const activities = useAppSelector(selectActivities);
  const dispatch = useAppDispatch();

  const appendActivity = () => {
    console.log(activities);
    dispatch(
      addOption({
        activityId: 0,
        option: {
          priority: 1,
          start: {
            hour: 1,
            minute: 0,
          },
          end: {
            hour: 1,
            minute: 0,
          },
          day: 1,
        },
      })
    );
  };

  return (
    <Section id="options">
      <div className="flex h-full m-auto place-items-center p-6 space-x-4 justify-start align-start">
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
                  <form className="flex flex-col place-items-center justify-center">
                    {a.options?.map((o) => {
                      return (
                        <form
                          key={a.id + o.priority + ""}
                          className="flex place-items-center justify-between space-x-2 p-1 rounded border-gray shadow"
                        >
                          <div className="h-full flex flex-col place-items-center justify-end space-y-2">
                            <p className="font-bold bg-darkpurple rounded-full p-1 text-white text-center flex flex-col">
                              {" "}
                              {o.priority}
                            </p>
                            <p className="text-gray text-center text-xs">
                              {" "}
                              Prioridad
                            </p>
                          </div>
                          <select
                            name="Dia"
                            id="days"
                            className="bg-white text-darkpurple p-1 border-none rounded"
                          >
                            <option value={0}>Lunes</option>
                            <option value={1}>Martes</option>
                            <option value={2}>Miercoles</option>
                            <option value={3}>Jueves</option>
                            <option value={4}>Viernes</option>
                            <option value={5}>Sabado</option>
                          </select>
                          <div className="basis-1/3 flex flex-col">
                            <TimePicker ampm={false} closeOnSelect={true} />
                            <p className="text-gray text-center text-xs">
                              {" "}
                              Hora Inicio{" "}
                            </p>
                          </div>
                          <div className="basis-1/3 flex flex-col">
                            <TimePicker ampm={false} closeOnSelect={true} />
                            <p className="text-gray text-center text-xs">
                              {" "}
                              Hora Fin{" "}
                            </p>
                          </div>
                        </form>
                      );
                    })}
                  </form>
                  <button className="m-6" onClick={() => appendActivity()}>
                    {" "}
                    <AddCircleOutlinedIcon className="text-darkpurple" />{" "}
                  </button>
                </div>
              </Selector>
            );
          })}
      </div>
    </Section>
  );
};

export default OptionsSelector;
