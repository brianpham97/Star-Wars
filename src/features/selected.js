import { createSlice } from '@reduxjs/toolkit'

let template = {
  left: null,
  leftFilms: [],
  leftHomeworld: null,
  leftVehicles: [],
  leftStarships: [],
  leftUrl: null,
  right: null,
  rightFilms: [],
  rightHomeworld: null,
  rightVehicles: [],
  rightStarships: [],
  rightUrl: null
};

export const selectedCharactersSlice = createSlice({
  name: "selectedCharacters",
  initialState: {value: template},
  reducers: {
    select: (state, action) => {
      state.value = action.payload
    },
    reset: (state) => {
      state.value = template
    }
  }
})

export const {select, reset} = selectedCharactersSlice.actions

export default selectedCharactersSlice.reducer
