import { Activity, Option, Day, Moment, Turn } from "./../../models/index";
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
  index: number;
}

const baseTurn: Turn = {
  start: { hour: 8, minute: 0 },
  end: { hour: 9, minute: 0 },
  day: 0,
};

const initialState: WeekState = {
  activities: [
    {
      id: 0,
      name: "",
      //options: [],
      options: [
        {
          priority: 1,
          turns: [baseTurn],
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
            turns: [baseTurn],
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
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == id) {
          index = i;
        }
      });

      if (index >= 0) state.activities[index].name = name;
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
        const newOptions = [...state.activities[index].options, option];
        state.activities[index].options = newOptions;
      }
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
      const { activityId, priority, day, index } = action.payload;
      let index0 = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index0 = i;
        }
      });
      if (index0 >= 0) {
        const ix = priority - 1;
        state.activities[index0].options[ix].turns[index].day = day;
      }
    },
    updateStartTime: (
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
        time: Moment;
        index: number;
      }>
    ) => {
      const { activityId, priority, time, index } = action.payload;
      let index0 = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index0 = i;
        }
      });
      if (index0 >= 0) {
        const ix = priority - 1;
        state.activities[index0].options[ix].turns[index].start = time;
      }
    },
    updateEndTime: (
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
        time: Moment;
        index: number;
      }>
    ) => {
      const { activityId, priority, time, index } = action.payload;
      let index0 = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index0 = i;
        }
      });
      if (index0 >= 0) {
        const ix = priority - 1;
        state.activities[index0].options[ix].turns[index].end = time;
      }
    },
    addTurn: (
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
      }>
    ) => {
      const { activityId, priority } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });
      if (index >= 0) {
        state.activities[index].options[priority - 1].turns.push(baseTurn);
      }
    },
    removeTurn: (
      state,
      action: PayloadAction<{
        activityId: number;
        priority: number;
        ix: number;
      }>
    ) => {
      const { activityId, priority, ix } = action.payload;
      let index = -1;
      state.activities.forEach((a, i) => {
        if (a.id == activityId) {
          index = i;
        }
      });
      if (index >= 0) {
        state.activities[index].options[priority - 1].turns.splice(ix, 1);
        //state.activities[index].options.forEach((o, i) => (o.priority = i + 1));
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
  addTurn,
  removeTurn,
} = activitySlice.actions;

// selectors  ;
export const selectActivities = (state: RootState) => state.week.activities;

export default activitySlice.reducer;
