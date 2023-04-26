import { Activity } from "./../../models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WeekState {
  activities: Array<Activity>;
}

const initialState: WeekState = {
  activities: [
    {
      id: 0,
      name: "",
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
  },
  name: "week",
  initialState,
});
//; actions
export const { addActivity, removeActivity, editActivity } =
  activitySlice.actions;

// selectors  ;
export const selectActivities = (state: RootState) => state.week.activities;

export default activitySlice.reducer;
