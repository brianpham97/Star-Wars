import { createSlice } from "@reduxjs/toolkit";

let template = [];

export const allFilmsSlice = createSlice({
  name: "selectedCharacters",
  initialState: { value: template },
  reducers: {
    films: (state, action) => {
      state.value = action.payload;
    }
  },
});

export const { films } = allFilmsSlice.actions;

export default allFilmsSlice.reducer;
