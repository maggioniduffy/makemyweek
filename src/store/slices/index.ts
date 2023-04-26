import { Activity } from "./../../models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WeekState {
  activities: Array<Activity>;
}

const initialState: WeekState = {
  activities: [
    {
      name: "",
    },
  ],
};

export const activitySlice = createSlice({
  reducers: {
    addActivity: (state, action: PayloadAction<Activity>) => {
      const note = action.payload;
      state.activities.push(note);
    },
    removeActivity: (state) => {
      const copy = [...state.activities];
      const last = copy.pop();
      const acts = [...copy];
      state.activities = copy;
    },
  },
  name: "week",
  initialState,
});
//; actions
export const { addActivity, removeActivity } = activitySlice.actions;

// selectors  ;
export const selectActivities = (state: RootState) => state.week.activities;

export default activitySlice.reducer;
