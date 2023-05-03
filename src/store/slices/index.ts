import { Activity, Option, Day, Moment } from "./../../models/index";
import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WeekState {
  activities: Array<Activity>;
}

interface AddOptionDTO {
  option: Option;
  activityId: number;
}

interface EditDayDTO {
  activityId: number;
  priority: number;
  day: Day;
}

const initialState: WeekState = {
  activities: [
    {
      id: 0,
      name: "",
      options: [
        {
          priority: 1,
          start: { hour: 8, minute: 0 },
          end: { hour: 9, minute: 0 },
          day: 0,
        },
      ],
    },
  ],
};

export const activitySlice = createSlice({
  reducers: {
    addActivity: (state) => {
      const id = state.activities.length;
      const activity: Activity = {
        id,
        name: "",
        options: [
          {
            priority: 1,
            start: { hour: 8, minute: 0 },
            end: { hour: 9, minute: 0 },
            day: 0,
          },
        ],
      };
      //const newActivities = [...state.activities, activity];
      //return { ...state, activities: newActivities };
      state.activities.push(activity);
    },
    removeActivity: (state, action: PayloadAction<{ id: number }>) => {
      const copy = state.activities.filter((ac) => ac.id != action.payload.id);
      state.activities = copy;
      //return { ...state, activities: copy };
    },
    editActivity: (
      state,
      action: PayloadAction<{ name: string; id: number }>
    ) => {
      const { id, name } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == id) {
          index = i;
        }
      });

      if (index >= 0) state.activities[index].name = name;
      // const act = { ...state.activities[id], name };
      // const acts = state.activities;
      // acts[id] = act;
      // return { ...state, activities: acts };
    },
    addOption: (state, action: PayloadAction<AddOptionDTO>) => {
      const { activityId, option } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });

      if (index >= 0) {
        //state.activities[index].options.push(option);}
        const newOptions = [...state.activities[index].options, option];
        state.activities[index].options = newOptions;
      }
      // const acts = [...state.activities];
      // const act = acts[activityId];
      // const options = act.options;
      // const newOptions = [...options, option];
      // const newAct = { ...act, options: newOptions };
      // acts[activityId] = newAct;
      // return { ...state, activities: acts };
      // state.activities[activityId] = newAct;
    },
    removeOption: (
      state,
      action: PayloadAction<{ activityId: number; priority: number }>
    ) => {
      const { activityId, priority } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });
      if (index >= 0) {
        state.activities[index].options.splice(priority - 1, 1);
        state.activities[index].options.forEach((o, i) => (o.priority = i + 1));
      }
    },
    updateDay: (state, action: PayloadAction<EditDayDTO>) => {
      const { activityId, priority, day } = action.payload;
      console.log("day en reducer ", typeof day);
      console.log("pr en reducer ", priority);

      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });
      if (index >= 0) {
        const ix = priority - 1;
        state.activities[index].options[ix].day = day;
      }
      // alert(state.activities[activityId].options[priority - 1].day);
      // const acts = [...state.activities];
      // const act = acts[activityId];
      // if (act.options) {
      //   act.options[priority - 1].day = day;
      //   const newOptions = [...act.options];
      //   console.log("newoptions", newOptions);
      //   newOptions[priority - 1].day = day as Day;
      //   const newAct = { ...act, options: newOptions };
      //   acts[activityId] = newAct;
      //   return { ...state, activities: acts };
      // }
      // return { ...state };
    },
    updateStartTime: (
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
        time: Moment;
      }>
    ) => {
      const { activityId, priority, time } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });
      if (index >= 0) {
        const ix = priority - 1;
        state.activities[index].options[ix].start = time;

        console.log("OPTION", current(state.activities[index].options));
      }
      // const acts = [...state.activities];
      // const act = acts[activityId];
      // const newOptions = [...act.options];
      // newOptions[priority - 1].start = time;
      // const newAct = { ...act, options: newOptions };
      // acts[activityId] = newAct;
      // return { ...state, activities: acts };
    },
    updateEndTime(
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
        time: Moment;
      }>
    ) {
      const { activityId, priority, time } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });
      if (index >= 0) {
        const ix = priority - 1;
        state.activities[index].options[ix].end = time;
      }
      // const acts = [...state.activities];
      // const act = acts[activityId];
      // const newOptions = [...act.options];
      // newOptions[priority - 1].end = time;
      // const newAct = { ...act, options: newOptions };
      // acts[activityId] = newAct;
      // return { ...state, activities: acts };
    },
  },
  name: "week",
  initialState: initialState as WeekState,
});
//; actions
export const {
  addActivity,
  addOption,
  removeActivity,
  editActivity,
  updateDay,
  removeOption,
  updateStartTime,
  updateEndTime,
} = activitySlice.actions;

// selectors  ;
export const selectActivities = (state: RootState) => state.week.activities;

export default activitySlice.reducer;
