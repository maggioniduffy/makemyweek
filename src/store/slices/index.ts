import { Activity, Option } from "./../../models/index";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WeekState {
  activities: Array<Activity>;
}

interface AddOptionDTO {
  option: Option;
  activityId: number;
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
          end: { hour: 10, minute: 0 },
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
            end: { hour: 10, minute: 0 },
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
      act.options?.push(option);
    },
  },
  name: "week",
  initialState: initialState as WeekState,
});
//; actions
export const { addActivity, addOption, removeActivity, editActivity } =
  activitySlice.actions;

// selectors  ;
export const selectActivities = (state: RootState) => state.week.activities;

export default activitySlice.reducer;
