import { Activity, Option, Day, Moment } from "./../../models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
      state.activities.push(activity);
    },
    removeActivity: (state, action: PayloadAction<{ id: number }>) => {
      const copy = state.activities.filter((ac) => ac.id != action.payload.id);
      state.activities = copy;
    },
    editActivity: (
      state,
      action: PayloadAction<{ name: string; id: number }>
    ) => {
      const { id, name } = action.payload;
      const activity = state.activities[id];
      const newActivity = { ...activity, name };
      const newList = [...state.activities];
      newList[id] = newActivity;
      state.activities = newList;
    },
    addOption: (state, action: PayloadAction<AddOptionDTO>) => {
      const { activityId, option } = action.payload;
      const act = state.activities[activityId];
      const options = act.options;
      const newOptions = [...options, option];
      const newAct = { ...act, options: newOptions };
      state.activities[activityId] = newAct;
    },
    removeOption: (
      state,
      action: PayloadAction<{ activityId: number; priority: number }>
    ) => {
      const { activityId, priority } = action.payload;
      const copy = state.activities[activityId].options.filter(
        (op) => op.priority != priority
      );
      const res = copy.map((c, i) => ({ ...c, priority: i + 1 }));
      state.activities[activityId].options = res;
    },
    updateDay: (state, action: PayloadAction<EditDayDTO>) => {
      const { activityId, priority, day } = action.payload;
      const act: Activity = state.activities[activityId];
      if (act.options) {
        const newOptions = [...act.options];
        newOptions[priority - 1].day = day as Day;
        const newAct = { ...act, options: newOptions };
        state.activities[activityId] = newAct;
      }
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
      const act: Activity = state.activities[activityId];
      if (act.options) {
        const newOptions = [...act.options];
        newOptions[priority - 1].start = time;
        const newAct = { ...act, options: newOptions };
        state.activities[activityId] = newAct;
      }
    },
    updateEndTime: (
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
        time: Moment;
      }>
    ) => {
      const { activityId, priority, time } = action.payload;
      const act: Activity = state.activities[activityId];
      if (act.options) {
        const newOptions = [...act.options];
        newOptions[priority - 1].end = time;
        const newAct = { ...act, options: newOptions };
        state.activities[activityId] = newAct;
      }
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
