import { createSlice } from '@reduxjs/toolkit'

let template = {left: null, leftId: null, right: null, rightId: null}

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
